 // 运行验证器并返回结果
 const {runValidators} = require('../validators/validatorManager');
 // 报告结果
 const {reportResults} = require('../reporters/consoleReporter');
 const {adaptTicker} = require('../adapters/adapterManager');
 const {updateLastTicker} = require('../state/marketState');
 const {generateHtmlReport} = require('../reporters/htmlReporter');
 // 处理Ticker消息
 function processTicker(exchange, rawTicker) {
    console.log('Received Ticker message:');
    // 适配Ticker
    const standardTicker = adaptTicker(exchange, rawTicker);
    // 校验
    const results = runValidators(standardTicker);
    // 报告结果
    reportResults(standardTicker, results);
    // 生成HTML报告
    generateHtmlReport(standardTicker, results);
    // 更新最后一条Ticker
    updateLastTicker(standardTicker);
 }
// 处理消息
 function handleMessage(exchange, message) {
    // 处理OKX消息
    if (exchange === 'OKX') {
        if (message.event === 'subscribe') {
            console.log('✅ OKX Subscribe Success');
            return;
        }
        if (message.data?.length > 0) {
            processTicker(exchange, message.data[0]);
            return;
        }
    }
    // 处理Binance消息
    if (exchange === 'BINANCE') {
        if (message.result !== undefined && message.id !== undefined) {
            console.log('✅ Binance Subscribe Success');
            return;
        }
        if (message.s && message.b && message.a) {
            processTicker(exchange, message);
            return;
        }
    }

    console.log('Received Unknown message:', JSON.stringify(message).slice(0, 200));
}

 module.exports = {
    handleMessage
 };
