/**
 * Encontre o número único em um array onde todos os outros são iguais.
 * Exemplo: [1, 1, 1, 2, 1, 1] => 2
 */
function findUniq(array: number[]): number {
    var a = array[0], b = array[1], c = array[2];
    var candidate = (a === b) ? a : (a === c ? b : a);
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== candidate) return array[i];
    }
    return candidate;
}

// Exemplos de uso
console.log(findUniq([1, 1, 1, 2, 1, 1])); // 2
console.log(findUniq([0, 0, 0.55, 0, 0])); // 0.55
