// Exercício 3: CONTAGEM DE A ATÉ B - dados os inteiros a e b, realize a contagem progressiva de a até b

// Solução 1: Recursão simples
function contagemAteB(a: number, b: number): void {
    // Caso base: se a ultrapassou b
    if (a > b) {
        return;
    }
    
    // Exibe o número atual
    console.log(a);
    
    // Chamada recursiva com próximo número
    contagemAteB(a + 1, b);
}

// Solução 2: Recursão que funciona para contagem crescente e decrescente
function contagemFlexivel(a: number, b: number): void {
    // Caso base: se a e b são iguais
    if (a === b) {
        console.log(a);
        return;
    }
    
    // Exibe o número atual
    console.log(a);
    
    // Determina a direção da contagem
    if (a < b) {
        // Contagem crescente
        contagemFlexivel(a + 1, b);
    } else {
        // Contagem decrescente
        contagemFlexivel(a - 1, b);
    }
}

// Testes
console.log("=== Exercício 3: CONTAGEM DE A ATÉ B ===");
console.log("Contagem de 3 até 8:");
contagemAteB(3, 8);

console.log("\nContagem flexível de 5 até 10:");
contagemFlexivel(5, 10);

console.log("\nContagem flexível de 10 até 5 (decrescente):");
contagemFlexivel(10, 5);
