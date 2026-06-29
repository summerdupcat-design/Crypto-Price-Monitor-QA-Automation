function adaptBinanceTickers(ticker) {
    const bid = Number(ticker.b);
    const ask = Number(ticker.a);
    const price = ticker.c ? Number(ticker.c) : (bid + ask) / 2;

    return {
        exchange: 'BINANCE',
        symbol: "BTC-USDT",
        price,
        ask,
        bid,
        timestamp: ticker.E ? Number(ticker.E) : Date.now(),
        raw: ticker
    };
}

module.exports = {
    adaptBinanceTickers
};
