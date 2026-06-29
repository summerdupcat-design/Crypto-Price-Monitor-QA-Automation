 // 运行验证器并返回结果
 const {runValidators} = require('../validators/validatorManager');
 // 报告结果
 const {reportResults} = require('../reporters/consoleReporter');
 
 function handleMessage(message){
    // 订阅成功
    if(message.event === 'subscribe'){
        console.log("✅ Subscribe Success")
        return;
    }
    if(message.data && message.data.length > 0){
        // 收到Ticker消息
        console.log("Received Ticker message:")
        const ticker = message.data[0];

        // 获取验证器结果
        const results = runValidators(ticker);
        // 报告结果
        reportResults(ticker,results);
        return;
    }
        // 收到未知消息
        console.log("Received Unknown message:")
}

 module.exports = {
    handleMessage
 };