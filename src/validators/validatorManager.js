const {validateTimestamp} = require('./timestampValidator');
const {validatePrice} = require('./priceValidator');
const {validateDuplicate} = require('./duplicateValidator');
const {validateBidAsk} = require('./bidAskValidator');

const validators = [
    validateTimestamp,
    validatePrice,
    validateDuplicate,
    validateBidAsk
];

function runValidators(ticker){
        // 故障隔离，单个验证器失败不影响其他验证器,map遍历整个数组，返回一个包含所有验证器结果的数组
        const results = validators.map((validator) => {
            try{
                return validator(ticker);
            }catch(error){
                return{
                    validator:validator.name,
                    passed:false,
                    reason:error.message,
                    data:{}
                };
            }
        });  
        return results;
}

module.exports = {
    runValidators
};