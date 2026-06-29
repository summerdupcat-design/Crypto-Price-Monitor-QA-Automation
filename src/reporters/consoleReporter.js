function reportResults(ticker,results){
    console.log("--------------------------------");
    console.log('Symbol:', ticker.symbol);
    
    results.forEach(result => {
        // 如果验证器通过，则打印✅，否则打印❌
        if(result.passed){
            console.log(`✅ ${ticker.exchange}:${result.validator}`);
        }else{
            console.log(`❌ ${ticker.exchange}:${result.validator}: ${result.reason}`);
        }
    });
    console.log("--------------------------------");
}
module.exports = {
    reportResults
};