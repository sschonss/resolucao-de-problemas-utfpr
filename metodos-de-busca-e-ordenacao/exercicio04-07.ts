/**
 * EXERCÍCIOS 4, 5, 6 e 7: Classe para trabalhar com array de 20 inteiros
 * - CRESCENTE: Verifica se array está em ordem crescente
 * - BUBBLE MELHORADO: Bubble Sort otimizado 
 * - EMBARALHAR: Embaralha o array
 * - GNOME SORT: Implementa o algoritmo Gnome Sort
 */

class ManipuladorArray {
    private matriz: number[];

    constructor(matriz: number[]) {
        if (matriz.length !== 20) {
            throw new Error("A matriz deve ter exatamente 20 elementos");
        }
        this.matriz = [...matriz];
    }

    /**
     * EXERCÍCIO 4: CRESCENTE
     * Verifica se a matriz está em ordem crescente (abandona verificação ao encontrar inversão)
     */
    estaCrescente(): boolean {
        console.log("🔍 Verificando se a matriz está em ordem crescente...");
        console.log(`Matriz: [${this.matriz.join(', ')}]`);
        
        for (let i = 0; i < this.matriz.length - 1; i++) {
            console.log(`Comparando posição ${i} (${this.matriz[i]}) com posição ${i + 1} (${this.matriz[i + 1]})`);
            
            if (this.matriz[i] > this.matriz[i + 1]) {
                console.log(`❌ Encontrada inversão na posição ${i}: ${this.matriz[i]} > ${this.matriz[i + 1]}`);
                console.log("🚫 Verificação abandonada - matriz NÃO está em ordem crescente");
                return false;
            }
        }
        
        console.log("✅ Matriz está em ordem crescente!");
        return true;
    }

    /**
     * EXERCÍCIO 5: BUBBLE MELHORADO
     * Bubble Sort otimizado que para quando não há mais trocas
     */
    bubbleSortMelhorado(): { trocas: number, iteracoes: number, passos: string[] } {
        const arr = [...this.matriz];
        let trocas = 0;
        let iteracoes = 0;
        const passos: string[] = [];
        
        console.log("🫧 Iniciando Bubble Sort Melhorado...");
        passos.push(`Inicial: [${arr.join(', ')}]`);
        
        for (let i = 0; i < arr.length - 1; i++) {
            iteracoes++;
            let trocouNestaIteracao = false;
            
            console.log(`\n--- Iteração ${iteracoes} ---`);
            
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Troca os elementos
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    trocas++;
                    trocouNestaIteracao = true;
                    
                    console.log(`Troca ${trocas}: ${arr[j + 1]} ↔ ${arr[j]} na posição ${j}`);
                }
            }
            
            passos.push(`Iteração ${iteracoes}: [${arr.join(', ')}] ${trocouNestaIteracao ? '(houve trocas)' : '(sem trocas)'}`);
            
            if (!trocouNestaIteracao) {
                console.log("🎯 Otimização ativada: Não houve trocas nesta iteração");
                console.log("🏁 Algoritmo finalizado precocemente - array já está ordenado!");
                break;
            }
        }
        
        this.matriz = arr;
        console.log(`\n✅ Ordenação concluída em ${iteracoes} iterações com ${trocas} trocas`);
        console.log(`Resultado: [${this.matriz.join(', ')}]`);
        
        return { trocas, iteracoes, passos };
    }

    /**
     * EXERCÍCIO 6: EMBARALHAR
     * Embaralha a matriz usando algoritmo Fisher-Yates
     */
    embaralhar(): void {
        console.log("🎲 Embaralhando a matriz...");
        console.log(`Antes: [${this.matriz.join(', ')}]`);
        
        for (let i = this.matriz.length - 1; i > 0; i--) {
            // Gera índice aleatório entre 0 e i
            const j = Math.floor(Math.random() * (i + 1));
            
            // Troca elementos
            [this.matriz[i], this.matriz[j]] = [this.matriz[j], this.matriz[i]];
            
            console.log(`Passo ${this.matriz.length - i}: Trocar posição ${i} com posição ${j}`);
        }
        
        console.log(`Depois: [${this.matriz.join(', ')}]`);
        console.log("🎯 Embaralhamento concluído!");
    }

    /**
     * EXERCÍCIO 7: GNOME SORT
     * Implementa o algoritmo Gnome Sort conforme descrito
     */
    gnomeSort(): { trocas: number, comparacoes: number, passos: string[] } {
        const arr = [...this.matriz];
        let trocas = 0;
        let comparacoes = 0;
        const passos: string[] = [];
        let posicao = 0;
        
        console.log("🧙‍♂️ Iniciando Gnome Sort...");
        passos.push(`Inicial: [${arr.join(', ')}] - posição: ${posicao}`);
        
        while (posicao < arr.length) {
            // Condição limite 1: se não houver vaso anterior, vai para o próximo
            if (posicao === 0) {
                posicao++;
                passos.push(`Posição 0: avança para posição ${posicao}`);
            } else {
                comparacoes++;
                // Compara elemento atual com o anterior
                if (arr[posicao] >= arr[posicao - 1]) {
                    // Estão na ordem correta, avança
                    posicao++;
                    if (posicao < arr.length) {
                        passos.push(`Posição ${posicao - 1}: elementos em ordem, avança para ${posicao}`);
                    }
                } else {
                    // Elementos fora de ordem, troca e volta
                    [arr[posicao], arr[posicao - 1]] = [arr[posicao - 1], arr[posicao]];
                    trocas++;
                    posicao--;
                    
                    passos.push(`Troca ${trocas}: [${arr.join(', ')}] - volta para posição ${posicao}`);
                    console.log(`Troca ${trocas}: Elementos ${arr[posicao + 1]} e ${arr[posicao]} trocados, volta para posição ${posicao}`);
                }
            }
        }
        
        this.matriz = arr;
        console.log(`\n✅ Gnome Sort concluído!`);
        console.log(`Resultado: [${this.matriz.join(', ')}]`);
        console.log(`Total de trocas: ${trocas}`);
        console.log(`Total de comparações: ${comparacoes}`);
        
        return { trocas, comparacoes, passos };
    }

    // Métodos auxiliares
    obterMatriz(): number[] {
        return [...this.matriz];
    }

    alterarMatriz(novaMatriz: number[]): void {
        if (novaMatriz.length !== 20) {
            throw new Error("A nova matriz deve ter exatamente 20 elementos");
        }
        this.matriz = [...novaMatriz];
    }

    imprimirMatriz(): void {
        console.log(`[${this.matriz.join(', ')}]`);
    }
}

