
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { query } from '@/lib/db';
import { Indodax } from '@/lib/indodax';
import { decrypt } from '@/lib/utils';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        // 1. Get the latest API Key
        const keysResult = await query(
            'SELECT api_key, api_secret FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
            [userId]
        );

        let totalAssetIDR = 0;
        let activeBots = 0;
        let todayProfit = 0;

        if (keysResult.rowCount && keysResult.rowCount > 0) {
            const { api_key, api_secret } = keysResult.rows[0];
            const decryptedSecret = decrypt(api_secret);
            const indodax = new Indodax(api_key, decryptedSecret);

            try {
                const info = await indodax.getInfo();
                const balances = info.balance; // { btc: "0.1", idr: "1000000", ... }
                const serverTime = info.server_time;

                // Fetch all tickers to convert to IDR
                const tickersResponse = await axios.get('https://indodax.com/api/summaries');
                const tickers = tickersResponse.data.tickers; // { btc_idr: { last: "1000000000" }, ... }

                for (const [coin, amountStr] of Object.entries(balances)) {
                    const amount = parseFloat(amountStr as string);
                    if (amount <= 0) continue;

                    if (coin === 'idr') {
                        totalAssetIDR += amount;
                    } else {
                        const pair = `${coin}_idr`;
                        const ticker = tickers[pair];
                        if (ticker) {
                            totalAssetIDR += amount * parseFloat(ticker.last);
                        }
                    }
                }
            } catch (err) {
                console.error('Error fetching Indodax info:', err);
                // Continue with 0 if Indodax fails, or handle differently
            }
        }

        // 2. Get Active Bots Count
        const botsResult = await query(
            'SELECT count(*) FROM trade_configs WHERE user_id = $1 AND is_active = true',
            [userId]
        );
        activeBots = parseInt(botsResult.rows[0].count);

        // 3. Get Today's Profit (Placeholder logic)
        // For now, let's sum up any "profit" if we had a column, 
        // or just calculate based on trade history if possible.
        // Since we don't have a profit column yet, we'll return 0 or a mock for now
        // but let's try to see if there's any trade today.
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const historyResult = await query(
            'SELECT * FROM trade_history WHERE user_id = $1 AND executed_at >= $2',
            [userId, today.toISOString()]
        );

        // Simple logic: if we had buy/sell pairs we could calculate.
        // For now, let's just count trades as a placeholder for "activity"
        // and return a mock profit or 0.
        todayProfit = 0; // Needs more complex logic to calculate realized profit

        return NextResponse.json({
            totalAssetIDR,
            activeBots,
            todayProfit,
            hasApiKey: (keysResult.rowCount || 0) > 0
        });

    } catch (error: any) {
        console.error('Stats API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
