const {adaptOKXTickers} = require('./okxAdapter');
const {adaptBinanceTickers} = require('./binanceAdapter');

function adaptTicker(exchange, ticker){
    // 适配OKX的ticker
    if(ticker.exchange === 'OKX'){
        return adaptOKXTickers(ticker);
    }
    // 适配Binance的ticker
    if(ticker.exchange === 'Binance'){
        return adaptBinanceTickers(ticker);
    }
    // 不支持的交易所
    throw new Error(`Unsupported exchange: ${ticker.exchange}`);
}


module.exports = {
    adaptTicker
};
