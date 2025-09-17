/**
 * Selection Sort - Algoritmo de ordenação simples (O(n^2)), in-place.
 * Apenas recursos nativos, sem libs.
 */
function selectionSort(arr: number[]): void {
    for (var i = 0; i < arr.length - 1; i++) {
        var minIdx = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
            var tmp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = tmp;
        }
    }
}

// Exemplo de uso
var arr = [64, 25, 12, 22, 11];
selectionSort(arr);
console.log(arr); // [11, 12, 22, 25, 64]
