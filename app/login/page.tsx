
'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    // Login State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Register State
    const [regName, setRegName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regError, setRegError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError('Invalid email or password')
            setIsLoading(false)
        } else {
            router.push('/dashboard')
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setRegError('')

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: regName, email: regEmail, password: regPassword })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed')
            }

            // Auto login after register? Or just close modal?
            // Let's close modal and fill login form
            setIsRegistering(false)
            setEmail(regEmail)
            setPassword('')
            setError('Registration successful! Please login.')
        } catch (err: any) {
            setRegError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="glass max-w-md w-full p-8 rounded-2xl space-y-6">
                <h1 className="text-3xl font-bold text-white text-center">NusaBot Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && <p className={`text-center text-sm ${error.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition disabled:opacity-50"
                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <button
                            onClick={() => setIsRegistering(true)}
                            className="text-blue-400 hover:text-blue-300 font-bold"
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </div>

            {/* Registration Modal */}
            {isRegistering && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="glass max-w-md w-full p-8 rounded-2xl relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsRegistering(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-bold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={regName}
                                    onChange={e => setRegName(e.target.value)}
                                    className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={regEmail}
                                    onChange={e => setRegEmail(e.target.value)}
                                    className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                                <input
                                    type="password"
                                    value={regPassword}
                                    onChange={e => setRegPassword(e.target.value)}
                                    className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                                    placeholder="Min 6 characters"
                                    minLength={6}
                                    required
                                />
                            </div>

                            {regError && <p className="text-red-400 text-center text-sm">{regError}</p>}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition disabled:opacity-50"
                            >
                                {isLoading ? 'Creating Account...' : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
