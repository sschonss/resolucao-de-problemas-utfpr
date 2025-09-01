// Exercício 2: Calcular a sequência de Fibonacci

// Solução 1: Recursão simples (ineficiente para números grandes)
function fibonacciRecursivo(n: number): number {
    // Casos base
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    // Chamadas recursivas
    return fibonacciRecursivo(n - 1) + fibonacciRecursivo(n - 2);
}

// Solução 2: Recursão com memoização (eficiente)
const memoFibonacci: { [key: number]: number } = {};

function fibonacciMemoizado(n: number): number {
    // Verifica se já foi calculado
    if (n in memoFibonacci) {
        return memoFibonacci[n];
    }
    
    // Casos base
    if (n <= 0) {
        memoFibonacci[n] = 0;
        return 0;
    }
    if (n === 1) {
        memoFibonacci[n] = 1;
        return 1;
    }
    
    // Calcula e armazena o resultado
    const resultado = fibonacciMemoizado(n - 1) + fibonacciMemoizado(n - 2);
    memoFibonacci[n] = resultado;
    return resultado;
}

// Solução 3: Recursão com acumuladores (tail recursion)
function fibonacciTailRecursion(n: number, a: number = 0, b: number = 1): number {
    if (n === 0) return a;
    if (n === 1) return b;
    
    return fibonacciTailRecursion(n - 1, b, a + b);
}

// Testes
console.log("=== Exercício 2: Fibonacci ===");
console.log("Fibonacci(10) recursivo:", fibonacciRecursivo(10));
console.log("Fibonacci(10) memoizado:", fibonacciMemoizado(10));
console.log("Fibonacci(10) tail recursion:", fibonacciTailRecursion(10));
console.log("Fibonacci(0):", fibonacciRecursivo(0));
console.log("Fibonacci(1):", fibonacciRecursivo(1));

// Teste de performance (apenas para números pequenos com recursão simples)
console.log("\n=== Teste de sequência ===");
for (let i = 0; i <= 10; i++) {
    console.log(`F(${i}) = ${fibonacciMemoizado(i)}`);
}
