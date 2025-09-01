// Use a mesma classe para os exercícios 11 e 12
class BuscaRecursiva {
    
    // Exercício 11: PRIMEIRA OCORRÊNCIA - Dado um inteiro e uma matriz unidimensional de 20 inteiros 
    // não ordenados, retorne a posição da primeira ocorrência do inteiro na matriz. Caso não haja ocorrência, retorne -1.
    
    // Solução 1: Recursão com índice
    static primeiraOcorrencia(matriz: number[], valor: number, indice: number = 0): number {
        // Caso base: chegou ao final da matriz sem encontrar
        if (indice >= matriz.length) {
            return -1;
        }
        
        // Caso base: encontrou o valor
        if (matriz[indice] === valor) {
            return indice;
        }
        
        // Chamada recursiva para próximo índice
        return this.primeiraOcorrencia(matriz, valor, indice + 1);
    }
    
    // Solução 2: Recursão dividindo a matriz
    static primeiraOcorrenciaSubarray(matriz: number[], valor: number): number {
        // Função auxiliar que mantém o offset do índice original
        function buscar(arr: number[], offset: number): number {
            // Caso base: array vazio
            if (arr.length === 0) {
                return -1;
            }
            
            // Verifica o primeiro elemento
            if (arr[0] === valor) {
                return offset;
            }
            
            // Busca recursivamente no resto do array
            return buscar(arr.slice(1), offset + 1);
        }
        
        return buscar(matriz, 0);
    }
    
    // Exercício 12: PRIMEIRA OCORRÊNCIA ORDENADO - Idem ao anterior, mas suponha que a matriz
    // unidimensional esteja ordenada. Preze pela eficiência.
    
    // Solução 1: Busca binária recursiva
    static primeiraOcorrenciaOrdenada(matriz: number[], valor: number, inicio: number = 0, fim: number = matriz.length - 1): number {
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
            return this.primeiraOcorrenciaOrdenada(matriz, valor, inicio, meio - 1);
        }
        
        // Se valor é menor, busca na metade esquerda
        if (valor < matriz[meio]) {
            return this.primeiraOcorrenciaOrdenada(matriz, valor, inicio, meio - 1);
        }
        
        // Se valor é maior, busca na metade direita
        return this.primeiraOcorrenciaOrdenada(matriz, valor, meio + 1, fim);
    }
    
    // Solução 2: Busca binária com contador de comparações
    static primeiraOcorrenciaOrdenadaComContador(matriz: number[], valor: number): { index: number, comparisons: number } {
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
}

// Testes
console.log("=== Exercícios 11 e 12: PRIMEIRA OCORRÊNCIA ===");

// Matriz de teste não ordenada (20 elementos)
const matrizNaoOrdenada = [5, 12, 8, 12, 3, 7, 12, 9, 15, 4, 12, 6, 18, 12, 2, 11, 14, 12, 1, 20];
console.log("Matriz não ordenada (20 elementos):", matrizNaoOrdenada);

console.log("\n--- Exercício 11: Busca em matriz não ordenada ---");
const valoresTesteNaoOrdenada = [12, 5, 20, 25, 3];
valoresTesteNaoOrdenada.forEach(valor => {
    const resultado1 = BuscaRecursiva.primeiraOcorrencia(matrizNaoOrdenada, valor);
    const resultado2 = BuscaRecursiva.primeiraOcorrenciaSubarray(matrizNaoOrdenada, valor);
    
    console.log(`Buscando ${valor}:`);
    console.log(`  Com índice: ${resultado1}`);
    console.log(`  Com subarray: ${resultado2}`);
});

// Matriz de teste ordenada (20 elementos)
const matrizOrdenada = [1, 3, 5, 7, 7, 7, 9, 11, 13, 13, 15, 17, 19, 19, 19, 19, 21, 23, 25, 27];
console.log("\n--- Exercício 12: Busca em matriz ordenada ---");
console.log("Matriz ordenada (20 elementos):", matrizOrdenada);

const valoresTesteOrdenada = [7, 19, 1, 27, 8, 13];
valoresTesteOrdenada.forEach(valor => {
    const resultado1 = BuscaRecursiva.primeiraOcorrenciaOrdenada(matrizOrdenada, valor);
    const resultado2 = BuscaRecursiva.primeiraOcorrenciaOrdenadaComContador(matrizOrdenada, valor);
    
    console.log(`\nBuscando ${valor}:`);
    console.log(`  Resultado: índice ${resultado1}`);
    console.log(`  Com contador: índice ${resultado2.index}, ${resultado2.comparisons} comparações`);
});
