import { NextRequest, NextResponse } from 'next/server';
import { Indodax } from '@/lib/indodax';
import { decrypt } from '@/lib/utils';
import { query } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, params, apiKeyId } = body;

        // 1. Get API Key from DB
        // SECURITY UPDATE: Verify user session
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // @ts-ignore
        const userId = session.user.id;

        if (!apiKeyId) {
            return NextResponse.json({ error: 'API Key ID required' }, { status: 400 });
        }

        const result = await query('SELECT api_key, api_secret FROM api_keys WHERE id = $1 AND user_id = $2', [apiKeyId, userId]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'API Key not found or does not belong to you' }, { status: 404 });
        }

        const { api_key, api_secret } = result.rows[0];
        const decryptedSecret = decrypt(api_secret);

        const indodax = new Indodax(api_key, decryptedSecret);

        let data;
        switch (action) {
            case 'getInfo':
                data = await indodax.getInfo();
                break;
            case 'trade':
                data = await indodax.trade(params.pair, params.type, params.price, params.amount);
                break;
            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
