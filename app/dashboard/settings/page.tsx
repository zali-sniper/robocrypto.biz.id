'use client';

import { useState } from 'react';

export default function SettingsPage() {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [label, setLabel] = useState('Main Account');
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Saving...');

        // In a real app, you would send this to an API route to save to DB
        // For now we just mock the success
        try {
            // await fetch('/api/keys', { method: 'POST', body: JSON.stringify({ apiKey, apiSecret, label }) })
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatus('Saved successfully (Mock)!');
            setApiKey('');
            setApiSecret('');
        } catch (err) {
            setStatus('Error saving key.');
        }
    };

    return (
        <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">API Settings</h2>

            <div className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Connect Indodax Account</h3>
                <p className="text-gray-400 mb-6 text-sm">
                    Generate API Key and Secret from your Indodax profile.
                    Enable "Trade" and "View" permissions. Do NOT enable "Withdraw".
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Label</label>
                        <input
                            type="text"
                            className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={label}
                            onChange={e => setLabel(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">API Key</label>
                        <input
                            type="text"
                            className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Indodax API Key"
                            value={apiKey}
                            onChange={e => setApiKey(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">API Secret</label>
                        <input
                            type="password"
                            className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Indodax API Secret"
                            value={apiSecret}
                            onChange={e => setApiSecret(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition w-full"
                    >
                        Save API Keys
                    </button>

                    {status && (
                        <p className={`text-center text-sm mt-2 ${status.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