// Testes dos exercícios 4, 5, 6 e 7
console.log("=== EXERCÍCIOS 4, 5, 6 e 7: MANIPULAÇÃO DE ARRAY ===\n");

// Criando arrays de teste
const arrayOrdenadoTeste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const arrayDesordenadoTeste = [15, 3, 9, 1, 12, 7, 18, 5, 20, 11, 2, 16, 8, 14, 6, 19, 4, 13, 10, 17];
const arrayQuaseOrdenadoTeste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 18, 19];

console.log("📋 TESTE DO EXERCÍCIO 4 - VERIFICAÇÃO CRESCENTE:");
console.log("\nTeste 1: Array já ordenado");
const teste4a = new ManipuladorArray(arrayOrdenadoTeste);
teste4a.estaCrescente();

console.log("\nTeste 2: Array desordenado");
const teste4b = new ManipuladorArray(arrayDesordenadoTeste);
teste4b.estaCrescente();

console.log("\nTeste 3: Array quase ordenado");
const teste4c = new ManipuladorArray(arrayQuaseOrdenadoTeste);
teste4c.estaCrescente();

console.log("\n" + "=".repeat(70));
console.log("📋 TESTE DO EXERCÍCIO 5 - BUBBLE SORT MELHORADO:");

console.log("\nTeste com array desordenado:");
const teste5 = new ManipuladorArray(arrayDesordenadoTeste.slice(0, 10).concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]));
const resultadoBubble = teste5.bubbleSortMelhorado();

console.log("\n" + "=".repeat(70));
console.log("📋 TESTE DO EXERCÍCIO 6 - EMBARALHAR:");

console.log("\nEmbalhando array ordenado:");
const teste6 = new ManipuladorArray(arrayOrdenadoTeste);
teste6.embaralhar();

console.log("\n" + "=".repeat(70));
console.log("📋 TESTE DO EXERCÍCIO 7 - GNOME SORT:");

console.log("\nTeste com array pequeno para demonstração:");
// Usando array menor para demonstrar melhor o algoritmo
const arrayPequeno = [6, 2, 9, 4, 7, 1, 8, 5, 0, 3, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const teste7 = new ManipuladorArray(arrayPequeno);

console.log("\nArray inicial para Gnome Sort:");
teste7.imprimirMatriz();

const resultadoGnome = teste7.gnomeSort();

console.log("\n📊 RESUMO DOS ALGORITMOS:");
console.log("┌─────────────────────┬─────────────┬─────────┐");
console.log("│ Algoritmo           │ Comparações │ Trocas  │");
console.log("├─────────────────────┼─────────────┼─────────┤");
console.log(`│ Bubble Sort Melhorado│ N/A         │ ${resultadoBubble.trocas.toString().padStart(7)} │`);
console.log(`│ Gnome Sort          │ ${resultadoGnome.comparacoes.toString().padStart(11)} │ ${resultadoGnome.trocas.toString().padStart(7)} │`);
console.log("└─────────────────────┴─────────────┴─────────┘");
