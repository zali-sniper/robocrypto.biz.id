
-- Final Database Schema Fix (Merged original + New Auth)

-- Drop existing tables with CASCADE to handle dependencies
DROP TABLE IF EXISTS trade_history CASCADE;
DROP TABLE IF EXISTS trade_configs CASCADE;
DROP TABLE IF EXISTS api_keys CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Recreate users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255), -- Compatibility
  password VARCHAR(255), -- New Auth
  password_hash VARCHAR(255), -- Compatibility
  image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recreate api_keys table
CREATE TABLE api_keys (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  exchange VARCHAR(50) DEFAULT 'indodax',
  api_key TEXT NOT NULL,
  api_secret TEXT NOT NULL,
  label VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recreate trade_configs table
CREATE TABLE trade_configs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pair VARCHAR(50) NOT NULL,
    strategy_type VARCHAR(50) NOT NULL,
    params JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT FALSE,
    last_run TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recreate trade_history table
CREATE TABLE trade_history (
    id SERIAL PRIMARY KEY,
    config_id INTEGER REFERENCES trade_configs(id) ON DELETE SET NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pair VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    price DECIMAL(20, 8) NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    status VARCHAR(50) DEFAULT 'success',
    remote_order_id VARCHAR(255),
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
