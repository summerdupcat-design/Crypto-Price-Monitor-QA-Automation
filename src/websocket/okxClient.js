const { connectWebSocket } = require('./websocketClient');
const { handleMessage } = require('../handlers/messageHandler');
const { OKX } = require('../config/exchangeConfig');

const urls = OKX.WS_URLS;
const instId = OKX.symbol;
const reconnectDelayMs = OKX.reconnectDelayMs || 5000;

let reconnectTimer = null;
let activeSocket = null;

function connectOKX(urlIndex = 0) {
    const url = urls[urlIndex % urls.length];
    console.log(`🔌 Connecting OKX: ${url}`);

    activeSocket = connectWebSocket({
        url,
        onOpen: (ws) => {
            console.log('✅ OKX Connection Success');
            ws.send(JSON.stringify({
                op: 'subscribe',
                args: [{ channel: 'tickers', instId }]
            }));
        },
        onMessage: (data) => {
            const message = JSON.parse(data.toString());
            handleMessage('OKX', message);
        },
        onError: (error) => {
            console.error('❌ OKX Connection Error:', error.message);
            if (error.code === 'ECONNRESET') {
                console.error('💡 OKX 连接被重置，可能是网络限制。可尝试 VPN/代理，或设置 OKX_ENABLED=false 仅使用 Binance');
            }
        },
        onClose: () => {
            console.log('❌ OKX Connection Closed');
            scheduleReconnect(urlIndex);
        }
    });

    return activeSocket;
}

function scheduleReconnect(currentUrlIndex) {
    if (reconnectTimer) {
        return;
    }

    const nextUrlIndex = currentUrlIndex + 1;
    const nextUrl = urls[nextUrlIndex % urls.length];
    console.log(`🔄 OKX 将在 ${reconnectDelayMs / 1000}s 后重连 → ${nextUrl}`);

    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connectOKX(nextUrlIndex);
    }, reconnectDelayMs);
}

function startOKXTicker() {
    return connectOKX(0);
}

module.exports = {
    startOKXTicker
};
