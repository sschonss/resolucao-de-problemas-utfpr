// Use a mesma classe para os exercícios 7, 8, 9 e 10
class SequenciasRecursivas {
    
    // Exercício 7: POTÊNCIA - Dados a base e um expoente positivo, retorne base^expoente
    // Assuma o valor de n como base
    
    // Solução 1: Recursão simples
    static potencia(base: number, expoente: number): number {
        // Caso base: qualquer número elevado a 0 é 1
        if (expoente === 0) {
            return 1;
        }
        
        // Chamada recursiva
        return base * this.potencia(base, expoente - 1);
    }
    
    // Solução 2: Potência rápida (exponenciação binária)
    static potenciaRapida(base: number, expoente: number): number {
        if (expoente === 0) {
            return 1;
        }
        
        if (expoente === 1) {
            return base;
        }
        
        // Se expoente é par: base^n = (base^(n/2))^2
        if (expoente % 2 === 0) {
            const metade = this.potenciaRapida(base, Math.floor(expoente / 2));
            return metade * metade;
        }
        
        // Se expoente é ímpar: base^n = base * base^(n-1)
        return base * this.potenciaRapida(base, expoente - 1);
    }
    
    // Exercício 8: FIBONACCI - Dado um inteiro positivo n, retorne o n-ésimo termo da série de Fibonacci
    // Os dois primeiros termos são 1 e 1: 1, 1, 2, 3, 5, 8, 13, 21...
    
    // Solução 1: Recursão simples
    static fibonacci(n: number): number {
        // Casos base: os dois primeiros termos são 1
        if (n <= 2) {
            return 1;
        }
        
        // Chamada recursiva: soma dos dois anteriores
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }
    
    // Solução 2: Fibonacci com memoização
    private static fiboMemo: { [key: number]: number } = { 1: 1, 2: 1 };
    
    static fibonacciMemoizado(n: number): number {
        if (n in this.fiboMemo) {
            return this.fiboMemo[n];
        }
        
        if (n <= 2) {
            this.fiboMemo[n] = 1;
            return 1;
        }
        
        const resultado = this.fibonacciMemoizado(n - 1) + this.fibonacciMemoizado(n - 2);
        this.fiboMemo[n] = resultado;
        return resultado;
    }
    
    // Exercício 9: TRIBONACCI - Dado um inteiro positivo n, imprima o n-ésimo termo da série de Tribonacci
    // Os três primeiros termos são 1, 1 e 2: 1, 1, 2, 4, 7, 13, 24, 44...
    
    // Solução 1: Recursão simples
    static tribonacci(n: number): number {
        // Casos base: os três primeiros termos
        if (n === 1) return 1;
        if (n === 2) return 1;
        if (n === 3) return 2;
        
        // Chamada recursiva: soma dos três anteriores
        return this.tribonacci(n - 1) + this.tribonacci(n - 2) + this.tribonacci(n - 3);
    }
    
    // Solução 2: Tribonacci com memoização
    private static triboMemo: { [key: number]: number } = { 1: 1, 2: 1, 3: 2 };
    
    static tribonacciMemoizado(n: number): number {
        if (n in this.triboMemo) {
            return this.triboMemo[n];
        }
        
        if (n === 1) return 1;
        if (n === 2) return 1;
        if (n === 3) return 2;
        
        const resultado = this.tribonacciMemoizado(n - 1) + 
                         this.tribonacciMemoizado(n - 2) + 
                         this.tribonacciMemoizado(n - 3);
        this.triboMemo[n] = resultado;
        return resultado;
    }
    
    // Exercício 10: TETRANACCI - Dado um inteiro positivo n, imprima o n-ésimo termo da série de Tetranacci
    // Os quatro primeiros termos são 1, 1, 2 e 4: 1, 1, 2, 4, 8, 15, 29, 56...
    
    // Solução 1: Recursão simples
    static tetranacci(n: number): number {
        // Casos base: os quatro primeiros termos
        if (n === 1) return 1;
        if (n === 2) return 1;
        if (n === 3) return 2;
        if (n === 4) return 4;
        
        // Chamada recursiva: soma dos quatro anteriores
        return this.tetranacci(n - 1) + this.tetranacci(n - 2) + 
               this.tetranacci(n - 3) + this.tetranacci(n - 4);
    }
    
    // Solução 2: Tetranacci com memoização
    private static tetraMemo: { [key: number]: number } = { 1: 1, 2: 1, 3: 2, 4: 4 };
    
    static tetranacciMemoizado(n: number): number {
        if (n in this.tetraMemo) {
            return this.tetraMemo[n];
        }
        
        if (n === 1) return 1;
        if (n === 2) return 1;
        if (n === 3) return 2;
        if (n === 4) return 4;
        
        const resultado = this.tetranacciMemoizado(n - 1) + 
                         this.tetranacciMemoizado(n - 2) + 
                         this.tetranacciMemoizado(n - 3) + 
                         this.tetranacciMemoizado(n - 4);
        this.tetraMemo[n] = resultado;
        return resultado;
    }
}

// Testes
console.log("=== Exercícios 7-10: POTÊNCIA e SEQUÊNCIAS ===");

console.log("\n--- Exercício 7: POTÊNCIA ---");
console.log("2^5 =", SequenciasRecursivas.potencia(2, 5));
console.log("3^4 =", SequenciasRecursivas.potencia(3, 4));
console.log("5^0 =", SequenciasRecursivas.potencia(5, 0));
console.log("2^10 (rápida) =", SequenciasRecursivas.potenciaRapida(2, 10));

console.log("\n--- Exercício 8: FIBONACCI ---");
console.log("Primeiros 10 termos de Fibonacci:");
for (let i = 1; i <= 10; i++) {
    console.log(`F(${i}) = ${SequenciasRecursivas.fibonacciMemoizado(i)}`);
}

console.log("\n--- Exercício 9: TRIBONACCI ---");
console.log("Primeiros 8 termos de Tribonacci:");
for (let i = 1; i <= 8; i++) {
    console.log(`T(${i}) = ${SequenciasRecursivas.tribonacciMemoizado(i)}`);
}

console.log("\n--- Exercício 10: TETRANACCI ---");
console.log("Primeiros 8 termos de Tetranacci:");
for (let i = 1; i <= 8; i++) {
    console.log(`Tetra(${i}) = ${SequenciasRecursivas.tetranacciMemoizado(i)}`);
}
