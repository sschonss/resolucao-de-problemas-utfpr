/**
 * EXERCÍCIO EXTRA 8: PROGRAMAÇÃO DINÂMICA COM RECURSÃO
 * Otimização de problemas recursivos usando memoização
 */

class ProgramacaoDinamica {
    
    /**
     * PROBLEMA DA MOCHILA 0/1
     * Encontra o valor máximo que pode ser carregado na mochila
     */
    static mochila01(valores: number[], pesos: number[], capacidade: number): { valor: number, itens: number[] } {
        const n = valores.length;
        const memo = new Map<string, number>();
        const itensEscolhidos: boolean[] = Array(n).fill(false);
        
        const valorMaximo = this.mochilaUtil(valores, pesos, n - 1, capacidade, memo);
        
        // Reconstrói a solução
        this.reconstruirSolucaoMochila(valores, pesos, n - 1, capacidade, memo, itensEscolhidos);
        
        const itens = itensEscolhidos.map((escolhido, i) => escolhido ? i : -1).filter(i => i !== -1);
        
        return { valor: valorMaximo, itens };
    }
    
    private static mochilaUtil(valores: number[], pesos: number[], i: number, capacidade: number, memo: Map<string, number>): number {
        const key = `${i},${capacidade}`;
        
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        
        // Caso base
        if (i < 0 || capacidade === 0) {
            memo.set(key, 0);
            return 0;
        }
        
        // Se o peso do item é maior que a capacidade, não pode incluir
        if (pesos[i] > capacidade) {
            const resultado = this.mochilaUtil(valores, pesos, i - 1, capacidade, memo);
            memo.set(key, resultado);
            return resultado;
        }
        
        // Máximo entre incluir ou não incluir o item atual
        const incluir = valores[i] + this.mochilaUtil(valores, pesos, i - 1, capacidade - pesos[i], memo);
        const naoIncluir = this.mochilaUtil(valores, pesos, i - 1, capacidade, memo);
        
        const resultado = Math.max(incluir, naoIncluir);
        memo.set(key, resultado);
        
        return resultado;
    }
    
    private static reconstruirSolucaoMochila(valores: number[], pesos: number[], i: number, capacidade: number, 
                                           memo: Map<string, number>, itensEscolhidos: boolean[]): void {
        if (i < 0 || capacidade === 0) {
            return;
        }
        
        const key = `${i},${capacidade}`;
        const valorAtual = memo.get(key) || 0;
        
        if (pesos[i] <= capacidade) {
            const keyIncluir = `${i-1},${capacidade - pesos[i]}`;
            const valorIncluir = valores[i] + (memo.get(keyIncluir) || 0);
            
            if (valorIncluir === valorAtual) {
                itensEscolhidos[i] = true;
                this.reconstruirSolucaoMochila(valores, pesos, i - 1, capacidade - pesos[i], memo, itensEscolhidos);
                return;
            }
        }
        
        this.reconstruirSolucaoMochila(valores, pesos, i - 1, capacidade, memo, itensEscolhidos);
    }
    
    /**
     * PROBLEMA DE CORTE DE HASTES
     * Encontra o máximo lucro cortando uma haste
     */
    static corteHastes(precos: number[], tamanho: number): { lucro: number, cortes: number[] } {
        const memo = new Map<number, number>();
        const cortes: number[] = [];
        
        const lucroMaximo = this.corteHastesUtil(precos, tamanho, memo);
        this.reconstruirCortes(precos, tamanho, memo, cortes);
        
        return { lucro: lucroMaximo, cortes };
    }
    
    private static corteHastesUtil(precos: number[], tamanho: number, memo: Map<number, number>): number {
        if (memo.has(tamanho)) {
            return memo.get(tamanho)!;
        }
        
        if (tamanho === 0) {
            memo.set(tamanho, 0);
            return 0;
        }
        
        let maxLucro = 0;
        
        for (let i = 1; i <= tamanho && i <= precos.length; i++) {
            const lucro = precos[i - 1] + this.corteHastesUtil(precos, tamanho - i, memo);
            maxLucro = Math.max(maxLucro, lucro);
        }
        
        memo.set(tamanho, maxLucro);
        return maxLucro;
    }
    
