/**
 * EXERCÍCIO EXTRA 4: PROBLEMAS COMBINATÓRIOS
 * Permutações, combinações e outros problemas combinatórios
 */

class Combinatorics {
    
    /**
     * Gera todas as permutações de um array
     */
    static permutacoes<T>(arr: T[]): T[][] {
        // Caso base
        if (arr.length <= 1) {
            return [arr];
        }
        
        const resultado: T[][] = [];
        
        for (let i = 0; i < arr.length; i++) {
            const elemento = arr[i];
            const resto = arr.slice(0, i).concat(arr.slice(i + 1));
            const permutacoesResto = this.permutacoes(resto);
            
            for (const permutacao of permutacoesResto) {
                resultado.push([elemento, ...permutacao]);
            }
        }
        
        return resultado;
    }
    
    /**
     * Gera todas as combinações de r elementos de um array
     */
    static combinacoes<T>(arr: T[], r: number): T[][] {
        // Casos base
        if (r === 0) return [[]];
        if (r > arr.length) return [];
        if (r === arr.length) return [arr];
        
        const [primeiro, ...resto] = arr;
        
        // Combinações que incluem o primeiro elemento
        const comPrimeiro = this.combinacoes(resto, r - 1).map(comb => [primeiro, ...comb]);
        
        // Combinações que não incluem o primeiro elemento
        const semPrimeiro = this.combinacoes(resto, r);
        
        return [...comPrimeiro, ...semPrimeiro];
    }
    
    /**
     * Gera o conjunto das partes (power set)
     */
    static conjuntoDasPartes<T>(arr: T[]): T[][] {
        // Caso base
        if (arr.length === 0) {
            return [[]];
        }
        
        const [primeiro, ...resto] = arr;
        const subconjuntosResto = this.conjuntoDasPartes(resto);
        
        // Subconjuntos que incluem o primeiro elemento
        const comPrimeiro = subconjuntosResto.map(subset => [primeiro, ...subset]);
        
        return [...subconjuntosResto, ...comPrimeiro];
    }
    
    /**
     * Resolve o problema das N-rainhas
     */
    static nRainhas(n: number): number[][] {
        const solucoes: number[][] = [];
        const tabuleiro: number[] = [];
        
        this.resolverNRainhas(tabuleiro, 0, n, solucoes);
        return solucoes;
    }
    
    private static resolverNRainhas(tabuleiro: number[], linha: number, n: number, solucoes: number[][]): void {
        // Caso base: todas as rainhas foram colocadas
        if (linha === n) {
            solucoes.push([...tabuleiro]);
            return;
        }
        
        // Tenta colocar rainha em cada coluna da linha atual
        for (let coluna = 0; coluna < n; coluna++) {
            if (this.posicaoSegura(tabuleiro, linha, coluna)) {
                tabuleiro[linha] = coluna;
                this.resolverNRainhas(tabuleiro, linha + 1, n, solucoes);
                // Backtrack implícito (não precisa remover porque sobrescreve)
            }
        }
    }
    
    private static posicaoSegura(tabuleiro: number[], linha: number, coluna: number): boolean {
        for (let i = 0; i < linha; i++) {
            const colunaRainha = tabuleiro[i];
            
            // Verifica coluna e diagonais
            if (colunaRainha === coluna || 
                Math.abs(colunaRainha - coluna) === Math.abs(i - linha)) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Gera partições de um número
     */
    static particoes(n: number, max: number = n): number[][] {
        // Casos base
        if (n === 0) return [[]];
        if (n < 0 || max === 0) return [];
        
        const resultado: number[][] = [];
        
        // Partições que incluem o número max
        const comMax = this.particoes(n - max, max);
        for (const particao of comMax) {
            resultado.push([max, ...particao]);
        }
        
        // Partições que não incluem o número max
        const semMax = this.particoes(n, max - 1);
        resultado.push(...semMax);
        
        return resultado;
    }
    
    /**
     * Calcula coeficiente binomial usando recursão
     */
    static coeficienteBinomial(n: number, k: number): number {
        // Casos base
        if (k === 0 || k === n) return 1;
        if (k > n) return 0;
        
        // Triângulo de Pascal: C(n,k) = C(n-1,k-1) + C(n-1,k)
        return this.coeficienteBinomial(n - 1, k - 1) + this.coeficienteBinomial(n - 1, k);
    }
    
    /**
     * Versão otimizada com memoização
     */
    static coeficienteBinomialMemo(n: number, k: number, memo: Map<string, number> = new Map()): number {
        const key = `${n},${k}`;
        
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        
        let resultado: number;
        
        if (k === 0 || k === n) {
            resultado = 1;
        } else if (k > n) {
            resultado = 0;
        } else {
            resultado = this.coeficienteBinomialMemo(n - 1, k - 1, memo) + 
                       this.coeficienteBinomialMemo(n - 1, k, memo);
        }
        
        memo.set(key, resultado);
        return resultado;
    }
}

// Testes
console.log("=== EXERCÍCIO EXTRA 4: PROBLEMAS COMBINATÓRIOS ===\n");

console.log("1. Permutações de [1, 2, 3]:");
const perms = Combinatorics.permutacoes([1, 2, 3]);
console.log(perms);
console.log(`Total: ${perms.length} permutações\n`);

console.log("2. Combinações de 2 elementos de [1, 2, 3, 4]:");
const combs = Combinatorics.combinacoes([1, 2, 3, 4], 2);
console.log(combs);
console.log(`Total: ${combs.length} combinações\n`);

console.log("3. Conjunto das partes de [1, 2, 3]:");
const powerSet = Combinatorics.conjuntoDasPartes([1, 2, 3]);
console.log(powerSet);
console.log(`Total: ${powerSet.length} subconjuntos\n`);

console.log("4. Problema das 4-rainhas (primeiras 3 soluções):");
const rainhas = Combinatorics.nRainhas(4);
rainhas.slice(0, 3).forEach((solucao, i) => {
    console.log(`Solução ${i + 1}: ${solucao}`);
});
console.log(`Total: ${rainhas.length} soluções\n`);

console.log("5. Partições do número 4:");
const particoes = Combinatorics.particoes(4);
console.log(particoes);
console.log(`Total: ${particoes.length} partições\n`);

console.log("6. Coeficientes binomiais:");
console.log(`C(5,2) = ${Combinatorics.coeficienteBinomial(5, 2)}`);
console.log(`C(10,3) = ${Combinatorics.coeficienteBinomialMemo(10, 3)}`);

// Teste de performance
console.log("\n7. Teste de performance - C(20,10):");
const inicio1 = Date.now();
const resultado1 = Combinatorics.coeficienteBinomialMemo(20, 10);
const tempo1 = Date.now() - inicio1;
console.log(`Com memoização: ${resultado1} (${tempo1}ms)`);
