// Use a mesma classe para os exercícios 13, 14, 15 e 16
class OperacoesMatriz {
    
    // Exercício 13: MAIOR ELEMENTO - Considere a mesma matriz unidimensional, não ordenada. 
    // Retorne recursivamente o maior elemento.
    
    // Solução 1: Recursão simples
    static maiorElemento(matriz: number[], indice: number = 0, maiorAtual: number = Number.NEGATIVE_INFINITY): number {
        // Caso base: chegou ao final da matriz
        if (indice >= matriz.length) {
            return maiorAtual;
        }
        
        // Atualiza o maior se necessário
        const novoMaior = Math.max(maiorAtual, matriz[indice]);
        
        // Chamada recursiva
        return this.maiorElemento(matriz, indice + 1, novoMaior);
    }
    
    // Solução 2: Recursão com divisão e conquista
    static maiorElementoDivisao(matriz: number[], inicio: number = 0, fim: number = matriz.length - 1): number {
        // Caso base: matriz vazia
        if (inicio > fim) {
            return Number.NEGATIVE_INFINITY;
        }
        
        // Caso base: um elemento
        if (inicio === fim) {
            return matriz[inicio];
        }
        
        // Divide a matriz
        const meio = Math.floor((inicio + fim) / 2);
        
        // Encontra o maior em cada metade
        const maiorEsquerda = this.maiorElementoDivisao(matriz, inicio, meio);
        const maiorDireita = this.maiorElementoDivisao(matriz, meio + 1, fim);
        
        // Retorna o maior entre as duas metades
        return Math.max(maiorEsquerda, maiorDireita);
    }
    
    // Exercício 14: SOMA DOS ELEMENTOS - Considere a mesma matriz unidimensional, não ordenada. 
    // Retorne recursivamente soma dos elementos.
    
    // Solução 1: Recursão simples
    static somaElementos(matriz: number[], indice: number = 0): number {
        // Caso base: chegou ao final da matriz
        if (indice >= matriz.length) {
            return 0;
        }
        
        // Soma o elemento atual com a soma do resto
        return matriz[indice] + this.somaElementos(matriz, indice + 1);
    }
    
    // Solução 2: Recursão com acumulador
    static somaElementosAcumulador(matriz: number[], indice: number = 0, acumulador: number = 0): number {
        // Caso base: chegou ao final da matriz
        if (indice >= matriz.length) {
            return acumulador;
        }
        
        // Chamada recursiva acumulando o valor
        return this.somaElementosAcumulador(matriz, indice + 1, acumulador + matriz[indice]);
    }
    
    // Exercício 15: NÚMERO DE OCORRÊNCIAS - Considere a mesma matriz unidimensional, não ordenada. 
    // Dado um inteiro, retorne recursivamente quantas ocorrências deste há na matriz.
    
    // Solução 1: Recursão simples
    static numeroOcorrencias(matriz: number[], valor: number, indice: number = 0): number {
        // Caso base: chegou ao final da matriz
        if (indice >= matriz.length) {
            return 0;
        }
        
        // Conta 1 se o elemento atual é igual ao valor, senão 0
        const contaAtual = matriz[indice] === valor ? 1 : 0;
        
        // Soma com as ocorrências do resto da matriz
        return contaAtual + this.numeroOcorrencias(matriz, valor, indice + 1);
    }
    
    // Solução 2: Recursão com contador acumulador
    static numeroOcorrenciasAcumulador(matriz: number[], valor: number, indice: number = 0, contador: number = 0): number {
        // Caso base: chegou ao final da matriz
        if (indice >= matriz.length) {
            return contador;
        }
        
        // Incrementa contador se encontrou o valor
        const novoContador = matriz[indice] === valor ? contador + 1 : contador;
        
        // Chamada recursiva
        return this.numeroOcorrenciasAcumulador(matriz, valor, indice + 1, novoContador);
    }
    
    // Exercício 16: ESTÁ ORDENADO - Considere a mesma matriz unidimensional, não ordenada. 
    // Retorne se a matriz unidimensional está em ordem crescente. Verifique recursivamente.
    
    // Solução 1: Recursão simples
    static estaOrdenado(matriz: number[], indice: number = 0): boolean {
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
        return this.estaOrdenado(matriz, indice + 1);
    }
    