    private static reconstruirCortes(precos: number[], tamanho: number, memo: Map<number, number>, cortes: number[]): void {
        if (tamanho === 0) return;
        
        const lucroAtual = memo.get(tamanho) || 0;
        
        for (let i = 1; i <= tamanho && i <= precos.length; i++) {
            const lucroComCorte = precos[i - 1] + (memo.get(tamanho - i) || 0);
            
            if (lucroComCorte === lucroAtual) {
                cortes.push(i);
                this.reconstruirCortes(precos, tamanho - i, memo, cortes);
                return;
            }
        }
    }
    
    /**
     * SUBSEQUÊNCIA COMUM MAIS LONGA (LCS)
     */
    static lcs(str1: string, str2: string): { tamanho: number, subsequencia: string } {
        const memo = new Map<string, number>();
        const tamanho = this.lcsUtil(str1, str2, str1.length, str2.length, memo);
        const subsequencia = this.reconstruirLCS(str1, str2, str1.length, str2.length, memo);
        
        return { tamanho, subsequencia };
    }
    
    private static lcsUtil(str1: string, str2: string, m: number, n: number, memo: Map<string, number>): number {
        const key = `${m},${n}`;
        
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        
        if (m === 0 || n === 0) {
            memo.set(key, 0);
            return 0;
        }
        
        let resultado: number;
        
        if (str1[m - 1] === str2[n - 1]) {
            resultado = 1 + this.lcsUtil(str1, str2, m - 1, n - 1, memo);
        } else {
            const opcao1 = this.lcsUtil(str1, str2, m - 1, n, memo);
            const opcao2 = this.lcsUtil(str1, str2, m, n - 1, memo);
            resultado = Math.max(opcao1, opcao2);
        }
        
        memo.set(key, resultado);
        return resultado;
    }
    
    private static reconstruirLCS(str1: string, str2: string, m: number, n: number, memo: Map<string, number>): string {
        if (m === 0 || n === 0) {
            return "";
        }
        
        if (str1[m - 1] === str2[n - 1]) {
            return this.reconstruirLCS(str1, str2, m - 1, n - 1, memo) + str1[m - 1];
        }
        
        const key1 = `${m - 1},${n}`;
        const key2 = `${m},${n - 1}`;
        const valor1 = memo.get(key1) || 0;
        const valor2 = memo.get(key2) || 0;
        
        if (valor1 > valor2) {
            return this.reconstruirLCS(str1, str2, m - 1, n, memo);
        } else {
            return this.reconstruirLCS(str1, str2, m, n - 1, memo);
        }
    }
    
    /**
     * PROBLEMA DO TROCO (COIN CHANGE)
     */
    static problemaDoTroco(moedas: number[], valor: number): { numeroMoedas: number, moedasUsadas: number[] } {
        const memo = new Map<number, number>();
        const numeroMoedas = this.trocoUtil(moedas, valor, memo);
        
        if (numeroMoedas === Infinity) {
            return { numeroMoedas: -1, moedasUsadas: [] };
        }
        
        const moedasUsadas = this.reconstruirTroco(moedas, valor, memo);
        return { numeroMoedas, moedasUsadas };
    }
    
    private static trocoUtil(moedas: number[], valor: number, memo: Map<number, number>): number {
        if (memo.has(valor)) {
            return memo.get(valor)!;
        }
        
        if (valor === 0) {
            memo.set(valor, 0);
            return 0;
        }
        
        if (valor < 0) {
            return Infinity;
        }
        
        let minMoedas = Infinity;
        
        for (const moeda of moedas) {
            const resultado = this.trocoUtil(moedas, valor - moeda, memo);
            if (resultado !== Infinity) {
                minMoedas = Math.min(minMoedas, 1 + resultado);
            }
        }
        
        memo.set(valor, minMoedas);
        return minMoedas;
    }
    
    private static reconstruirTroco(moedas: number[], valor: number, memo: Map<number, number>): number[] {
        if (valor === 0) return [];
        
        const numeroAtual = memo.get(valor) || Infinity;
        
        for (const moeda of moedas) {
            if (valor >= moeda) {
                const numeroRestante = memo.get(valor - moeda) || Infinity;
                if (numeroRestante + 1 === numeroAtual) {
                    return [moeda, ...this.reconstruirTroco(moedas, valor - moeda, memo)];
                }
            }
        }
        
        return [];
    }
    
