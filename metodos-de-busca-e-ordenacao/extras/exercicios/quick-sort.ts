/**
 * Quick Sort - Algoritmo de ordenação eficiente (O(n log n) médio)
 * Implementação recursiva, in-place, apenas recursos nativos.
 */
function quickSort(arr: number[], inicio?: number, fim?: number): void {
    if (typeof inicio === 'undefined') inicio = 0;
    if (typeof fim === 'undefined') fim = arr.length - 1;
    if (inicio < fim) {
        var pivo = arr[fim], i = inicio - 1;
        for (var j = inicio; j < fim; j++) {
            if (arr[j] <= pivo) {
                i++;
                var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
            }
        }
        var tmp2 = arr[i+1]; arr[i+1] = arr[fim]; arr[fim] = tmp2;
        var pos = i+1;
        quickSort(arr, inicio, pos-1);
        quickSort(arr, pos+1, fim);
    }
}

// Exemplo de uso
var arr = [10, 7, 8, 9, 1, 5];
quickSort(arr);
console.log(arr); // [1, 5, 7, 8, 9, 10]
