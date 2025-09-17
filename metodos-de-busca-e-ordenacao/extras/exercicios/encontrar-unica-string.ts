/**
 * Encontre a string única em um array onde todas as outras são iguais.
 * Exemplo: ["abc", "abc", "xyz", "abc"] => "xyz"
 */
function findUniqueString(array: string[]): string {
    var a = array[0], b = array[1], c = array[2];
    var candidate = (a === b) ? a : (a === c ? b : a);
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== candidate) return array[i];
    }
    return candidate;
}

// Exemplos de uso
console.log(findUniqueString(["abc", "abc", "xyz", "abc"])); // "xyz"
console.log(findUniqueString(["foo", "bar", "foo", "foo"])); // "bar"
