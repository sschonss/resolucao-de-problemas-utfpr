// Exercício 16: ESTÁ ORDENADO - Considere a mesma matriz unidimensional, não ordenada. 
// Retorne se a matriz unidimensional está em ordem crescente. Verifique recursivamente.

// Solução 1: Recursão simples
function estaOrdenado(matriz: number[], indice: number = 0): boolean {
    // Caso base: matriz com 0 ou 1 elemento está sempre ordenada
    if (matriz.length <= 1) {
        return true;
    }
    
    // Caso base: chegou ao penúltimo elemento (último par verificado)
    if (indice >= matriz.length - 1) {
        return true;
    }
    
    // Se o elemento atual é maior que o próximo, não está ordenado
    if (matriz[indice] > matriz[indice + 1]) {
        return false;
    }
    
    // Verifica recursivamente o resto da matriz
    return estaOrdenado(matriz, indice + 1);
}

// Solução 2: Recursão que permite crescente ou decrescente
function estaOrdenadoFlexivel(matriz: number[], crescente: boolean = true, indice: number = 0): boolean {
    // Caso base: matriz pequena
    if (matriz.length <= 1) {
        return true;
    }
    
    // Caso base: chegou ao fim
    if (indice >= matriz.length - 1) {
        return true;
    }
    
    // Verifica a ordem conforme especificado
    const ordemCorreta = crescente ? 
        matriz[indice] <= matriz[indice + 1] : 
        matriz[indice] >= matriz[indice + 1];
    
    if (!ordemCorreta) {
        return false;
    }
    
    return estaOrdenadoFlexivel(matriz, crescente, indice + 1);
}

// Testes
console.log("=== Exercício 16: ESTÁ ORDENADO ===");

// Matriz de teste (20 elementos conforme especificação) - não ordenada
const matrizEx16 = [15, 3, 8, 12, 8, 7, 21, 8, 5, 18, 8, 14, 9, 8, 11, 6, 8, 19, 2, 8];
console.log("Matriz não ordenada (20 elementos):", matrizEx16);
console.log("Está ordenada (crescente)?", estaOrdenado(matrizEx16));

// Teste com matriz ordenada
const matrizCrescenteEx16 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
console.log("\nMatriz ordenada crescente (20 elementos):", matrizCrescenteEx16);
console.log("Está ordenada (crescente)?", estaOrdenado(matrizCrescenteEx16));

// Teste com matriz decrescente
const matrizDecrescenteEx16 = [30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];
console.log("\nMatriz decrescente:", matrizDecrescenteEx16);
console.log("Está ordenada (crescente)?", estaOrdenado(matrizDecrescenteEx16));
console.log("Está ordenada (decrescente)?", estaOrdenadoFlexivel(matrizDecrescenteEx16, false));

// Testes especiais
const matrizUmElementoEx16 = [42];
console.log("\nMatriz com um elemento:", matrizUmElementoEx16);
console.log("Está ordenada?", estaOrdenado(matrizUmElementoEx16));

const matrizVaziaEx16: number[] = [];
console.log("\nMatriz vazia:", matrizVaziaEx16);
console.log("Está ordenada?", estaOrdenado(matrizVaziaEx16));
