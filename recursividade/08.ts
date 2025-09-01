// Exercício 8: FIBONACCI - Dado um inteiro positivo n, retorne o n-ésimo termo da série de Fibonacci
// Os dois primeiros termos são 1 e 1: 1, 1, 2, 3, 5, 8, 13, 21...

// Solução 1: Recursão simples
function fibonacci(n: number): number {
    // Casos base: os dois primeiros termos são 1
    if (n <= 2) {
        return 1;
    }
    
    // Chamada recursiva: soma dos dois anteriores
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Solução 2: Fibonacci com memoização
const fiboMemo: { [key: number]: number } = { 1: 1, 2: 1 };

function fibonacciMemoizado(n: number): number {
    if (n in fiboMemo) {
        return fiboMemo[n];
    }
    
    if (n <= 2) {
        fiboMemo[n] = 1;
        return 1;
    }
    
    const resultado = fibonacciMemoizado(n - 1) + fibonacciMemoizado(n - 2);
    fiboMemo[n] = resultado;
    return resultado;
}

// Testes
console.log("=== Exercício 8: FIBONACCI ===");
console.log("Primeiros 10 termos de Fibonacci:");
for (let i = 1; i <= 10; i++) {
    console.log(`F(${i}) = ${fibonacciMemoizado(i)}`);
}

console.log("\nTeste com recursão simples (números menores):");
console.log("F(8) =", fibonacci(8));
console.log("F(10) =", fibonacci(10));
