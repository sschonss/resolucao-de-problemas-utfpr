/**
 * Encontre o maior valor que aparece apenas uma vez no array.
 * Exemplo: [1, 2, 2, 3, 3, 4] => 4
 */
function findLargestUnique(array: number[]): number | null {
    var counts: {[key: string]: number} = {};
    for (var i = 0; i < array.length; i++) {
        var n = array[i];
        var key = '' + n;
        if (!(key in counts)) counts[key] = 0;
        counts[key]++;
    }
    var max: number | null = null;
    for (var k in counts) {
        if (counts[k] === 1 && (max === null || Number(k) > max)) max = Number(k);
    }
    return max;
}

// Exemplos de uso
console.log(findLargestUnique([1,2,2,3,3,4])); // 4
console.log(findLargestUnique([7,7,8,8,9])); // 9
