/**
 * Encontre todos os elementos que aparecem mais de n/3 vezes.
 * Exemplo: [1,2,3,1,2,1,1,2,2] => [1,2]
 */
function findElementsMoreThanNby3(array: number[]): number[] {
    var count1 = 0, count2 = 0, cand1 = null, cand2 = null;
    for (var i = 0; i < array.length; i++) {
        var n = array[i];
        if (cand1 !== null && n === cand1) count1++;
        else if (cand2 !== null && n === cand2) count2++;
        else if (count1 === 0) { cand1 = n; count1 = 1; }
        else if (count2 === 0) { cand2 = n; count2 = 1; }
        else { count1--; count2--; }
    }
    // Verifica candidatos
    var res = [], c1 = 0, c2 = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === cand1) c1++;
        else if (array[i] === cand2) c2++;
    }
    if (c1 > array.length/3) res.push(cand1);
    if (cand2 !== cand1 && c2 > array.length/3) res.push(cand2);
    return res;
}

// Exemplos de uso
console.log(findElementsMoreThanNby3([1,2,3,1,2,1,1,2,2])); // [1,2]
console.log(findElementsMoreThanNby3([1,2,3,4,5])); // []