    /**
     * FIBONACCI com memoização (clássico da programação dinâmica)
     */
    static fibonacciDP(n: number, memo: Map<number, number> = new Map()): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }
        
        if (n <= 2) {
            memo.set(n, 1);
            return 1;
        }
        
        const resultado = this.fibonacciDP(n - 1, memo) + this.fibonacciDP(n - 2, memo);
        memo.set(n, resultado);
        
        return resultado;
    }
    
    /**
     * Teste de performance comparando recursão simples vs memoização
     */
    static compararPerformance(n: number): void {
        console.log(`\nComparação de performance para Fibonacci(${n}):\n`);
        
        // Fibonacci com memoização
        const inicioMemo = Date.now();
        const resultadoMemo = this.fibonacciDP(n);
        const tempoMemo = Date.now() - inicioMemo;
        
        console.log(`Com memoização: ${resultadoMemo} (${tempoMemo}ms)`);
        
        // Só testa recursão simples para valores pequenos
        if (n <= 35) {
            const inicioSimples = Date.now();
            const resultadoSimples = this.fibonacciSimples(n);
            const tempoSimples = Date.now() - inicioSimples;
            
            console.log(`Recursão simples: ${resultadoSimples} (${tempoSimples}ms)`);
            console.log(`Speedup: ${(tempoSimples / tempoMemo).toFixed(2)}x`);
        } else {
            console.log("Recursão simples: Muito lenta para n > 35");
        }
    }
    
    private static fibonacciSimples(n: number): number {
        if (n <= 2) return 1;
        return this.fibonacciSimples(n - 1) + this.fibonacciSimples(n - 2);
    }
}

// Testes
console.log("=== EXERCÍCIO EXTRA 8: PROGRAMAÇÃO DINÂMICA ===\n");

console.log("1. PROBLEMA DA MOCHILA 0/1:");
const valores = [60, 100, 120];
const pesos = [10, 20, 30];
const capacidade = 50;

console.log("Itens disponíveis:");
valores.forEach((valor, i) => {
    console.log(`Item ${i}: Valor=${valor}, Peso=${pesos[i]}`);
});
console.log(`Capacidade da mochila: ${capacidade}`);

const resultadoMochila = ProgramacaoDinamica.mochila01(valores, pesos, capacidade);
console.log(`\nMelhor solução: Valor=${resultadoMochila.valor}`);
console.log(`Itens escolhidos: ${resultadoMochila.itens.join(', ')}`);

console.log("\n" + "=".repeat(50));
console.log("2. PROBLEMA DE CORTE DE HASTES:");
const precos = [1, 5, 8, 9, 10, 17, 17, 20];
const tamanhoHaste = 8;

console.log("Preços por tamanho:", precos);
console.log(`Tamanho da haste: ${tamanhoHaste}`);

const resultadoCorte = ProgramacaoDinamica.corteHastes(precos, tamanhoHaste);
console.log(`\nLucro máximo: ${resultadoCorte.lucro}`);
console.log(`Cortes: ${resultadoCorte.cortes.join(', ')}`);

console.log("\n" + "=".repeat(50));
console.log("3. SUBSEQUÊNCIA COMUM MAIS LONGA:");
const str1 = "AGGTAB";
const str2 = "GXTXAYB";

console.log(`String 1: ${str1}`);
console.log(`String 2: ${str2}`);

const resultadoLCS = ProgramacaoDinamica.lcs(str1, str2);
console.log(`\nTamanho da LCS: ${resultadoLCS.tamanho}`);
console.log(`Subsequência: "${resultadoLCS.subsequencia}"`);

console.log("\n" + "=".repeat(50));
console.log("4. PROBLEMA DO TROCO:");
const moedas = [1, 4, 5];
const valorTroco = 8;

console.log(`Moedas disponíveis: [${moedas.join(', ')}]`);
console.log(`Valor do troco: ${valorTroco}`);

const resultadoTroco = ProgramacaoDinamica.problemaDoTroco(moedas, valorTroco);
console.log(`\nNúmero mínimo de moedas: ${resultadoTroco.numeroMoedas}`);
console.log(`Moedas usadas: [${resultadoTroco.moedasUsadas.join(', ')}]`);

console.log("\n" + "=".repeat(50));
console.log("5. FIBONACCI COM MEMOIZAÇÃO:");
console.log(`Fibonacci(10) = ${ProgramacaoDinamica.fibonacciDP(10)}`);
console.log(`Fibonacci(50) = ${ProgramacaoDinamica.fibonacciDP(50)}`);

ProgramacaoDinamica.compararPerformance(30);
