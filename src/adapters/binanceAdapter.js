function adaptBinanceTickers(ticker){
    return {
        exchange: 'Binance',
        symbol: ticker.symbol,
        price: Number(ticker.price),
        ask: Number(ticker.ask),
        bid: Number(ticker.bid),
        last: Number(ticker.last),
        timestamp: Number(ticker.timestamp),
        raw:ticker
    };
}

module.exports = {  
    adaptBinanceTickers
};