// Exercício 7: Busca binária em array ordenado

// Solução 1: Recursão clássica com índices
function buscaBinariaRecursiva(arr: number[], target: number, inicio: number = 0, fim: number = arr.length - 1): number {
    // Caso base: elemento não encontrado
    if (inicio > fim) {
        return -1;
    }
    
    // Calcula o meio
    const meio = Math.floor((inicio + fim) / 2);
    
    // Caso base: elemento encontrado
    if (arr[meio] === target) {
        return meio;
    }
    
    // Se o target é menor, busca na metade esquerda
    if (target < arr[meio]) {
        return buscaBinariaRecursiva(arr, target, inicio, meio - 1);
    }
    
    // Se o target é maior, busca na metade direita
    return buscaBinariaRecursiva(arr, target, meio + 1, fim);
}

// Solução 2: Recursão criando novos subarrays
function buscaBinariaSubarray(arr: number[], target: number): number {
    // Função auxiliar que retorna o índice relativo ao array original
    function buscar(subArr: number[], offset: number): number {
        // Caso base: array vazio
        if (subArr.length === 0) {
            return -1;
        }
        
        const meio = Math.floor(subArr.length / 2);
        
        // Elemento encontrado
        if (subArr[meio] === target) {
            return offset + meio;
        }
        
        // Busca na metade esquerda
        if (target < subArr[meio]) {
            return buscar(subArr.slice(0, meio), offset);
        }
        
        // Busca na metade direita
        return buscar(subArr.slice(meio + 1), offset + meio + 1);
    }
    
    return buscar(arr, 0);
}

// Solução 3: Recursão com busca por intervalo
function buscaBinariaIntervalo(arr: number[], target: number): { index: number, comparisons: number } {
    let comparisons = 0;
    
    function buscar(inicio: number, fim: number): number {
        comparisons++;
        
        if (inicio > fim) {
            return -1;
        }
        
        const meio = Math.floor((inicio + fim) / 2);
        
        if (arr[meio] === target) {
            return meio;
        }
        
        if (target < arr[meio]) {
            return buscar(inicio, meio - 1);
        }
        
        return buscar(meio + 1, fim);
    }
    
    const index = buscar(0, arr.length - 1);
    return { index, comparisons };
}

// Solução 4: Busca binária genérica com função de comparação
function buscaBinariaGenerica<T>(
    arr: T[], 
    target: T, 
    compareFn: (a: T, b: T) => number,
    inicio: number = 0, 
    fim: number = arr.length - 1
): number {
    if (inicio > fim) {
        return -1;
    }
    
    const meio = Math.floor((inicio + fim) / 2);
    const comparison = compareFn(arr[meio], target);
    
    if (comparison === 0) {
        return meio;
    }
    
    if (comparison > 0) {
        return buscaBinariaGenerica(arr, target, compareFn, inicio, meio - 1);
    }
    
    return buscaBinariaGenerica(arr, target, compareFn, meio + 1, fim);
}

// Testes
console.log("=== Exercício 7: Busca Binária ===");

const arrayOrdenado = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
console.log("Array ordenado:", arrayOrdenado);

console.log("\n=== Testes de busca ===");
const valores = [1, 7, 13, 25, 2, 26, 0];

valores.forEach(valor => {
    const resultado1 = buscaBinariaRecursiva(arrayOrdenado, valor);
    const resultado2 = buscaBinariaSubarray(arrayOrdenado, valor);
    const resultado3 = buscaBinariaIntervalo(arrayOrdenado, valor);
    
    console.log(`\nBuscando ${valor}:`);
    console.log(`  Recursiva: ${resultado1}`);
    console.log(`  Subarray: ${resultado2}`);
    console.log(`  Com contador: índice ${resultado3.index}, ${resultado3.comparisons} comparações`);
});

// Teste com array de strings
console.log("\n=== Busca com strings ===");
const nomes = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];
const compareFnString = (a: string, b: string) => a.localeCompare(b);

console.log("Array de nomes:", nomes);
console.log('Buscando "Charlie":', buscaBinariaGenerica(nomes, "Charlie", compareFnString));
console.log('Buscando "Eve":', buscaBinariaGenerica(nomes, "Eve", compareFnString));
console.log('Buscando "Zoe":', buscaBinariaGenerica(nomes, "Zoe", compareFnString));

// Teste de performance
console.log("\n=== Teste de performance ===");
const arrayGrande = Array.from({length: 1000}, (_, i) => i * 2);
const resultado = buscaBinariaIntervalo(arrayGrande, 500);
console.log(`Busca em array de 1000 elementos: índice ${resultado.index}, ${resultado.comparisons} comparações`);
