'use client';

import { useState, useEffect } from 'react';
import { Play, Square, Settings as SettingsIcon } from 'lucide-react';

export default function BotPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [pair, setPair] = useState('btcidr');
    const [strategy, setStrategy] = useState('simple-grid');
    const [keys, setKeys] = useState<any[]>([]);
    const [selectedKeyId, setSelectedKeyId] = useState<string>('');
    const [logs, setLogs] = useState<string[]>(['System ready.']);

    useEffect(() => {
        fetch('/api/keys')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.keys.length > 0) {
                    setKeys(data.keys);
                    setSelectedKeyId(data.keys[0].id);
                }
            });
    }, []);

    const addLog = (msg: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    }

    const toggleBot = async () => {
        if (!selectedKeyId) {
            alert("Please select an API Key first in Settings!");
            return;
        }

        if (!isRunning) {
            // Start
            try {
                addLog(`Starting bot on ${pair}...`);
                const res = await fetch('/api/indodax', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'getInfo', // Test connection first
                        apiKeyId: selectedKeyId
                    })
                });
                const data = await res.json();
                if (data.success) {
                    setIsRunning(true);
                    addLog(`Bot successfully connected. Balance: ${JSON.stringify(data.data.balance || 'hidden')}`);
                } else {
                    addLog(`Error: ${data.error}`);
                }
            } catch (e: any) {
                addLog(`Connection error: ${e.message}`);
            }
        } else {
            // Stop
            setIsRunning(false);
            addLog('Bot stopped.');
        }
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
                        <SettingsIcon className="text-blue-500" />
                        <h3 className="text-xl font-bold">Strategy Settings</h3>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-300">API Key Account</label>
                        <select
                            className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={selectedKeyId}
                            onChange={e => setSelectedKeyId(e.target.value)}
                        >
                            {keys.map(k => (
                                <option key={k.id} value={k.id}>{k.label} ({k.api_key.substring(0, 8)}...)</option>
                            ))}
                            {keys.length === 0 && <option value="">No keys found. Go to Settings.</option>}
                        </select>
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
                        {logs.map((log, i) => (
                            <p key={i} className="text-gray-400">{log}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
