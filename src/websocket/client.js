const WebSocket = require('ws');

function connectTicker(url, instId = 'BTC-USDT'){
    const ws = new WebSocket(url);
    registerEvents(ws, instId);
    return ws;
}

function registerEvents(ws, instId){
    ws.on('open', () => {
        console.log('Connected to OKX WebSocket');

        ws.send(JSON.stringify({
            op: 'subscribe',
            args: [{ channel: 'tickers', instId }]
        }));
    });

    const {handleMessage} = require('../handlers/messageHandler');
    ws.on('message', (data) => {
        try{
            const message = JSON.parse(data.toString());
            handleMessage(message);
        }catch(error){
            console.error('Error parsing message:', error.message);
        }
    });
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
    ws.on('close', () => {
        console.log('Disconnected from OKX WebSocket');
    });
}
module.exports = {
    connectTicker
};