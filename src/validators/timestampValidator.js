let lastTimestamp = 0;

function validateTimestamp(ticker) {
    const currentTimestamp = Number(ticker.timestamp);

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

    lastTimestamp = currentTimestamp;
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
