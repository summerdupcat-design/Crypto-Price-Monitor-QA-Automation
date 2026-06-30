// 导入OKX Ticker
const { startOKXTicker } = require('./websocket/okxClient');
const { startBinanceTicker } = require('./websocket/binanceClient');

// 启动 Binance Ticker
startBinanceTicker();

// OKX 在某些网络环境下可能被屏蔽，可通过 OKX_ENABLED=false 关闭
if (process.env.OKX_ENABLED !== 'false') {
    startOKXTicker();
} else {
    console.log('ℹ️  OKX 已禁用 (OKX_ENABLED=false)');
}
