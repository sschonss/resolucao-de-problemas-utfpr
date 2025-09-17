/**
 * Encontre o segundo maior valor em um array.
 * Exemplo: [10, 5, 8, 12, 7] => 10
 */
function findSecondLargest(array: number[]): number | null {
    var max = -Infinity, second = -Infinity;
    for (var i = 0; i < array.length; i++) {
        var n = array[i];
        if (n > max) {
            second = max;
            max = n;
        } else if (n > second && n < max) {
            second = n;
        }
    }
    return second === -Infinity ? null : second;
}

// Exemplos de uso
console.log(findSecondLargest([10,5,8,12,7])); // 10
console.log(findSecondLargest([1,2,3,4])); // 3
