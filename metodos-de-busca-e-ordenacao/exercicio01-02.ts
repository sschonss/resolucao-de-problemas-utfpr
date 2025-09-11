/**
 * EXERCÍCIOS 1 e 2: ORDENA TRÊS e MAIOR DE TRÊS
 * Classe que trabalha com três números inteiros
 */

class OrdenaTres {
    private a: number;
    private b: number;
    private c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    /**
     * EXERCÍCIO 1: Ordena os três valores usando apenas 3 estruturas condicionais
     * sem blocos de caso-contrário
     */
    ordenarTres(): { a: number, b: number, c: number } {
        let x = this.a;
        let y = this.b;
        let z = this.c;

        console.log(`Valores originais: a=${x}, b=${y}, c=${z}`);

        // Primeira estrutura condicional: garante que x <= y
        if (x > y) {
            const temp = x;
            x = y;
            y = temp;
            console.log(`Primeira troca: x=${x}, y=${y}, z=${z}`);
        }

        // Segunda estrutura condicional: garante que y <= z
        if (y > z) {
            const temp = y;
            y = z;
            z = temp;
            console.log(`Segunda troca: x=${x}, y=${y}, z=${z}`);
        }

        // Terceira estrutura condicional: garante que x <= y (novamente)
        if (x > y) {
            const temp = x;
            x = y;
            y = temp;
            console.log(`Terceira troca: x=${x}, y=${y}, z=${z}`);
        }

        console.log(`Valores ordenados: a=${x}, b=${y}, c=${z}`);
        return { a: x, b: y, c: z };
    }

    /**
     * EXERCÍCIO 2: Encontra o maior dos três valores usando apenas 2 estruturas condicionais
     * sem blocos de caso-contrário
     */
    maiorDeTres(): number {
        let maior = this.a;

        console.log(`Valores: a=${this.a}, b=${this.b}, c=${this.c}`);
        console.log(`Maior inicial: ${maior}`);

        // Primeira estrutura condicional: compara com b
        if (this.b > maior) {
            maior = this.b;
            console.log(`Novo maior após comparar com b: ${maior}`);
        }

        // Segunda estrutura condicional: compara com c
        if (this.c > maior) {
            maior = this.c;
            console.log(`Novo maior após comparar com c: ${maior}`);
        }

        console.log(`Maior valor: ${maior}`);
        return maior;
    }

    // Métodos auxiliares para visualização
    obterValores(): { a: number, b: number, c: number } {
        return { a: this.a, b: this.b, c: this.c };
    }

    alterarValores(a: number, b: number, c: number): void {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

// Testes dos exercícios 1 e 2
console.log("=== EXERCÍCIOS 1 e 2: ORDENA TRÊS e MAIOR DE TRÊS ===\n");

console.log("1. TESTE DO EXERCÍCIO 1 - ORDENAÇÃO:");
console.log("Teste 1: Valores em ordem decrescente");
const teste1 = new OrdenaTres(9, 5, 2);
teste1.ordenarTres();

console.log("\nTeste 2: Valores em ordem aleatória");
const teste2 = new OrdenaTres(5, 9, 2);
teste2.ordenarTres();

console.log("\nTeste 3: Valores já ordenados");
const teste3 = new OrdenaTres(2, 5, 9);
teste3.ordenarTres();

console.log("\n" + "=".repeat(50));
console.log("2. TESTE DO EXERCÍCIO 2 - MAIOR VALOR:");

console.log("\nTeste 1: Maior é o primeiro");
const testeMaior1 = new OrdenaTres(9, 5, 2);
testeMaior1.maiorDeTres();

console.log("\nTeste 2: Maior é o segundo");
const testeMaior2 = new OrdenaTres(5, 9, 2);
testeMaior2.maiorDeTres();

console.log("\nTeste 3: Maior é o terceiro");
const testeMaior3 = new OrdenaTres(2, 5, 9);
testeMaior3.maiorDeTres();

console.log("\nTeste 4: Valores iguais");
const testeMaior4 = new OrdenaTres(7, 7, 7);
testeMaior4.maiorDeTres();
