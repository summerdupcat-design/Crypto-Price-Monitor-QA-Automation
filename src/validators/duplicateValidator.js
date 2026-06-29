const crypto = require('crypto');
// 获取市场状态
const {getState} = require('../state/marketState');
// 构建哈希值
function buildHash(ticker){
    return crypto.createHash('sha256').update(JSON.stringify(ticker)).digest('hex');
}
function validateDuplicate(ticker){
    // 获取当前symbol的key
    const key = ticker.symbol;
    // 获取市场状态
    const state = getState(key);
    // 构建哈希值
    const currentHash = buildHash(ticker);
    // 如果当前哈希值与上次哈希 值相同，则认为重复
    if(state.lastHash === currentHash){
        return {
            validator: 'DuplicateValidator',
            passed: false,
            reason: 'Duplicate message detected',
            data: { ticker }
        };
    }
    // 更新市场状态
    state.lastHash = currentHash;
    // 返回验证结果
    return {
        validator: 'DuplicateValidator',
        passed: true,
        reason: 'Duplicate message is valid',
        data: { ticker }
    };
}
module.exports = {
    validateDuplicate
};