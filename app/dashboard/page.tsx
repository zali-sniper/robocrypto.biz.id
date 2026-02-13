export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-2xl">
                    <p className="text-gray-400 text-sm">Total Asset Estimation</p>
                    <h3 className="text-2xl font-bold mt-2">Rp 0</h3>
                    <p className="text-xs text-gray-500 mt-1">Connect API Key to view</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                    <p className="text-gray-400 text-sm">Active Bots</p>
                    <h3 className="text-2xl font-bold mt-2 text-blue-400">0 Running</h3>
                </div>
                <div className="glass p-6 rounded-2xl">
                    <p className="text-gray-400 text-sm">Today's Profit</p>
                    <h3 className="text-2xl font-bold mt-2 text-green-400">Rp 0</h3>
                </div>
            </div>

            <div className="glass p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Market Overview (Indodax)</h3>
                <p className="text-gray-400">Chart placeholder - will perform API call to fetch ticker.</p>
            </div>
        </div>
    );
}
