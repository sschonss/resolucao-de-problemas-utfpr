/**
 * EXERCÍCIO 3: BARALHO - Algoritmos de Ordenação
 * Aplica Selection Sort, Bubble Sort e Insertion Sort aos arranjos dados
 */

interface ResultadoOrdenacao {
    arranjoFinal: number[];
    comparacoes: number;
    trocas: number;
    passos: string[];
}

class AlgoritmosOrdenacao {
    
    /**
     * Selection Sort - Ordenação por Seleção
     */
    static selectionSort(arranjo: number[]): ResultadoOrdenacao {
        const arr = [...arranjo];
        let comparacoes = 0;
        let trocas = 0;
        const passos: string[] = [];
        
        passos.push(`Arranjo inicial: [${arr.join(', ')}]`);
        
        for (let i = 0; i < arr.length - 1; i++) {
            let menorIndice = i;
            
            // Encontra o menor elemento no restante do array
            for (let j = i + 1; j < arr.length; j++) {
                comparacoes++;
                if (arr[j] < arr[menorIndice]) {
                    menorIndice = j;
                }
            }
            
            // Troca se necessário
            if (menorIndice !== i) {
                [arr[i], arr[menorIndice]] = [arr[menorIndice], arr[i]];
                trocas++;
                passos.push(`Passo ${i + 1}: Trocar ${arr[menorIndice]} por ${arr[i]} → [${arr.join(', ')}]`);
            } else {
                passos.push(`Passo ${i + 1}: Sem troca necessária → [${arr.join(', ')}]`);
            }
        }
        
        return { arranjoFinal: arr, comparacoes, trocas, passos };
    }
    
    /**
     * Bubble Sort - Ordenação Bolha
     */
    static bubbleSort(arranjo: number[]): ResultadoOrdenacao {
        const arr = [...arranjo];
        let comparacoes = 0;
        let trocas = 0;
        const passos: string[] = [];
        
        passos.push(`Arranjo inicial: [${arr.join(', ')}]`);
        
        for (let i = 0; i < arr.length - 1; i++) {
            let trocouNessaIteracao = false;
            
            for (let j = 0; j < arr.length - 1 - i; j++) {
                comparacoes++;
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    trocas++;
                    trocouNessaIteracao = true;
                }
            }
            
            passos.push(`Iteração ${i + 1}: [${arr.join(', ')}] ${trocouNessaIteracao ? '(houve trocas)' : '(sem trocas)'}`);
            
            if (!trocouNessaIteracao) {
                passos.push('Ordenação completa - sem trocas na iteração');
                break;
            }
        }
        
