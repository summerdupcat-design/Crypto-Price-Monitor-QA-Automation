const {connectWebSocket} = require('./websocketClient');
const {handleMessage} = require('../handlers/messageHandler');
const {BINANCE} = require('../config/exchangeConfig');

const BINANCE_WS_URL = BINANCE.WS_URL;

function startBinanceTicker(){
    return connectWebSocket({
        url: BINANCE_WS_URL,
        // 连接成功回调
        onOpen:(ws) => {
            console.log("✅ Binance Connection Success");
            // 订阅Ticker
            ws.send(JSON.stringify({
                method: 'SUBSCRIBE',
                params: [
                    'btcusdt@bookTicker'
                ],
                id: 1,
            }));
        },
        // 收到消息回调
        onMessage:(data) => {
            const message = JSON.parse(data.toString())
            // 处理消息
            handleMessage("BINANCE",message);
        },
        // 连接错误回调
        onError:(error) => {
            console.error("❌ Binance Connection Error:", error);
        },
        // 连接关闭回调
        onClose:() => {
            console.log("❌ Binance Connection Closed");
        },
    });
}

module.exports = {
    startBinanceTicker
};