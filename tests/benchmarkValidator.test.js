const {validateBenchmark} = require('../src/validators/benchmarkValidator');
const {clearState} = require('../src/state/marketState');
const {updateLastTicker} = require('../src/state/marketState');

describe("Benchmark Validator", () => {
    beforeEach(() => {
        clearState();
    });
    test("should return SKIP if history data is less than 2", () => {
        const ticker = {
            exchange: 'BINANCE',
            symbol: 'BTC-USDT',
            price: 100,
            ask: 100,
            bid: 100,
            timestamp: Date.now()
        };
        const result = validateBenchmark(ticker);
        expect(result.status).toBe('SKIP');
        expect(result.reason).toBe('Waiting for other exchange data');
        expect(result.validator).toBe('BenchmarkValidator');
    });

    test ("should PASS if deviation is less than threshold", () => {
        updateLastTicker({
            exchange: 'OKX',
            symbol: 'BTC-USDT',
            price: 101,
            ask: 101,
            bid: 101,
            timestamp: 1711111111111
        });
        const ticker = {
            exchange: 'BINANCE',
            symbol: 'BTC-USDT',
            price: 100,
            ask: 100,
            bid: 100,
            timestamp: 1711111111112
        };
        const result = validateBenchmark(ticker);
        expect(result.passed).toBe(true);
        expect(result.validator).toBe('BenchmarkValidator');
        expect(result.reason).toBe('Price within 1% of benchmark (101)');
        });

        test ("should FAIL if deviation is greater than threshold", () => {
            updateLastTicker({
                exchange: 'OKX',
                symbol: 'BTC-USDT',
                price: 101,
                ask: 101,
                bid: 101,
                timestamp: 1711111111111
            });
            const ticker = {
                exchange: 'BINANCE',
                symbol: 'BTC-USDT',
                price: 90,
                ask: 90,
                bid: 90,
                timestamp: 1711111111112
            };

            const result = validateBenchmark(ticker);
            expect(result.passed).toBe(false);
            expect(result.validator).toBe('BenchmarkValidator');
            expect(result.reason).toBe('Price deviates 10.89% from benchmark (101)');
        });

        test ("should Skil when only current exchange has data", () => {
            updateLastTicker({
                exchange: 'BINANCE',
                symbol: 'BTC-USDT',
                price: 100,
                ask: 100,
                bid: 100,
                timestamp: 1711111111112
            });
            const ticker = {
                exchange: 'BINANCE',
                symbol: 'BTC-USDT',
                price: 101,
                ask: 101,
                bid: 101,
                timestamp: 1711111111112
            };
            const result = validateBenchmark(ticker);
            expect(result.status).toBe('SKIP');
            expect(result.reason).toBe('Waiting for other exchange data');
            expect(result.validator).toBe('BenchmarkValidator');
    });
    test ("shoudl skip when benchmark exchange price is invalid", () => {
        updateLastTicker({
            exchange: 'OKX',
            symbol: 'BTC-USDT',
            price: NaN,
            ask: 101,
            bid: 101,
            timestamp: 1711111111111
        });
        const ticker = {
            exchange: 'BINANCE',
            symbol: 'BTC-USDT',
            price: 100,
            ask: 100,
            bid: 100,
            timestamp: 1711111111112
        };
        const result = validateBenchmark(ticker);
        expect(result.status).toBe('SKIP');
        expect(result.reason).toBe('Waiting for other exchange data');
        expect(result.validator).toBe('BenchmarkValidator');
    });
});