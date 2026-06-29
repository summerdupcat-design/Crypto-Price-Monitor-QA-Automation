const {validateDuplicate} = require('../src/validators/duplicateValidator');
const {clearState} = require('../src/state/marketState');

describe('Duplicate Validator', () => {
    // 每次测试前清除市场状态
    beforeEach(() => {
        clearState();
    });

    // 测试第一次收到ticker
    test('should pass for first ticker', () => {
        const ticker = {
            instId: 'BTC-USDT',
            askPx: '100',
            bidPx: '100',
            last: '100',
            ts:'1711111111111'
        };
        const result = validateDuplicate(ticker);
        expect(result.passed).toBe(true);
        expect(result.validator).toBe('DuplicateValidator');
        expect(result.reason).toBe('Duplicate message is valid');
    });

    // 测试收到重复的ticker
    test('should fail if the ticker is a duplicate', () => {
        const ticker = {
            instId: 'BTC-USDT',
            askPx: '100',
            bidPx: '100',
            last: '100',
            ts:'1711111111111'
        };
        // 先验证一次，确保市场状态被更新
        validateDuplicate(ticker);
        // 再次验证，应该失败
        const result = validateDuplicate(ticker);
        expect(result.passed).toBe(false);
        expect(result.validator).toBe('DuplicateValidator');
        expect(result.reason).toBe('Duplicate message detected');
    });

    // 测试收到时间戳更新的ticker
    test('should pass if the ticker is updated', () => {
        const ticker = {
            instId: 'BTC-USDT',
            askPx: '100',
            bidPx: '100',
            last: '100',
            ts:'1711111111111'
        };
        const updatedTicker = {
            instId: 'BTC-USDT',
            askPx: '101',
            bidPx: '101',
            last: '101',
            ts:'1711111111112'
        };
        // 先验证一次，确保市场状态被更新
        validateDuplicate(ticker);
        // 再次验证，应该成功
        const result = validateDuplicate(updatedTicker);
        expect(result.passed).toBe(true);
        expect(result.validator).toBe('DuplicateValidator');
        expect(result.reason).toBe('Duplicate message is valid');
    });
});