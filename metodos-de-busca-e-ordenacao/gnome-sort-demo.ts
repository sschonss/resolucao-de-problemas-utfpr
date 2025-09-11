/**
 * DEMONSTRAÇÃO ESPECIAL: GNOME SORT
 * Implementa exatamente o exemplo dado no exercício 7
 */

class GnomeSortDemo {
    
    /**
     * Executa o Gnome Sort exatamente como no exemplo do exercício
     */
    static demonstrarGnomeSort(): void {
        // Array inicial conforme o exemplo
        const arr = [6, 2, 9, 4, 7, 1, 8, 5, 0];
        let posicao = 0;
        let passo = 0;
        
        console.log("🧙‍♂️ DEMONSTRAÇÃO DO GNOME SORT");
        console.log("Exemplo exato do exercício 7\n");
        
        console.log(`${passo.toString().padStart(2)}: [${arr.join(' ')}] - posição: ${posicao}`);
        
        while (posicao < arr.length) {
            if (posicao === 0) {
                // Condição limite 1: se não houver vaso anterior, vai para o próximo
                posicao++;
            } else {
                if (arr[posicao] >= arr[posicao - 1]) {
                    // Estão na ordem correta, avança
                    posicao++;
                } else {
                    // Fora de ordem, troca e volta
                    [arr[posicao], arr[posicao - 1]] = [arr[posicao - 1], arr[posicao]];
                    posicao--;
                    passo++;
                    console.log(`${passo.toString().padStart(2)}: [${arr.join(' ')}] - posição: ${posicao} (trocou e voltou)`);
                }
            }
        }
        
        console.log(`\n✅ Ordenação concluída em ${passo} passos`);
        console.log(`Resultado final: [${arr.join(' ')}]`);
    }
    
    /**
     * Versão mais detalhada mostrando cada decisão do algoritmo
     */
    static gnomeSortDetalhado(arranjo: number[]): void {
        const arr = [...arranjo];
        let posicao = 0;
        let trocas = 0;
        let comparacoes = 0;
        
        console.log(`\n🔍 GNOME SORT DETALHADO para [${arranjo.join(', ')}]`);
        console.log("=" .repeat(60));
        
        console.log(`Inicial: [${arr.join(' ')}] - gnomo na posição ${posicao}`);
        
        while (posicao < arr.length) {
            if (posicao === 0) {
                console.log(`\n🚶 Posição ${posicao}: Não há vaso anterior, avança para posição ${posicao + 1}`);
                posicao++;
            } else {
                comparacoes++;
                console.log(`\n👀 Posição ${posicao}: Comparando vaso ${arr[posicao]} com vaso anterior ${arr[posicao - 1]}`);
                
                if (arr[posicao] >= arr[posicao - 1]) {
                    console.log(`✅ ${arr[posicao]} >= ${arr[posicao - 1]} - Ordem correta, avança para posição ${posicao + 1}`);
                    posicao++;
                } else {
                    console.log(`❌ ${arr[posicao]} < ${arr[posicao - 1]} - Fora de ordem!`);
                    
                    // Troca
                    [arr[posicao], arr[posicao - 1]] = [arr[posicao - 1], arr[posicao]];
                    trocas++;
                    
                    console.log(`🔄 Troca ${trocas}: [${arr.join(' ')}]`);
                    posicao--;
                    console.log(`⬅️  Volta para posição ${posicao} para verificar o vaso que acabou de mover`);
                }
            }
        }
        
        console.log(`\n🎯 Algoritmo finalizado!`);
        console.log(`📊 Estatísticas:`);
        console.log(`   - Total de comparações: ${comparacoes}`);
        console.log(`   - Total de trocas: ${trocas}`);
        console.log(`   - Array final: [${arr.join(' ')}]`);
    }
    
    /**
     * Demonstra o conceito do gnomo com vasos de flores
     */
    static explicarConceito(): void {
        console.log("\n🌸 CONCEITO DOS GNOMOS E VASOS DE FLORES");
        console.log("=" .repeat(50));
        console.log("O gnomo trabalha desta forma:");
        console.log("1. 👀 Olha para o vaso atual e o vaso anterior");
        console.log("2. ✅ Se estão em ordem (menor → maior), avança");
        console.log("3. ❌ Se estão fora de ordem, troca os vasos");
        console.log("4. ⬅️  Após trocar, volta uma posição para verificar novamente");
        console.log("5. 🔄 Repete até chegar ao final");
        console.log("\nRegras especiais:");
        console.log("• Se não há vaso anterior (posição 0), apenas avança");
        console.log("• Se não há próximo vaso, o trabalho terminou");
    }
    
