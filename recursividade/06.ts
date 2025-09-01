// Exercício 6: FATORIAL - Dado um inteiro n, retorne n!

// Solução 1: Recursão clássica
function fatorial(n: number): number {
    // Caso base: fatorial de 0 e 1 é 1
    if (n <= 1) {
        return 1;
    }
    
    // Chamada recursiva: n * (n-1)!
    return n * fatorial(n - 1);
}

// Solução 2: Recursão com tail recursion (acumulador)
function fatorialTailRecursion(n: number, acumulador: number = 1): number {
    // Caso base
    if (n <= 1) {
        return acumulador;
    }
    
    // Chamada recursiva com acumulador
    return fatorialTailRecursion(n - 1, n * acumulador);
}

// Testes
console.log("=== Exercício 6: FATORIAL ===");
console.log("5! =", fatorial(5));
console.log("0! =", fatorial(0));
console.log("1! =", fatorial(1));
console.log("7! =", fatorial(7));

console.log("\nCom tail recursion:");
console.log("8! =", fatorialTailRecursion(8));
console.log("10! =", fatorialTailRecursion(10));
