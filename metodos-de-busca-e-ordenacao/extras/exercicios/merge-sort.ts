/**
 * Merge Sort - Algoritmo de ordenação estável e eficiente (O(n log n))
 * Implementação recursiva, apenas recursos nativos.
 */
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    var meio = Math.floor(arr.length / 2);
    var esquerda = mergeSort(arr.slice(0, meio));
    var direita = mergeSort(arr.slice(meio));
    var resultado = [], i = 0, j = 0;
    while (i < esquerda.length && j < direita.length) {
        if (esquerda[i] < direita[j]) resultado.push(esquerda[i++]);
        else resultado.push(direita[j++]);
    }
    while (i < esquerda.length) resultado.push(esquerda[i++]);
    while (j < direita.length) resultado.push(direita[j++]);
    return resultado;
}

// Exemplo de uso
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10])); // [3, 9, 10, 27, 38, 43, 82]
