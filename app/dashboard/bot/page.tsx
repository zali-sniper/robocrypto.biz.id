'use client';

import { useState } from 'react';
import { Play, Square, Settings as SettingsIcon } from 'lucide-react';

export default function BotPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [pair, setPair] = useState('btcidr');
    const [strategy, setStrategy] = useState('simple-grid');

    const toggleBot = () => {
        setIsRunning(!isRunning);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Robot Configuration</h2>
                <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${isRunning ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        Status: {isRunning ? 'RUNNING' : 'STOPPED'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Config Form */}
                <div className="glass p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <SettingsIcon className="text-blue-500" />
                        <h3 className="text-xl font-bold">Strategy Settings</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-300">Trading Pair</label>
                            <select
                                className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={pair}
                                onChange={e => setPair(e.target.value)}
                            >
                                <option value="btcidr">BTC/IDR</option>
                                <option value="ethidr">ETH/IDR</option>
                                <option value="dogeidr">DOGE/IDR</option>
                                <option value="usdtidr">USDT/IDR</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-300">Strategy</label>
                            <select
                                className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={strategy}
                                onChange={e => setStrategy(e.target.value)}
                            >
                                <option value="simple-grid">Simple Grid (Buy Low / Sell High)</option>
                                <option value="dca">DCA (Dollar Cost Averaging)</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={toggleBot}
                                className={`w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {isRunning ? (
                                    <>
                                        <Square size={20} fill="currentColor" /> Stop Robot
                                    </>
                                ) : (
                                    <>
                                        <Play size={20} fill="currentColor" /> Start Robot
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logs / Monitor */}
                <div className="glass p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Activity Log</h3>
                    <div className="h-64 bg-black/20 rounded-xl p-4 overflow-y-auto font-mono text-sm space-y-2">
                        <p className="text-gray-500">System ready.</p>
                        {isRunning && <p className="text-green-400"> &gt; Bot started on {pair} ({strategy})...</p>}
                        {/* Mock logs */}
                    </div>
                </div>
            </div>
        </div>
    );
}
