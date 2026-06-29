const {validatePrice} = require('../src/validators/priceValidator');

describe('Price Validator', () => {
    // 测试价格是否为数字
    test('should return false if price is not a number', () => {
        // 构建一个Ticker对象
        const ticker = {
            instId: 'BTC-USDT',
            last: 'abc'
        };
        const result = validatePrice(ticker);
        // 验证返回为false，验证器为PriceValidator
        expect(result.passed).toBe(false);
        expect(result.validator).toBe('PriceValidator');
        expect(result.reason).toBe('Price is not a number');
    });

    // 测试价格是否为0
    test('should return false if price is 0', () => {
        const ticker = {
            symbol: 'BTC-USDT',
            price: '0'
        };
        const result = validatePrice(ticker);
        // 验证返回为False，验证器为PriceValidator
        expect(result.passed).toBe(false);
        expect(result.validator).toBe('PriceValidator');
        expect(result.reason).toBe('Price must be greater than zero');
    });

    // 测试价格是否大于0
    test('should pass wher price is grater than 0',()=>{
        const ticker = {
            symbol: 'BTC-USDT',
            price: '100'
        };
        const result = validatePrice(ticker);
        // 验证返回为True，验证器为PriceValidator
        expect(result.passed).toBe(true);
    });
});