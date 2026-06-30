const { calculateMedian } = require('../src/utils/statistics');
const { calculateDeviation } = require('../src/utils/statistics');

describe('calculateMedian',() => {

    test('should return null if values is empty', () => {
        // 测试空数组
        const result = calculateMedian([]);
        expect(result).toBeNull();
    });
    test('should return null if values is not a number', () => {
        // 测试非数字数组
        const result = calculateMedian(['a', 'b', 'c']);
        expect(result).toBeNull();
    });
    test('should return the middle value for odd length array', () => {
        // 测试奇数数组
        const result = calculateMedian([1, 2, 3, 4, 5]);
        expect(result).toBe(3);
    });
    test('should return the average of the two middle values for even length array', () => {
        // 测试偶数数组
        const result = calculateMedian([1, 2, 3, 4, 5, 6]);
        expect(result).toBe(3.5);
    });
});

describe('calculateDeviation',() => {
    // 测试基准价格为NaN
    test('should return null if benchmarkPrice is NaN', () => {
        const result = calculateDeviation(100, NaN);
        expect(result).toBeNull();
    });
    // 测试基准价格为0
    test('should return null if benchmarkPrice is 0', () => {
        const result = calculateDeviation(100, 0);
        expect(result).toBeNull();
    });
    // 测试基准价格不为NaN或0
    test('should return the deviation if benchmarkPrice is not NaN or 0', () => {
        const result = calculateDeviation(110, 100);
        expect(result).toBe(0.1);
    });
});