    // Solução 2: Recursão que permite crescente ou decrescente
    static estaOrdenadoFlexivel(matriz: number[], crescente: boolean = true, indice: number = 0): boolean {
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
        
        return this.estaOrdenadoFlexivel(matriz, crescente, indice + 1);
    }
}

// Testes
console.log("=== Exercícios 13-16: OPERAÇÕES COM MATRIZ ===");

// Matriz de teste (20 elementos conforme especificação)
const matriz = [15, 3, 8, 12, 8, 7, 21, 8, 5, 18, 8, 14, 9, 8, 11, 6, 8, 19, 2, 8];
console.log("Matriz de teste (20 elementos):", matriz);

console.log("\n--- Exercício 13: MAIOR ELEMENTO ---");
console.log("Maior elemento:", OperacoesMatriz.maiorElemento(matriz));
console.log("Maior elemento (divisão):", OperacoesMatriz.maiorElementoDivisao(matriz));

console.log("\n--- Exercício 14: SOMA DOS ELEMENTOS ---");
console.log("Soma dos elementos:", OperacoesMatriz.somaElementos(matriz));
console.log("Soma (com acumulador):", OperacoesMatriz.somaElementosAcumulador(matriz));

console.log("\n--- Exercício 15: NÚMERO DE OCORRÊNCIAS ---");
const valorParaContar = 8;
console.log(`Ocorrências de ${valorParaContar}:`, OperacoesMatriz.numeroOcorrencias(matriz, valorParaContar));
console.log(`Ocorrências de ${valorParaContar} (acumulador):`, OperacoesMatriz.numeroOcorrenciasAcumulador(matriz, valorParaContar));

console.log("\n--- Exercício 16: ESTÁ ORDENADO ---");
console.log("Matriz está ordenada (crescente)?", OperacoesMatriz.estaOrdenado(matriz));

// Teste com matriz ordenada
const matrizCrescente = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
console.log("\nMatriz ordenada crescente:", matrizCrescente);
console.log("Está ordenada?", OperacoesMatriz.estaOrdenado(matrizCrescente));

// Testa com matriz decrescente
const matrizDecrescente = [20, 18, 16, 14, 12, 10, 8, 6, 4, 2];
console.log("\nMatriz decrescente:", matrizDecrescente);
console.log("Está ordenada crescente?", OperacoesMatriz.estaOrdenado(matrizDecrescente));
console.log("Está ordenada decrescente?", OperacoesMatriz.estaOrdenadoFlexivel(matrizDecrescente, false));

console.log("\n--- Casos especiais ---");
const matrizVazia: number[] = [];
const matrizUmElemento = [42];
const matrizDoisElementos = [5, 10];

console.log("Matriz vazia:");
console.log("  Maior elemento:", OperacoesMatriz.maiorElemento(matrizVazia));
console.log("  Soma:", OperacoesMatriz.somaElementos(matrizVazia));
console.log("  Está ordenada:", OperacoesMatriz.estaOrdenado(matrizVazia));

console.log("\nMatriz com um elemento [42]:");
console.log("  Maior elemento:", OperacoesMatriz.maiorElemento(matrizUmElemento));
console.log("  Soma:", OperacoesMatriz.somaElementos(matrizUmElemento));
console.log("  Está ordenada:", OperacoesMatriz.estaOrdenado(matrizUmElemento));

console.log("\nMatriz com dois elementos [5, 10]:");
console.log("  Maior elemento:", OperacoesMatriz.maiorElemento(matrizDoisElementos));
console.log("  Soma:", OperacoesMatriz.somaElementos(matrizDoisElementos));
console.log("  Está ordenada:", OperacoesMatriz.estaOrdenado(matrizDoisElementos));

console.log("\n--- Resumo da matriz original ---");
console.log(`Matriz: [${matriz.join(', ')}]`);
console.log(`Tamanho: ${matriz.length}`);
console.log(`Maior elemento: ${OperacoesMatriz.maiorElemento(matriz)}`);
console.log(`Soma total: ${OperacoesMatriz.somaElementos(matriz)}`);
console.log(`Média: ${(OperacoesMatriz.somaElementos(matriz) / matriz.length).toFixed(2)}`);
console.log(`Está ordenada: ${OperacoesMatriz.estaOrdenado(matriz) ? 'Sim' : 'Não'}`);
console.log(`Ocorrências do valor 8: ${OperacoesMatriz.numeroOcorrencias(matriz, 8)}`);
