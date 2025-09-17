/**
 * Todos os elementos aparecem duas vezes, exceto um. Encontre esse elemento.
 * Exemplo: [2,2,3,3,4] => 4
 * Dica: use XOR para O(n) e O(1) espaço.
 */
function findSingle(array: number[]): number {
    var result = 0;
    for (var i = 0; i < array.length; i++) {
        result = result ^ array[i];
    }
    return result;
}

// Exemplos de uso
console.log(findSingle([2,2,3,3,4])); // 4
console.log(findSingle([1,1,2,2,99])); // 99
