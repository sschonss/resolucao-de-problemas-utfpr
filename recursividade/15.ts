// Exercício 15: NÚMERO DE OCORRÊNCIAS - Considere a mesma matriz unidimensional, não ordenada. 
// Dado um inteiro, retorne recursivamente quantas ocorrências deste há na matriz.

// Solução 1: Recursão simples
function numeroOcorrencias(matriz: number[], valor: number, indice: number = 0): number {
    // Caso base: chegou ao final da matriz
    if (indice >= matriz.length) {
        return 0;
    }
    
    // Conta 1 se o elemento atual é igual ao valor, senão 0
    const contaAtual = matriz[indice] === valor ? 1 : 0;
    
    // Soma com as ocorrências do resto da matriz
    return contaAtual + numeroOcorrencias(matriz, valor, indice + 1);
}

// Solução 2: Recursão com contador acumulador
function numeroOcorrenciasAcumulador(matriz: number[], valor: number, indice: number = 0, contador: number = 0): number {
    // Caso base: chegou ao final da matriz
    if (indice >= matriz.length) {
        return contador;
    }
    
    // Incrementa contador se encontrou o valor
    const novoContador = matriz[indice] === valor ? contador + 1 : contador;
    
    // Chamada recursiva
    return numeroOcorrenciasAcumulador(matriz, valor, indice + 1, novoContador);
}

// Testes
console.log("=== Exercício 15: NÚMERO DE OCORRÊNCIAS ===");

// Matriz de teste (20 elementos conforme especificação)
const matrizEx15 = [15, 3, 8, 12, 8, 7, 21, 8, 5, 18, 8, 14, 9, 8, 11, 6, 8, 19, 2, 8];
console.log("Matriz de teste (20 elementos):", matrizEx15);

const valorParaContarEx15 = 8;
console.log(`\nOcorrências de ${valorParaContarEx15} (recursão simples):`, numeroOcorrencias(matrizEx15, valorParaContarEx15));
console.log(`Ocorrências de ${valorParaContarEx15} (com acumulador):`, numeroOcorrenciasAcumulador(matrizEx15, valorParaContarEx15));

// Testa outros valores
const outrosValores = [15, 21, 50, 3];
outrosValores.forEach(valor => {
    console.log(`Ocorrências de ${valor}:`, numeroOcorrencias(matrizEx15, valor));
});

// Teste com matriz vazia
const matrizVaziaEx15: number[] = [];
console.log(`\nOcorrências de 5 em matriz vazia:`, numeroOcorrencias(matrizVaziaEx15, 5));
