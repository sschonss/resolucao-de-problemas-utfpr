/**
 * Heap Sort - Algoritmo de ordenação eficiente (O(n log n)), in-place.
 * Apenas recursos nativos, sem libs.
 */
function heapSort(arr: number[]): void {
    var n = arr.length;
    function heapify(n: number, i: number) {
        var largest = i;
        var l = 2 * i + 1;
        var r = 2 * i + 2;
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;
        if (largest !== i) {
            var tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
            heapify(n, largest);
        }
    }
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    for (var i = n - 1; i > 0; i--) {
        var tmp2 = arr[0]; arr[0] = arr[i]; arr[i] = tmp2;
        heapify(i, 0);
    }
}

// Exemplo de uso
var arr = [12, 11, 13, 5, 6, 7];
heapSort(arr);
console.log(arr); // [5, 6, 7, 11, 12, 13]
