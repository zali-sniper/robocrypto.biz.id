# NusaBot - Crypto Trading Bot

A Next.js application for automated crypto trading on Indodax.

## Prerequisites

- Node.js 18+
- PostgreSQL Database (Neon DB recommended)
- Indodax Account (for API Keys)

## Setup

1.  **Clone & Install**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file (or set in Netlify):
    ```env
    DATABASE_URL="postgres://user:password@host/dbname?sslmode=require"
    ENCRYPTION_KEY="your-secret-key-min-32-chars"
    ```

3.  **Database Migration**
    Run the schema script in your Neon DB console (`scripts/schema.sql`).

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## Deploy to Netlify

1.  Push to GitHub.
2.  Import project in Netlify.
3.  Set `DATABASE_URL` and `ENCRYPTION_KEY` in Netlify Site Settings > Environment Variables.
4.  Deploy!

## Features

- **Public API**: Ticker, Depth (No key required).
- **Private API**: Trade, Info, History (Requires API Key in Dashboard).
- **Dashboard**: Manage keys, view assets, config bot.
- **Bot**: Simple Grid / DCA strategy (Mock implementation in `app/dashboard/bot/page.tsx`).

## Note on "Bot" Support
Next.js is serverless. To run a persistent bot loop, you need:
- **Option A**: GitHub Actions / Cron Job calling an API route every minute (`/api/bot/run`).
- **Option B**: A separate worker process (e.g., Heroku Worker, VPS).
- **Current Imp**: The "Start Robot" button in the dashboard is a UI toggle. You need to implement the actual cron/loop logic to call the `trade` API.
