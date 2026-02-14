
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { encrypt, decrypt } from "@/lib/utils";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { apiKey, apiSecret, label } = body;

        if (!apiKey || !apiSecret || !label) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Get User ID (Assuming session has it, or fetch it)
        // In our auth.ts, we added user id to session
        const userId = (session.user as any).id;

        if (!userId) {
            return NextResponse.json({ error: "User ID not found" }, { status: 401 });
        }

        const encryptedSecret = encrypt(apiSecret);

        await query(
            'INSERT INTO api_keys (user_id, label, api_key, api_secret) VALUES ($1, $2, $3, $4)',
            [userId, label, apiKey, encryptedSecret]
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error saving key:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // @ts-ignore
    const userId = session.user.id;

    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    try {
        const result = await query('SELECT id, label, api_key, created_at FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return NextResponse.json({ success: true, keys: result.rows });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
