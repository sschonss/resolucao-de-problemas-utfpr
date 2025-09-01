// Exercício 2: CONTAGEM PROGRESSIVA - Dado um inteiro positivo n, realize a contagem progressiva de 1 até n

// Solução 1: Recursão simples com contador
function contagemProgressiva(n: number, atual: number = 1): void {
    // Caso base: se atual ultrapassou n
    if (atual > n) {
        return;
    }
    
    // Exibe o número atual
    console.log(atual);
    
    // Chamada recursiva com próximo número
    contagemProgressiva(n, atual + 1);
}

// Solução 2: Recursão reversa (calcula até n e exibe na volta)
function contagemProgressivaReversa(n: number): void {
    // Caso base: se n é menor que 1
    if (n < 1) {
        return;
    }
    
    // Primeiro faz a chamada recursiva
    contagemProgressivaReversa(n - 1);
    
    // Depois exibe o número (na volta da recursão)
    console.log(n);
}

// Testes
console.log("=== Exercício 2: CONTAGEM PROGRESSIVA ===");
console.log("Contagem de 1 até 5:");
contagemProgressiva(5);

console.log("\nContagem de 1 até 7 (reversa):");
contagemProgressivaReversa(7);
