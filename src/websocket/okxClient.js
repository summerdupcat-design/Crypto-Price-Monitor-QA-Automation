const { connectWebSocket } = require('./websocketClient');
const { handleMessage } = require('../handlers/messageHandler');
const { OKX } = require('../config/exchangeConfig');

const OKX_WS_URL = OKX.WS_URL;
const instId = OKX.symbol;

function startOKXTicker() {
    return connectWebSocket({
        url: OKX_WS_URL,
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
            console.error('❌ OKX Connection Error:', error);
        },
        onClose: () => {
            console.log('❌ OKX Connection Closed');
        }
    });
}

module.exports = {
    startOKXTicker
};
