/**
 * Encontre o k-ésimo maior elemento em um array (Quickselect).
 * Exemplo: [7,10,4,3,20,15], k=3 => 7
 */
function quickSelect(arr: number[], k: number): number {
    function select(a: number[], l: number, r: number, k: number): number {
        if (l === r) return a[l];
        var pivot = a[r], p = l;
        for (var i = l; i < r; i++) {
            if (a[i] <= pivot) {
                var tmp = a[i]; a[i] = a[p]; a[p] = tmp;
                p++;
            }
        }
        var tmp2 = a[p]; a[p] = a[r]; a[r] = tmp2;
        var count = p - l + 1;
        if (count === k) return a[p];
        if (k < count) return select(a, l, p - 1, k);
        return select(a, p + 1, r, k - count);
    }
    return select(arr.slice(), 0, arr.length - 1, k);
}

// Exemplos de uso
console.log(quickSelect([7,10,4,3,20,15], 3)); // 7
console.log(quickSelect([1,2,3,4,5], 2)); // 2
