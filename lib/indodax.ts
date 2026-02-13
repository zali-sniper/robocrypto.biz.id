import axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';

const PUBLIC_API_URL = 'https://indodax.com/api';
const PRIVATE_API_URL = 'https://indodax.com/tapi';

export class Indodax {
    private apiKey: string;
    private apiSecret: string;

    constructor(apiKey: string, apiSecret: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    // Public API
    static async getTicker(pair: string) {
        // pair example: 'btcidr'
        try {
            const response = await axios.get(`${PUBLIC_API_URL}/${pair}/ticker`);
            return response.data;
        } catch (error) {
            console.error('Indodax Public API Error:', error);
            throw error;
        }
    }

    static async getDepth(pair: string) {
        try {
            const response = await axios.get(`${PUBLIC_API_URL}/${pair}/depth`);
            return response.data;
        } catch (error) {
            console.error('Indodax Public API Error:', error);
            throw error;
        }
    }

    // Private API
    private sign(query: Record<string, any>) {
        const queryStr = querystring.stringify(query);
        const hmac = crypto.createHmac('sha512', this.apiSecret);
        return hmac.update(queryStr).digest('hex');
    }

    async privateRequest(method: string, params: Record<string, any> = {}) {
        const timestamp = Date.now();
        const payload = {
            method,
            timestamp,
            div: 0, // 0 for nonce that uses timestamp? Indodax uses nonce.
            nonce: timestamp,
            ...params
        };

        // Note: Indodax nonce must be increasing. Timestamp ms is usually good enough unless high concurrency.

        const signature = this.sign(payload);

        try {
            const response = await axios.post(PRIVATE_API_URL, querystring.stringify(payload), {
                headers: {
                    'Key': this.apiKey,
                    'Sign': signature,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.success === 0) {
                throw new Error(response.data.error || 'Unknown Indodax Error');
            }

            return response.data.return;
        } catch (error: any) {
            console.error('Indodax Private API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async getInfo() {
        return this.privateRequest('getInfo');
    }

    async transHistory() {
        return this.privateRequest('transHistory');
    }

    async trade(pair: string, type: 'buy' | 'sell', price: number, amount: number) {
        // Indodax params: pair, type, price, idr (for buy) or [coin] (for sell)
        // This is tricky because param names change based on type (idr vs btc etc)
        // Usually: 
        // buy: pair, type='buy', price, idr=amount_in_idr
        // sell: pair, type='sell', price, [coin_name]=amount_in_coin

        // We need to know the coin name from the pair. e.g. btcidr -> btc
        const coin = pair.replace('idr', '');

        const params: Record<string, any> = {
            pair,
            type,
            price
        };

        if (type === 'buy') {
            params.idr = amount; // Amount is total IDR to spend? Or amount of coin? Indodax 'buy' usually takes 'idr' (total quote currency)
        } else {
            params[coin] = amount; // Amount of coin to sell
        }

        return this.privateRequest('trade', params);
    }
}
