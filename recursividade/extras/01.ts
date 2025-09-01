// Exercício 1: Calcular o fatorial de um número

// Solução 1: Recursão simples
function fatorialRecursivo(n: number): number {
    // Caso base
    if (n <= 1) {
        return 1;
    }
    // Chamada recursiva
    return n * fatorialRecursivo(n - 1);
}

// Solução 2: Recursão com acumulador (tail recursion)
function fatorialTailRecursion(n: number, acumulador: number = 1): number {
    // Caso base
    if (n <= 1) {
        return acumulador;
    }
    // Chamada recursiva com acumulador
    return fatorialTailRecursion(n - 1, n * acumulador);
}

// Solução 3: Recursão com memoização
const memoFatorial: { [key: number]: number } = {};

function fatorialMemoizado(n: number): number {
    // Verifica se já foi calculado
    if (n in memoFatorial) {
        return memoFatorial[n];
    }
    
    // Caso base
    if (n <= 1) {
        memoFatorial[n] = 1;
        return 1;
    }
    
    // Calcula e armazena o resultado
    const resultado = n * fatorialMemoizado(n - 1);
    memoFatorial[n] = resultado;
    return resultado;
}

// Testes
console.log("=== Exercício 1: Fatorial ===");
console.log("Fatorial de 5 (recursivo):", fatorialRecursivo(5));
console.log("Fatorial de 5 (tail recursion):", fatorialTailRecursion(5));
console.log("Fatorial de 5 (memoizado):", fatorialMemoizado(5));
console.log("Fatorial de 0:", fatorialRecursivo(0));
console.log("Fatorial de 1:", fatorialRecursivo(1));
