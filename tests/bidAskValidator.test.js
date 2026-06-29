const {validateBidAsk} = require('../src/validators/bidAskValidator');

describe ('BidAsk Validator', () => {

    // 测试ask和bid是否为数字
    test ('should return false if ask or bid is not a number', () => {
        const ticker = {
            instId: 'BTC-USDT',
            askPx: 'abc',
            bidPx: '100'
        };
        const result = validateBidAsk(ticker);
        expect(result.passed).toBe(false);
        expect(result.validator).toBe('BidAskValidator');
        expect(result.reason).toBe('Bid/Ask is not a number');
    });

    // 测试ask和bid是否大于0
    test('should return false if ask or bid is not greater then 0',()=>{
    const ticker = {
        instId: 'BTC-USDT',
        askPx: '0',
        bidPx: '100'
    };
    const result = validateBidAsk(ticker);
    expect(result.passed).toBe(false);
    expect(result.validator).toBe('BidAskValidator');
    expect(result.reason).toBe('Bid/Ask must be greater than zero');
    });

    // 测试ask是否小于bid
    test('should return false if ask is less than bid',()=>{
    const ticker = {
        instId: 'BTC-USDT',
        askPx: '100',
        bidPx: '200'
    };
    const result = validateBidAsk(ticker);
    expect(result.passed).toBe(false);
    expect(result.validator).toBe('BidAskValidator');
    expect(result.reason).toBe('Ask price is less than Bid price');
});

    // 测试价差大于5%
    test('should return false if spread is greater than 5%',()=>{
    const ticker = {
        instId: 'BTC-USDT',
        askPx: '106',
        bidPx: '100'
    };
    const result = validateBidAsk(ticker);
    expect(result.passed).toBe(false);
    expect(result.validator).toBe('BidAskValidator');
    expect(result.reason).toBe('Spread is greater than 5%');
});

    // 测试价差小于等于5%
    test('should pass when spread is less than 5%',()=>{
        const ticker = {
            instId: 'BTC-USDT',
            askPx: '105',
            bidPx: '100'
        };
        const result = validateBidAsk(ticker);
        expect(result.passed).toBe(true);
        expect(result.validator).toBe('BidAskValidator');
        expect(result.reason).toBe('Bid/Ask is valid');
    });
});