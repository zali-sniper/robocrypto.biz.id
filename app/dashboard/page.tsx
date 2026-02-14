
'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
    const { data: session } = useSession()
    const [stats, setStats] = useState({
        totalAssetIDR: 0,
        activeBots: 0,
        todayProfit: 0,
        hasApiKey: false
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/dashboard/stats')
                if (res.ok) {
                    const data = await res.json()
                    setStats(data)
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error)
            } finally {
                setIsLoading(false)
            }
        }

        if (session) {
            fetchStats()
        }
    }, [session])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value)
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.39 2.1-1.39 1.47 0 2.01.59 2.1 1.58h1.85c-.05-1.53-.88-2.85-2.49-3.4V5h-2.5v2.22c-1.51.3-2.61 1.29-2.61 2.82 0 1.93 1.61 2.85 3.96 3.44 2.14.51 2.67 1.15 2.67 2.02 0 .5-.19 1.5-2.35 1.5-1.63 0-2.32-.74-2.47-1.71h-1.88c.18 1.88 1.39 2.84 2.91 3.2V20h2.5v-2.23c1.64-.33 2.63-1.42 2.63-2.9 0-2.2-1.9-3.05-4.48-3.73z" /></svg>
                    </div>
                    <p className="text-gray-400 text-sm">Total Asset Estimation</p>
                    <h3 className="text-2xl font-bold mt-2">
                        {isLoading ? '...' : formatCurrency(stats.totalAssetIDR)}
                    </h3>
                    {!stats.hasApiKey && !isLoading && (
                        <p className="text-xs text-orange-400 mt-1">Connect API Key in Settings to view balance</p>
                    )}
                </div>

                <div className="glass p-6 rounded-2xl">
                    <p className="text-gray-400 text-sm">Active Bots</p>
                    <h3 className="text-2xl font-bold mt-2 text-blue-400">
                        {isLoading ? '...' : `${stats.activeBots} Running`}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Trading robots currently in operation</p>
                </div>

                <div className="glass p-6 rounded-2xl">
                    <p className="text-gray-400 text-sm">Today's Profit</p>
                    <h3 className="text-2xl font-bold mt-2 text-green-400">
                        {isLoading ? '...' : formatCurrency(stats.todayProfit)}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Realized profit for the last 24h</p>
                </div>
            </div>

            <div className="glass p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Market Overview (Indodax)</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-gray-700 rounded-xl">
                    <p className="text-gray-400 text-center px-4">
                        Market analysis chart will be implemented soon.<br />
                        Monitor your asset growth and bot performance in real-time.
                    </p>
                </div>
            </div>
        </div>
    );
}
