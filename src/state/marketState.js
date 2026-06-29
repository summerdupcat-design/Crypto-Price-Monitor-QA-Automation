const marketState = new Map();

// 获取交易所状态
function getExchangeState(symbol,exchange){
    if(!marketState.has(symbol)){
        // 如果市场状态不存在，则初始市场状态
        marketState.set(symbol, new Map());
    }
    // 获取市场状态
    const symbolState = marketState.get(symbol);
    if(!symbolState.has(exchange)){
        // 如果交易所状态不存在，则初始交易所状态
        symbolState.set(exchange, {});
    }
    // 获取交易所状态
    return symbolState.get(exchange);
}

// 获取市场状态
function getSymbolState(symbol){
    if(!marketState.has(symbol)){
        // 如果市场状态不存在，则初始市场状态
        marketState.set(symbol, new Map());
    }
    // 获取市场状态
    return marketState.get(symbol);
}

// 更新最后一条Ticker
function updaeteLastTicker(ticker){
    const state = getExchangeState(ticker.symbol,ticker.exchange);
    state.lastTicker = ticker;
}

// 更新最后一条哈希值
function updateLastHash(ticker,hash){
    const state = getExchangeState(ticker.symbol,ticker.exchange);
    state.lastHash = hash;
}

// 清除市场状态
function clearState(){
    marketState.clear();
}


module.exports = { 
    getExchangeState,
    getSymbolState,
    updaeteLastTicker,
    updateLastHash,
    clearState
};