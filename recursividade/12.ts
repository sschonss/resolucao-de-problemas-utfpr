// Exercício 12: PRIMEIRA OCORRÊNCIA ORDENADO - Idem ao anterior, mas suponha que a matriz
// unidimensional esteja ordenada. Preze pela eficiência.

// Solução 1: Busca binária recursiva
function primeiraOcorrenciaOrdenada(matriz: number[], valor: number, inicio: number = 0, fim: number = matriz.length - 1): number {
    // Caso base: não encontrado
    if (inicio > fim) {
        return -1;
    }
    
    const meio = Math.floor((inicio + fim) / 2);
    
    // Se encontrou o valor, verifica se é a primeira ocorrência
    if (matriz[meio] === valor) {
        // Verifica se é o primeiro elemento ou se o anterior é diferente
        if (meio === 0 || matriz[meio - 1] !== valor) {
            return meio;
        }
        // Se não é a primeira, busca na metade esquerda
        return primeiraOcorrenciaOrdenada(matriz, valor, inicio, meio - 1);
    }
    
    // Se valor é menor, busca na metade esquerda
    if (valor < matriz[meio]) {
        return primeiraOcorrenciaOrdenada(matriz, valor, inicio, meio - 1);
    }
    
    // Se valor é maior, busca na metade direita
    return primeiraOcorrenciaOrdenada(matriz, valor, meio + 1, fim);
}

// Solução 2: Busca binária com contador de comparações
function primeiraOcorrenciaOrdenadaComContador(matriz: number[], valor: number): { index: number, comparisons: number } {
    let comparisons = 0;
    
    function buscarRecursivo(inicio: number, fim: number): number {
        comparisons++;
        
        if (inicio > fim) {
            return -1;
        }
        
        const meio = Math.floor((inicio + fim) / 2);
        
        if (matriz[meio] === valor) {
            // Verifica se é a primeira ocorrência
            if (meio === 0 || matriz[meio - 1] !== valor) {
                return meio;
            }
            return buscarRecursivo(inicio, meio - 1);
        }
        
        if (valor < matriz[meio]) {
            return buscarRecursivo(inicio, meio - 1);
        }
        
        return buscarRecursivo(meio + 1, fim);
    }
    
    const index = buscarRecursivo(0, matriz.length - 1);
    return { index, comparisons };
}

// Testes
console.log("=== Exercício 12: PRIMEIRA OCORRÊNCIA ORDENADO ===");

// Matriz de teste ordenada (20 elementos)
const matrizOrdenadaTeste = [1, 3, 5, 7, 7, 7, 9, 11, 13, 13, 15, 17, 19, 19, 19, 19, 21, 23, 25, 27];
console.log("Matriz ordenada (20 elementos):", matrizOrdenadaTeste);

const valoresBusca = [7, 19, 1, 27, 8, 13];
valoresBusca.forEach(valor => {
    const resultado1 = primeiraOcorrenciaOrdenada(matrizOrdenadaTeste, valor);
    const resultado2 = primeiraOcorrenciaOrdenadaComContador(matrizOrdenadaTeste, valor);
    
    console.log(`\nBuscando ${valor}:`);
    console.log(`  Resultado: índice ${resultado1}`);
    console.log(`  Com contador: índice ${resultado2.index}, ${resultado2.comparisons} comparações`);
});
