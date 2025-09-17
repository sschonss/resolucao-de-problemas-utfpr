/**
 * Shell Sort - Algoritmo de ordenação (O(n^2) no pior caso, mas geralmente mais rápido que insertion/bubble/selection).
 * Apenas recursos nativos, sem libs.
 */
function shellSort(arr: number[]): void {
    var n = arr.length;
    for (var gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (var i = gap; i < n; i++) {
            var temp = arr[i];
            var j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}

// Exemplo de uso
var arr = [12, 34, 54, 2, 3];
shellSort(arr);
console.log(arr); // [2, 3, 12, 34, 54]
