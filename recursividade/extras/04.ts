// Exercício 4: Calcular a potência de um número (base^expoente)

// Solução 1: Recursão simples
function potenciaRecursiva(base: number, expoente: number): number {
    // Caso base: qualquer número elevado à potência 0 é 1
    if (expoente === 0) {
        return 1;
    }
    
    // Caso para expoente negativo
    if (expoente < 0) {
        return 1 / potenciaRecursiva(base, -expoente);
    }
    
    // Chamada recursiva
    return base * potenciaRecursiva(base, expoente - 1);
}

// Solução 2: Recursão otimizada (exponenciação rápida)
function potenciaRapida(base: number, expoente: number): number {
    // Caso base
    if (expoente === 0) {
        return 1;
    }
    
    // Caso para expoente negativo
    if (expoente < 0) {
        return 1 / potenciaRapida(base, -expoente);
    }
    
    // Se o expoente é par, usa a propriedade: base^n = (base^(n/2))^2
    if (expoente % 2 === 0) {
        const metade = potenciaRapida(base, expoente / 2);
        return metade * metade;
    }
    
    // Se o expoente é ímpar
    return base * potenciaRapida(base, expoente - 1);
}

// Solução 3: Recursão com acumulador
function potenciaAcumulador(base: number, expoente: number, acumulador: number = 1): number {
    // Caso base
    if (expoente === 0) {
        return acumulador;
    }
    
    // Caso para expoente negativo
    if (expoente < 0) {
        return potenciaAcumulador(1/base, -expoente, acumulador);
    }
    
    // Chamada recursiva com acumulador
    return potenciaAcumulador(base, expoente - 1, acumulador * base);
}

// Testes
console.log("=== Exercício 4: Potência ===");
console.log("2^10 (recursiva):", potenciaRecursiva(2, 10));
console.log("2^10 (rápida):", potenciaRapida(2, 10));
console.log("2^10 (acumulador):", potenciaAcumulador(2, 10));

console.log("\n3^0:", potenciaRecursiva(3, 0));
console.log("5^1:", potenciaRecursiva(5, 1));
console.log("2^-3:", potenciaRecursiva(2, -3));

console.log("\n=== Comparação de performance (números grandes) ===");
console.log("2^20 (rápida):", potenciaRapida(2, 20));
console.log("3^15 (rápida):", potenciaRapida(3, 15));

// Demonstração da diferença de eficiência
console.log("\n=== Teste com base decimal ===");
console.log("1.5^4:", potenciaRecursiva(1.5, 4));
console.log("0.5^3:", potenciaRecursiva(0.5, 3));
