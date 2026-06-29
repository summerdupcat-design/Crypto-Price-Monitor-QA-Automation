// 导入OKX Ticker
const {startOKXTicker} = require('./websocket/okxClient');
const {startBinanceTicker} = require('./websocket/binanceClient');

// 启动OKX Ticker
startOKXTicker();
// 启动Binance Ticker
startBinanceTicker();