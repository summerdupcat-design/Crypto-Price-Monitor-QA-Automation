const { getSymbolState } = require('../state/marketState');
const { validationConfig } = require('../config/validationConfig');
const { calculateMedian, calculateDeviation, formatPercent } = require('../utils/statistics');


// 验证基准价格
function validateBenchmark(ticker) {
    const currentPrice = Number(ticker.price);
    // 验证当前价格是否为数字且不为0
    if (Number.isNaN(currentPrice)|| currentPrice === 0) {
        return {
            validator: 'BenchmarkValidator',
            passed: null,
            status: 'SKIP',
            reason: 'No valid current price available',
            data: { symbol: ticker.symbol, exchange: ticker.exchange }
        };
    }
    const symbolState = getSymbolState(ticker.symbol);
    // 获取其他交易所的价格
    const otherPrices = Array.from(symbolState.entries())
        // 过滤掉当前交易所
        .filter(([exchange]) => exchange !== ticker.exchange)
        // 获取其他交易所的最后一条价格
        .map(([, state]) => state.lastTicker?.price)
        // 过滤掉价格为空或NaN的价格
        .filter((price) => price != null && !Number.isNaN(Number(price)))
        // 转换为数字
        .map(Number);
    // 如果其他交易所的价格为空，则返回SKIP
    if (otherPrices.length === 0) {
        return {
            validator: 'BenchmarkValidator',
            passed: null,
            status: 'SKIP',
            reason: 'Waiting for other exchange data',
            data: { symbol: ticker.symbol, exchange: ticker.exchange }
        };
    }
    const benchmarkPrice = calculateMedian(otherPrices);

    if (Number.isNaN(benchmarkPrice)|| benchmarkPrice === 0) {
        return {
            validator: 'BenchmarkValidator',
            passed: null,
            status: 'SKIP',
            reason: 'No valid benchmark price available',
            data: { symbol: ticker.symbol, exchange: ticker.exchange }
        };
    }
    // 计算偏差
    const deviation = calculateDeviation(currentPrice, benchmarkPrice);
    if (Number.isNaN(deviation)) {
        return {
            validator: 'BenchmarkValidator',
            passed: null,
            status: 'SKIP',
            reason: 'No valid deviation available',
            data: { currentPrice, benchmarkPrice }
        };
    }
    // 计算阈值
    const threshold = validationConfig.MAX_BENCHMARK_DEVIATION;
    // 计算通过率
    const passed = deviation <= threshold;

    return {
        validator: 'BenchmarkValidator',
        passed,
        status: passed ? 'PASS' : 'FAIL',
        reason: passed
            ? `Price within ${formatPercent(threshold)}% of benchmark (${benchmarkPrice})`
            : `Price deviates ${formatPercent(deviation)}% from benchmark (${benchmarkPrice})`,
        data: {
            currentPrice,
            benchmarkPrice,
            otherPrices,
            deviation,
            threshold
        }
    };
}

module.exports = {
    validateBenchmark
};
