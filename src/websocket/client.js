const WebSocket = require('ws');

function connectTicker(url, instId = 'BTC-USDT'){
    const ws = new WebSocket(url);
    registerEvents(ws, instId);
    return ws;
}

// 注册事件
function registerEvents(ws, instId){
    ws.on('open', () => {
        console.log('Connected to OKX WebSocket');
        // 发送订阅请求
        ws.send(JSON.stringify({
            op: 'subscribe',
            args: [{ channel: 'tickers', instId }]
        }));
    });

    const {handleMessage} = require('../handlers/messageHandler');
    ws.on('message', (data) => {
        try{
            // 解析消息
            const message = JSON.parse(data.toString());
            // 处理消息
            handleMessage(message);
        }catch(error){
            // 解析消息失败
            console.error('Error parsing message:', error.message);
        }
    });
    ws.on('error', (error) => {
        // 错误处理
        console.error('WebSocket error:', error);
    });
    ws.on('close', () => {
        // 关闭连接
        console.log('Disconnected from OKX WebSocket');
    });
}

// 导出连接ticker函数
module.exports = {
    connectTicker
};