        return { arranjoFinal: arr, comparacoes, trocas, passos };
    }
    
    /**
     * Insertion Sort - Ordenação por Inserção
     */
    static insertionSort(arranjo: number[]): ResultadoOrdenacao {
        const arr = [...arranjo];
        let comparacoes = 0;
        let trocas = 0;
        const passos: string[] = [];
        
        passos.push(`Arranjo inicial: [${arr.join(', ')}]`);
        
        for (let i = 1; i < arr.length; i++) {
            const chave = arr[i];
            let j = i - 1;
            
            passos.push(`Passo ${i}: Inserindo ${chave}`);
            
            // Move elementos maiores que a chave para a direita
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
            passos.push(`Resultado: [${arr.join(', ')}]`);
        }
        
        return { arranjoFinal: arr, comparacoes, trocas, passos };
    }
    
    /**
     * Executa todos os algoritmos e compara resultados
     */
    static compararAlgoritmos(arranjo: number[], nome: string): void {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`ANÁLISE DO ${nome.toUpperCase()}: [${arranjo.join(', ')}]`);
        console.log(`${'='.repeat(60)}`);
        
        // Selection Sort
        console.log("\n🔹 SELECTION SORT:");
        const resultSelection = this.selectionSort(arranjo);
        console.log(`Comparações: ${resultSelection.comparacoes}`);
        console.log(`Trocas: ${resultSelection.trocas}`);
        console.log(`Resultado: [${resultSelection.arranjoFinal.join(', ')}]`);
        
        // Bubble Sort
        console.log("\n🔹 BUBBLE SORT:");
        const resultBubble = this.bubbleSort(arranjo);
        console.log(`Comparações: ${resultBubble.comparacoes}`);
        console.log(`Trocas: ${resultBubble.trocas}`);
        console.log(`Resultado: [${resultBubble.arranjoFinal.join(', ')}]`);
        
        // Insertion Sort
        console.log("\n🔹 INSERTION SORT:");
        const resultInsertion = this.insertionSort(arranjo);
        console.log(`Comparações: ${resultInsertion.comparacoes}`);
        console.log(`Trocas: ${resultInsertion.trocas}`);
        console.log(`Resultado: [${resultInsertion.arranjoFinal.join(', ')}]`);
        
        // Resumo comparativo
        console.log("\n📊 RESUMO COMPARATIVO:");
        console.log("┌─────────────────┬─────────────┬─────────┐");
        console.log("│ Algoritmo       │ Comparações │ Trocas  │");
        console.log("├─────────────────┼─────────────┼─────────┤");
        console.log(`│ Selection Sort  │ ${resultSelection.comparacoes.toString().padStart(11)} │ ${resultSelection.trocas.toString().padStart(7)} │`);
        console.log(`│ Bubble Sort     │ ${resultBubble.comparacoes.toString().padStart(11)} │ ${resultBubble.trocas.toString().padStart(7)} │`);
        console.log(`│ Insertion Sort  │ ${resultInsertion.comparacoes.toString().padStart(11)} │ ${resultInsertion.trocas.toString().padStart(7)} │`);
        console.log("└─────────────────┴─────────────┴─────────┘");
    }
    
    /**
     * Mostra os passos detalhados de um algoritmo
     */
    static mostrarPassosDetalhados(arranjo: number[], algoritmo: string): void {
        console.log(`\n📝 PASSOS DETALHADOS - ${algoritmo.toUpperCase()}:`);
        console.log(`Arranjo: [${arranjo.join(', ')}]\n`);
        
        let resultado: ResultadoOrdenacao;
        
        switch (algoritmo.toLowerCase()) {
            case 'selection':
                resultado = this.selectionSort(arranjo);
                break;
            case 'bubble':
                resultado = this.bubbleSort(arranjo);
                break;
            case 'insertion':
                resultado = this.insertionSort(arranjo);
                break;
            default:
                console.log("Algoritmo não encontrado!");
                return;
        }
        
        resultado.passos.forEach((passo, index) => {
            console.log(`${index}: ${passo}`);
        });
        
        console.log(`\nTotal de comparações: ${resultado.comparacoes}`);
        console.log(`Total de trocas: ${resultado.trocas}`);
    }
}

// Testes do exercício 3
console.log("=== EXERCÍCIO 3: BARALHO - ALGORITMOS DE ORDENAÇÃO ===");

// Arranjos conforme especificado no exercício
const arranjo1 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; // Primeiro arranjo
const arranjo2 = [10, 1, 9, 2, 8, 3, 7, 4, 6, 5]; // Segundo arranjo  
const arranjo3 = [4, 5, 6, 1, 2, 3, 7, 8, 9, 10]; // Terceiro arranjo

// Análise comparativa de todos os arranjos
AlgoritmosOrdenacao.compararAlgoritmos(arranjo1, "PRIMEIRO ARRANJO");
AlgoritmosOrdenacao.compararAlgoritmos(arranjo2, "SEGUNDO ARRANJO");
AlgoritmosOrdenacao.compararAlgoritmos(arranjo3, "TERCEIRO ARRANJO");

// Exemplo de passos detalhados para o primeiro arranjo com Bubble Sort
console.log("\n" + "=".repeat(80));
console.log("EXEMPLO DE EXECUÇÃO DETALHADA:");
AlgoritmosOrdenacao.mostrarPassosDetalhados(arranjo1, "bubble");
