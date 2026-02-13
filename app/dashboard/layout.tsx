import Link from 'next/link';
import { LayoutDashboard, Settings, Bot, LogOut, Home } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-blue-500">Nusa<span className="text-white">Bot</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition text-gray-300 hover:text-white">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/dashboard/bot" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition text-gray-300 hover:text-white">
                        <Bot size={20} />
                        <span>Robot Config</span>
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition text-gray-300 hover:text-white">
                        <Settings size={20} />
                        <span>API & Settings</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition text-gray-300 hover:text-white mt-8">
                        <Home size={20} />
                        <span>Back to Home</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
