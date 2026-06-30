// 计算中位数
function calculateMedian(values) {
    if (!values || values.length === 0) return null;

    const numeric = values.map(Number).filter((value) => !Number.isNaN(value));
    if (numeric.length === 0) return null;

    const sorted = [...numeric].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
}

function calculateDeviation(currentPrice, benchmarkPrice) {
    if (Number.isNaN(benchmarkPrice) || benchmarkPrice === 0) return null;
    return Math.abs(currentPrice - benchmarkPrice) / benchmarkPrice;
}

function formatPercent(ratio, decimals = 2) {
    return parseFloat((ratio * 100).toFixed(decimals)).toString();
}

module.exports = {
    calculateMedian,
    calculateDeviation,
    formatPercent
};