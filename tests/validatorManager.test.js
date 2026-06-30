const {runValidators} = require('../src/validators/validatorManager');

describe('Validator Manager', () => {
    test('should return an array of validators', () => {
        const ticker = {
            instId: 'BTC-USDT',
            askPx: '100',
            bidPx: '100',
            last: '100',
            ts: Date.now().toString()
        };
        const results = runValidators(ticker);
        expect(results).toBeInstanceOf(Array);
        expect(results.length).toBeGreaterThan(0);
    });

    test('shoudl include all validators', () => {
        const ticker = {
            exchange: 'BINANCE',
            symbol: 'BTC-USDT',
            price: 100,
            ask: 100,
            bid: 100,
            timestamp: Date.now()
        };
        const results = runValidators(ticker);
        expect(results.length).toBeGreaterThan(1);
        expect(results.map(v => v.validator)).toEqual([
            'TimestampValidator',
            'PriceValidator',
            'DuplicateValidator',
            'BidAskValidator',
            'BenchmarkValidator'
        ]);
    });
});
