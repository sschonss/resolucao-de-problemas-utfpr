/**
 * Bubble Sort - Algoritmo de ordenação simples (O(n^2)), in-place.
 * Apenas recursos nativos, sem libs.
 */
function bubbleSort(arr: number[]): void {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

// Exemplo de uso
var arr = [5, 1, 4, 2, 8];
bubbleSort(arr);
console.log(arr); // [1, 2, 4, 5, 8]
