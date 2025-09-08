/**
 * EXERCÍCIO EXTRA 1: BUSCA BINÁRIA EM ARRAY ORDENADO
 * Implementa busca binária recursiva em array ordenado
 */

class BuscaBinaria {
    
    /**
     * Busca binária simples
     */
    static buscar(arr: number[], target: number, inicio: number = 0, fim: number = arr.length - 1): number {
        // Caso base: elemento não encontrado
        if (inicio > fim) {
            return -1;
        }
        
        const meio = Math.floor((inicio + fim) / 2);
        
        // Caso base: elemento encontrado
        if (arr[meio] === target) {
            return meio;
        }
        
        // Busca na metade esquerda
        if (target < arr[meio]) {
            return this.buscar(arr, target, inicio, meio - 1);
        }
        
        // Busca na metade direita
        return this.buscar(arr, target, meio + 1, fim);
    }
    
    /**
     * Busca binária com informações de debug
     */
    static buscarComDebug(arr: number[], target: number, inicio: number = 0, fim: number = arr.length - 1, nivel: number = 0): number {
        const indentacao = "  ".repeat(nivel);
        console.log(`${indentacao}Buscando ${target} no intervalo [${inicio}, ${fim}]`);
        
        if (inicio > fim) {
            console.log(`${indentacao}Elemento não encontrado`);
            return -1;
        }
        
        const meio = Math.floor((inicio + fim) / 2);
        console.log(`${indentacao}Verificando posição ${meio} (valor: ${arr[meio]})`);
        
        if (arr[meio] === target) {
            console.log(`${indentacao}✓ Encontrado na posição ${meio}!`);
            return meio;
        }
        
        if (target < arr[meio]) {
            console.log(`${indentacao}→ Buscando na metade esquerda`);
            return this.buscarComDebug(arr, target, inicio, meio - 1, nivel + 1);
        }
        
        console.log(`${indentacao}→ Buscando na metade direita`);
        return this.buscarComDebug(arr, target, meio + 1, fim, nivel + 1);
    }
    
    /**
     * Encontra primeira ocorrência em array com duplicatas
     */
    static primeiraOcorrencia(arr: number[], target: number, inicio: number = 0, fim: number = arr.length - 1): number {
        if (inicio > fim) {
            return -1;
        }
        
        const meio = Math.floor((inicio + fim) / 2);
        
        if (arr[meio] === target) {
            // Verifica se é a primeira ocorrência
            const esquerdaResult = this.primeiraOcorrencia(arr, target, inicio, meio - 1);
            return esquerdaResult !== -1 ? esquerdaResult : meio;
        }
        
        if (target < arr[meio]) {
            return this.primeiraOcorrencia(arr, target, inicio, meio - 1);
        }
        
        return this.primeiraOcorrencia(arr, target, meio + 1, fim);
    }
}

// Testes
console.log("=== EXERCÍCIO EXTRA 1: BUSCA BINÁRIA ===\n");

const arrayOrdenado = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Array:", arrayOrdenado);

console.log("\n1. Busca Simples:");
console.log(`Buscar 7: posição ${BuscaBinaria.buscar(arrayOrdenado, 7)}`);
console.log(`Buscar 12: posição ${BuscaBinaria.buscar(arrayOrdenado, 12)}`);

console.log("\n2. Busca com Debug:");
BuscaBinaria.buscarComDebug(arrayOrdenado, 7);

console.log("\n3. Array com duplicatas:");
const arrayComDuplicatas = [1, 2, 2, 2, 3, 4, 5];
console.log("Array:", arrayComDuplicatas);
console.log(`Primeira ocorrência de 2: posição ${BuscaBinaria.primeiraOcorrencia(arrayComDuplicatas, 2)}`);
