function reportResults(ticker,results){
    console.log("--------------------------------");
    console.log("Symbol:", ticker.instId);
    
    results.forEach(result => {
        // 如果验证器通过，则打印✅，否则打印❌
        if(result.passed){
            console.log(`✅ ${result.validator}`);
        }else{
            console.log(`❌ ${result.validator}: ${result.reason}`);
        }
    });
    console.log("--------------------------------");
}
module.exports = {
    reportResults
};