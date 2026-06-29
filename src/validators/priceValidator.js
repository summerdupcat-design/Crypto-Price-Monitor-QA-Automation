
function validatePrice(ticker){
    // 获取当前价格
    const currentPrice = Number(ticker.price);
    if(Number.isNaN(currentPrice)){
        // 验证价格是否为数字
        return{
            validator:"PriceValidator",
            passed:false,
            reason:"Price is not a number",
            data:{price:currentPrice}
        };
    }
    if(currentPrice <= 0){
        // 验证价格是否大于0
        return{
            validator:"PriceValidator",
            passed:false,
            reason:"Price must be greater than zero",
            data:{price:currentPrice}
        };
    }
    return{
        validator:"PriceValidator",
        passed:true,
        reason:"Price is valid",
        data:{price:currentPrice}
    };
}

module.exports = {
    validatePrice
};