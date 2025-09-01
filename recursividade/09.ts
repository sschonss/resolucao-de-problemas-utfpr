// Exercício 9: TRIBONACCI - Dado um inteiro positivo n, imprima o n-ésimo termo da série de Tribonacci
// Os três primeiros termos são 1, 1 e 2: 1, 1, 2, 4, 7, 13, 24, 44...

// Solução 1: Recursão simples
function tribonacci(n: number): number {
    // Casos base: os três primeiros termos
    if (n === 1) return 1;
    if (n === 2) return 1;
    if (n === 3) return 2;
    
    // Chamada recursiva: soma dos três anteriores
    return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
}

// Solução 2: Tribonacci com memoização
const triboMemo: { [key: number]: number } = { 1: 1, 2: 1, 3: 2 };

function tribonacciMemoizado(n: number): number {
    if (n in triboMemo) {
        return triboMemo[n];
    }
    
    if (n === 1) return 1;
    if (n === 2) return 1;
    if (n === 3) return 2;
    
    const resultado = tribonacciMemoizado(n - 1) + 
                     tribonacciMemoizado(n - 2) + 
                     tribonacciMemoizado(n - 3);
    triboMemo[n] = resultado;
    return resultado;
}

// Testes
console.log("=== Exercício 9: TRIBONACCI ===");
console.log("Primeiros 10 termos de Tribonacci:");
for (let i = 1; i <= 10; i++) {
    console.log(`T(${i}) = ${tribonacciMemoizado(i)}`);
}

console.log("\nTeste com recursão simples (números menores):");
console.log("T(6) =", tribonacci(6));
console.log("T(8) =", tribonacci(8));
