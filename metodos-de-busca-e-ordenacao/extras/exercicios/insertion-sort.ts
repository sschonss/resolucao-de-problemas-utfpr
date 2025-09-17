/**
 * Insertion Sort - Algoritmo de ordenação simples (O(n^2)), in-place.
 * Apenas recursos nativos, sem libs.
 */
function insertionSort(arr: number[]): void {
    for (var i = 1; i < arr.length; i++) {
        var key = arr[i];
        var j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Exemplo de uso
var arr = [5, 2, 9, 1, 5, 6];
insertionSort(arr);
console.log(arr); // [1, 2, 5, 5, 6, 9]
