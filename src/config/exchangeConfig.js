module.exports = {
    OKX: {
        WS_URLS: [
            // 'wss://wsaws.okx.com:8443/ws/v5/public',
            'wss://ws.okx.com:8443/ws/v5/public'
        ],
        symbol: 'BTC-USDT',
        reconnectDelayMs: 5000
    },
    BINANCE: {
        WS_URL: 'wss://stream.binance.com:9443/ws',
        symbol: 'btcusdt'
    }
};
