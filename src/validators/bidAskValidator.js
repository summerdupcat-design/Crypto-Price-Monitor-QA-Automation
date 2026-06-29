// 最大价差百分比
const {validationConfig} = require('../config/validationConfig');
 function validateBidAsk(ticker){
    const ask = Number(ticker.askPx);
    const bid = Number(ticker.bidPx);

    if(Number.isNaN(ask) || Number.isNaN(bid)){
        // 验证ask和bid是否为数字
        return{
            validator:"BidAskValidator",
            passed:false,
            reason:"Bid/Ask is not a number",
            data:{ask:ask, bid:bid}
        }
    }if(ask<=0 || bid<=0){
        // 验证ask和bid是否大于0
        return{
            validator:"BidAskValidator",
            passed:false,
            reason:"Bid/Ask must be greater than zero",
            data:{ask:ask, bid:bid}
        }
    }if(ask < bid){
        // 验证ask是否小于bid
        return{
            validator:"BidAskValidator",
            passed:false,
            reason:"Ask price is less than Bid price",
            data:{ask:ask, bid:bid}
        }
    }
    const spread = (ask - bid)/bid;
    if(spread > validationConfig.MAX_SPREAD_PERCENT){
        // 验证价差是否大于最大价差百分比
        return{
            validator:"BidAskValidator",
            passed:false,
            reason:"Spread is greater than 5%",
            data:{ask:ask, bid:bid, spread:spread}
        }     
    }
    return{
        // 返回验证结果
        validator:"BidAskValidator",
        passed:true,
        reason:"Bid/Ask is valid",
        data:{ask:ask, bid:bid, spread:spread}
    }
 }

 module.exports = {
    validateBidAsk
 };