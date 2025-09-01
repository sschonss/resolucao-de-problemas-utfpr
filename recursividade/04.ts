// Use a mesma classe para os exercícios 4 e 5
class SomaIntervalo {
    
    // Exercício 4: SOMA DO INTERVALO - Dados dois números, os limites superior e inferior de um intervalo, 
    // retorne a soma dos inteiros neste intervalo fechado. O limite superior sempre será maior, ou igual, ao inferior.
    
    // Solução 1: Recursão simples
    static somaIntervalo(inferior: number, superior: number): number {
        // Caso base: se inferior ultrapassou superior
        if (inferior > superior) {
            return 0;
        }
        
        // Soma o número atual com a soma do resto do intervalo
        return inferior + this.somaIntervalo(inferior + 1, superior);
    }
    
    // Solução 2: Recursão com acumulador
    static somaIntervaloAcumulador(inferior: number, superior: number, acumulador: number = 0): number {
        // Caso base: se inferior ultrapassou superior
        if (inferior > superior) {
            return acumulador;
        }
        
        // Chamada recursiva acumulando o valor
        return this.somaIntervaloAcumulador(inferior + 1, superior, acumulador + inferior);
    }
    
    // Exercício 5: SOMA DO INTERVALO APRIMORADA - Aprimore a resolução anterior para que os limites sejam
    // invertidos no caso do limite inferior ser maior do que o superior. Assim, quando for pedido que a função
    // retorne a soma do intervalo [10, 1], será tratado da mesma forma do que a soma de [1, 10].
    
    // Solução 1: Com inversão automática
    static somaIntervaloAprimorada(limite1: number, limite2: number): number {
        // Determina qual é o inferior e qual é o superior
        const inferior = Math.min(limite1, limite2);
        const superior = Math.max(limite1, limite2);
        
        // Usa a função original com os limites corretos
        return this.somaIntervalo(inferior, superior);
    }
    
    // Solução 2: Recursão direta com verificação
    static somaIntervaloAprimoradaDireta(limite1: number, limite2: number): number {
        // Se limite1 > limite2, inverte a ordem
        if (limite1 > limite2) {
            return this.somaIntervaloAprimoradaDireta(limite2, limite1);
        }
        
        // Caso base: se limite1 ultrapassou limite2
        if (limite1 > limite2) {
            return 0;
        }
        
        // Recursão normal quando limite1 <= limite2
        return limite1 + this.somaIntervaloAprimoradaDireta(limite1 + 1, limite2);
    }
}

// Testes
console.log("=== Exercícios 4 e 5: SOMA DO INTERVALO ===");

console.log("\n--- Exercício 4: Soma do Intervalo ---");
console.log("Soma de 1 a 5:", SomaIntervalo.somaIntervalo(1, 5));
console.log("Soma de 10 a 15:", SomaIntervalo.somaIntervalo(10, 15));
console.log("Soma de 1 a 5 (com acumulador):", SomaIntervalo.somaIntervaloAcumulador(1, 5));

console.log("\n--- Exercício 5: Soma Aprimorada (com inversão) ---");
console.log("Soma de [10, 1] (deve inverter para [1, 10]):", SomaIntervalo.somaIntervaloAprimorada(10, 1));
console.log("Soma de [5, 20]:", SomaIntervalo.somaIntervaloAprimorada(5, 20));
console.log("Soma de [25, 15] (deve inverter):", SomaIntervalo.somaIntervaloAprimorada(25, 15));
console.log("Soma de [7, 7] (um único número):", SomaIntervalo.somaIntervaloAprimorada(7, 7));
