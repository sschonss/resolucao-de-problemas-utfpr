// Exercício 10: TETRANACCI - Dado um inteiro positivo n, imprima o n-ésimo termo da série de Tetranacci
// Os quatro primeiros termos são 1, 1, 2 e 4: 1, 1, 2, 4, 8, 15, 29, 56...

// Solução 1: Recursão simples
function tetranacci(n: number): number {
    // Casos base: os quatro primeiros termos
    if (n === 1) return 1;
    if (n === 2) return 1;
    if (n === 3) return 2;
    if (n === 4) return 4;
    
    // Chamada recursiva: soma dos quatro anteriores
    return tetranacci(n - 1) + tetranacci(n - 2) + 
           tetranacci(n - 3) + tetranacci(n - 4);
}

// Solução 2: Tetranacci com memoização
const tetraMemo: { [key: number]: number } = { 1: 1, 2: 1, 3: 2, 4: 4 };

function tetranacciMemoizado(n: number): number {
    if (n in tetraMemo) {
        return tetraMemo[n];
    }
    
    if (n === 1) return 1;
    if (n === 2) return 1;
    if (n === 3) return 2;
    if (n === 4) return 4;
    
    const resultado = tetranacciMemoizado(n - 1) + 
                     tetranacciMemoizado(n - 2) + 
                     tetranacciMemoizado(n - 3) + 
                     tetranacciMemoizado(n - 4);
    tetraMemo[n] = resultado;
    return resultado;
}

// Testes
console.log("=== Exercício 10: TETRANACCI ===");
console.log("Primeiros 10 termos de Tetranacci:");
for (let i = 1; i <= 10; i++) {
    console.log(`Tetra(${i}) = ${tetranacciMemoizado(i)}`);
}

console.log("\nTeste com recursão simples (números menores):");
console.log("Tetra(6) =", tetranacci(6));
console.log("Tetra(8) =", tetranacci(8));
