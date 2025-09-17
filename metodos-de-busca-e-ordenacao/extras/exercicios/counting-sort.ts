/**
 * Counting Sort - Algoritmo de ordenação eficiente para inteiros não-negativos.
 * Não usa Math, apenas recursos nativos.
 * Limitação: só funciona para inteiros >= 0.
 */
function countingSort(arr: number[]): void {
    if (arr.length === 0) return;
    // Encontrar o maior valor (sem Math.max)
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    var count: number[] = [];
    for (var i = 0; i <= max; i++) count[i] = 0;
    for (var i = 0; i < arr.length; i++) count[arr[i]]++;
    var idx = 0;
    for (var i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[idx++] = i;
            count[i]--;
        }
    }
}

// Exemplo de uso
var arr = [4, 2, 2, 8, 3, 3, 1];
countingSort(arr);
console.log(arr); // [1, 2, 2, 3, 3, 4, 8]
