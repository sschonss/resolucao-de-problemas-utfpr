/**
 * Encontre o objeto único em um array de objetos simples (propriedade 'id'), onde todos os outros são iguais.
 * Exemplo: [{id:1},{id:1},{id:2},{id:1}] => {id:2}
 */
function findUniqueObject(array: {id: number}[]): {id: number} {
    var a = array[0].id, b = array[1].id, c = array[2].id;
    var candidate = (a === b) ? a : (a === c ? b : a);
    for (var i = 0; i < array.length; i++) {
        if (array[i].id !== candidate) return array[i];
    }
    return array[0];
}

// Exemplos de uso
console.log(findUniqueObject([{id:1},{id:1},{id:2},{id:1}])); // {id:2}
console.log(findUniqueObject([{id:7},{id:7},{id:7},{id:3},{id:7}])); // {id:3}
