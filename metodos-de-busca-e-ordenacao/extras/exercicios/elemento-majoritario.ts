/**
 * Encontre o elemento que aparece mais da metade das vezes (Boyer-Moore).
 * Exemplo: [3,3,4,2,3,3,2,3,3] => 3
 */
function findMajorityElement(array: number[]): number | null {
    var count = 0, candidate = null;
    for (var i = 0; i < array.length; i++) {
        var n = array[i];
        if (count === 0) candidate = n;
        count += (n === candidate) ? 1 : -1;
    }
    // Verifica se realmente é majoritário
    var ocorrencias = 0;
    for (var i = 0; i < array.length; i++) if (array[i] === candidate) ocorrencias++;
    return ocorrencias > array.length / 2 ? candidate : null;
}

// Exemplos de uso
console.log(findMajorityElement([3,3,4,2,3,3,2,3,3])); // 3
console.log(findMajorityElement([1,2,3,4])); // null
