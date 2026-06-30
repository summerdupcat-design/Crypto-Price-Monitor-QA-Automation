function reportResults(ticker, results) {
    console.log('--------------------------------');
    console.log('Symbol:', ticker.symbol);

    results.forEach((result) => {
        const label = `${ticker.exchange}:${result.validator}`;

        if (result.status === 'SKIP' || result.passed === null) {
            // 如果验证器跳过，则打印⏭️
            console.log(`⏭️  ${label}: ${result.reason}`);
        } else if (result.passed) {
            // 如果验证器通过，则打印✅
            console.log(`✅ ${label}`);
        } else {
            // 如果验证器不通过，则打印❌
            console.log(`❌ ${label}: ${result.reason}`);
        }
    });
    console.log('--------------------------------');
}

module.exports = {
    reportResults
};
