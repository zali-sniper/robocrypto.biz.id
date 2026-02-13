-- Users table (optional if single user, but good for structure)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- API Keys for Indodax
CREATE TABLE IF NOT EXISTS api_keys (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    exchange VARCHAR(50) DEFAULT 'indodax',
    api_key VARCHAR(255) NOT NULL,
    api_secret VARCHAR(255) NOT NULL, -- Encrypted
    label VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trade Configurations (The "Robot" settings)
CREATE TABLE IF NOT EXISTS trade_configs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pair VARCHAR(20) NOT NULL, -- e.g., 'btcidr'
    strategy_type VARCHAR(50) NOT NULL, -- e.g., 'grid', 'dca'
    params JSONB NOT NULL, -- Strategy parameters
    is_active BOOLEAN DEFAULT FALSE,
    last_run TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trade History
CREATE TABLE IF NOT EXISTS trade_history (
    id SERIAL PRIMARY KEY,
    config_id INTEGER REFERENCES trade_configs(id) ON DELETE SET NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pair VARCHAR(20) NOT NULL,
    type VARCHAR(10) NOT NULL, -- 'buy' or 'sell'
    price DECIMAL(20, 8) NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    status VARCHAR(20) DEFAULT 'success',
    remote_order_id VARCHAR(100),
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
