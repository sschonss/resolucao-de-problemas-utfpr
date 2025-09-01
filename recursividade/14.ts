// Exercício 14: SOMA DOS ELEMENTOS - Considere a mesma matriz unidimensional, não ordenada. 
// Retorne recursivamente soma dos elementos.

// Solução 1: Recursão simples
function somaElementos(matriz: number[], indice: number = 0): number {
    // Caso base: chegou ao final da matriz
    if (indice >= matriz.length) {
        return 0;
    }
    
    // Soma o elemento atual com a soma do resto
    return matriz[indice] + somaElementos(matriz, indice + 1);
}

// Solução 2: Recursão com acumulador
function somaElementosAcumulador(matriz: number[], indice: number = 0, acumulador: number = 0): number {
    // Caso base: chegou ao final da matriz
    if (indice >= matriz.length) {
        return acumulador;
    }
    
    // Chamada recursiva acumulando o valor
    return somaElementosAcumulador(matriz, indice + 1, acumulador + matriz[indice]);
}

// Testes
console.log("=== Exercício 14: SOMA DOS ELEMENTOS ===");

// Matriz de teste (20 elementos conforme especificação)
const matrizTeste = [15, 3, 8, 12, 8, 7, 21, 8, 5, 18, 8, 14, 9, 8, 11, 6, 8, 19, 2, 8];
console.log("Matriz de teste (20 elementos):", matrizTeste);

console.log("Soma dos elementos (recursão simples):", somaElementos(matrizTeste));
console.log("Soma dos elementos (com acumulador):", somaElementosAcumulador(matrizTeste));

// Teste com outras matrizes
const matrizPequena = [1, 2, 3, 4, 5];
console.log("\nMatriz pequena:", matrizPequena);
console.log("Soma:", somaElementos(matrizPequena));

const matrizVaziaEx14: number[] = [];
console.log("\nMatriz vazia:", matrizVaziaEx14);
console.log("Soma:", somaElementos(matrizVaziaEx14));