    /**
     * Compara Gnome Sort com outros algoritmos simples
     */
    static compararComOutros(arranjo: number[]): void {
        console.log(`\n📊 COMPARAÇÃO DE ALGORITMOS SIMPLES`);
        console.log(`Array de teste: [${arranjo.join(', ')}]`);
        console.log("=" .repeat(60));
        
        // Gnome Sort
        console.log("\n🧙‍♂️ GNOME SORT:");
        const gnomeResult = this.executarGnomeSort([...arranjo]);
        
        // Bubble Sort para comparação
        console.log("\n🫧 BUBBLE SORT (para comparação):");
        const bubbleResult = this.executarBubbleSort([...arranjo]);
        
        // Insertion Sort para comparação  
        console.log("\n📝 INSERTION SORT (para comparação):");
        const insertionResult = this.executarInsertionSort([...arranjo]);
        
        console.log("\n📈 RESUMO COMPARATIVO:");
        console.log("┌─────────────────┬─────────────┬─────────┐");
        console.log("│ Algoritmo       │ Comparações │ Trocas  │");
        console.log("├─────────────────┼─────────────┼─────────┤");
        console.log(`│ Gnome Sort      │ ${gnomeResult.comparacoes.toString().padStart(11)} │ ${gnomeResult.trocas.toString().padStart(7)} │`);
        console.log(`│ Bubble Sort     │ ${bubbleResult.comparacoes.toString().padStart(11)} │ ${bubbleResult.trocas.toString().padStart(7)} │`);
        console.log(`│ Insertion Sort  │ ${insertionResult.comparacoes.toString().padStart(11)} │ ${insertionResult.trocas.toString().padStart(7)} │`);
        console.log("└─────────────────┴─────────────┴─────────┘");
    }
    
    private static executarGnomeSort(arr: number[]): { comparacoes: number, trocas: number } {
        let posicao = 0;
        let trocas = 0;
        let comparacoes = 0;
        
        while (posicao < arr.length) {
            if (posicao === 0) {
                posicao++;
            } else {
                comparacoes++;
                if (arr[posicao] >= arr[posicao - 1]) {
                    posicao++;
                } else {
                    [arr[posicao], arr[posicao - 1]] = [arr[posicao - 1], arr[posicao]];
                    trocas++;
                    posicao--;
                }
            }
        }
        
        return { comparacoes, trocas };
    }
    
    private static executarBubbleSort(arr: number[]): { comparacoes: number, trocas: number } {
        let trocas = 0;
        let comparacoes = 0;
        
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                comparacoes++;
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    trocas++;
                }
            }
        }
        
        return { comparacoes, trocas };
    }
    
    private static executarInsertionSort(arr: number[]): { comparacoes: number, trocas: number } {
        let trocas = 0;
        let comparacoes = 0;
        
        for (let i = 1; i < arr.length; i++) {
            const chave = arr[i];
            let j = i - 1;
            
            while (j >= 0) {
                comparacoes++;
                if (arr[j] > chave) {
                    arr[j + 1] = arr[j];
                    trocas++;
                    j--;
                } else {
                    break;
                }
            }
            arr[j + 1] = chave;
        }
        
        return { comparacoes, trocas };
    }
}

// Execução das demonstrações
console.log("=== DEMONSTRAÇÃO ESPECIAL: GNOME SORT ===\n");

// Explicação do conceito
GnomeSortDemo.explicarConceito();

// Demonstração com o exemplo exato do exercício
GnomeSortDemo.demonstrarGnomeSort();

// Exemplo detalhado com array menor
console.log("\n" + "=".repeat(70));
const exemploDetalhado = [5, 2, 8, 1, 3];
GnomeSortDemo.gnomeSortDetalhado(exemploDetalhado);

// Comparação com outros algoritmos
console.log("\n" + "=".repeat(70));
const exemploComparacao = [6, 2, 9, 4, 7, 1, 8, 5, 0];
GnomeSortDemo.compararComOutros(exemploComparacao);
