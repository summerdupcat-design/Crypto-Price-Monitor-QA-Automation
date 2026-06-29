function adaptOKXTickers(ticker){
    return {
        exchange: 'OKX',
        symbol: ticker.instId,
        price: Number(ticker.last),
        ask: Number(ticker.askPx),
        bid: Number(ticker.bidPx),
        last: Number(ticker.last),
        timestamp: Number(ticker.ts),
        raw:ticker
    };
}

module.exports = {
    adaptOKXTickers
};