// 连接WebSocket
const {connectTicker} = require('./websocket/client');

const OKX_WS_URL = 'wss://ws.okx.com:8443/ws/v5/public';

// 连接WebSocket
connectTicker(OKX_WS_URL);