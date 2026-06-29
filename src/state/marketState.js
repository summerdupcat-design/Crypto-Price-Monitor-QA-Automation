const marketState = new Map();
// 获取市场状态
function getState(key){
    if(!marketState.has(key)){
        // 如果市场状态不存在，则初始化市场状态
        marketState.set(key, {
            lastPrice: null,
            lastTimestamp: null,
            lastAskPrice: null,
            lastBidPrice: null
        });
    }
    // 返回市场状态
    return marketState.get(key);
}

// 清除市场状态
function clearState(){
    marketState.clear();
}

module.exports = {
    getState,
    clearState
};