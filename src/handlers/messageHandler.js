 // 运行验证器并返回结果
 const {runValidators} = require('../validators/validatorManager');
 // 报告结果
 const {reportResults} = require('../reporters/consoleReporter');
 const {adaptTicker} = require('../adapters/adapterManager');
 
 function handleMessage(message){
    // 订阅成功
    if(message.event === 'subscribe'){
        console.log("✅ Subscribe Success")
        return;
    }
    if(message.data && message.data.length > 0){
        // 收到Ticker消息
        console.log("Received Ticker message:")
        const rawTicker = message.data[0];
        // 适配ticker
        const standardTicker = adaptTicker('OKX',rawTicker);

        // 获取验证器结果
        const results = runValidators(standardTicker);
        // 报告结果
        reportResults(standardTicker,results);
        return;
    }
        // 收到未知消息
        console.log("Received Unknown message:")
}

 module.exports = {
    handleMessage
 };