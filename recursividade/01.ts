// Exercício 1: MENSAGEM - Implemente um método que exiba n vezes uma mensagem na tela

// Solução 1: Recursão simples
function exibirMensagem(mensagem: string, n: number): void {
    // Caso base: se n é 0 ou negativo, para a recursão
    if (n <= 0) {
        return;
    }
    
    // Exibe a mensagem
    console.log(mensagem);
    
    // Chamada recursiva decrementando n
    exibirMensagem(mensagem, n - 1);
}

// Solução 2: Recursão com contador
function exibirMensagemContador(mensagem: string, n: number, contador: number = 1): void {
    // Caso base: se contador ultrapassou n
    if (contador > n) {
        return;
    }
    
    // Exibe a mensagem com numeração
    console.log(`${contador}: ${mensagem}`);
    
    // Chamada recursiva incrementando contador
    exibirMensagemContador(mensagem, n, contador + 1);
}

// Testes
console.log("=== Exercício 1: MENSAGEM ===");
console.log("Exibindo 'Olá mundo!' 3 vezes:");
exibirMensagem("Olá mundo!", 3);

console.log("\nExibindo 'TypeScript' 5 vezes com contador:");
exibirMensagemContador("TypeScript", 5);
