const {getExchangeState} = require('../state/marketState');


function validateTimestamp(ticker) {
    // 验证时间戳是否为数字
    const currentTimestamp = Number(ticker.timestamp);
    // 获取最后一条时间戳
    const state = getExchangeState(ticker.symbol,ticker.exchange);
    // 如果最后一条时间戳不存在，则返回0
    const lastTimestamp = state.lastTicker ? state.lastTicker.timestamp : 0;

    if (Number.isNaN(currentTimestamp)) {
        // 验证时间戳是否为数字
        return {
            validator: 'TimestampValidator',
            passed: false,
            reason: 'Timestamp is not a number',
            data: { rawTimestamp: ticker.ts }
        };
    }

    if (currentTimestamp < lastTimestamp) {
        // 验证时间戳是否回退
        return {
            validator: 'TimestampValidator',
            passed: false,
            reason: 'Timestamp rolled back, possible out-of-order message',
            data: { currentTimestamp, lastTimestamp }
        };
    }
    return {
        // 返回验证结果
        validator: 'TimestampValidator',
        passed: true,
        reason: 'Timestamp is valid',
        data: { timestamp: currentTimestamp }
    };
}

module.exports = {
    validateTimestamp
};
