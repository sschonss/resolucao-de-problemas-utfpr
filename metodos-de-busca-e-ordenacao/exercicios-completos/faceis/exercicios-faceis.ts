import {
    AlgoritmoOrdenacaoBase,
    AlgoritmoBuscaBase,
    ColecaoDados,
    ArrayUtils,
    MedidorPerformance,
    ResultadoExercicio
} from '../base/classes-base';

// ==================== EXERCÍCIO 1: BUBBLE SORT BÁSICO ====================

/**
 * EXERCÍCIO 1: Implementar Bubble Sort
 * Dificuldade: Fácil
 * 
 * Descrição: Implemente o algoritmo Bubble Sort para ordenar um array de números.
 * O Bubble Sort compara elementos adjacentes e os troca se estiverem fora de ordem.
 */

class BubbleSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];
        const n = resultado.length;

        for (let i = 0; i < n - 1; i++) {
            let houveTroca = false;
            
            for (let j = 0; j < n - i - 1; j++) {
                if (this.comparar(resultado[j], resultado[j + 1]) > 0) {
                    this.trocar(resultado, j, j + 1);
                    houveTroca = true;
                }
            }
            
            // Otimização: se não houve troca, o array já está ordenado
            if (!houveTroca) break;
        }

        return resultado;
    }

    getNome(): string { return "Bubble Sort"; }
    getComplexidade(): string { return "O(n²)"; }
    isEstavel(): boolean { return true; }
}

function exercicio1(): void {
    console.log("=== EXERCÍCIO 1: BUBBLE SORT ===\n");
    
    const bubbleSort = new BubbleSort();
    const dados = [64, 34, 25, 12, 22, 11, 90];
    
    console.log("Array original:", dados);
    
    const { resultado, tempo } = MedidorPerformance.medirTempo(() => 
        bubbleSort.ordenar(dados)
    );
    
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", bubbleSort.getEstatisticas());
    console.log("Complexidade:", bubbleSort.getComplexidade());
    console.log("Estável:", bubbleSort.isEstavel() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 2: BUSCA LINEAR ====================

/**
 * EXERCÍCIO 2: Implementar Busca Linear
 * Dificuldade: Fácil
 * 
 * Descrição: Implemente o algoritmo de busca linear para encontrar um elemento
 * em um array. Retorne o índice do elemento ou -1 se não encontrado.
 */

class BuscaLinear extends AlgoritmoBuscaBase<number> {
    buscar(array: number[], elemento: number): number {
        this.resetarEstatisticas();
        
        for (let i = 0; i < array.length; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                return i;
            }
        }
        
        return -1;
    }

    getNome(): string { return "Busca Linear"; }
    getComplexidade(): string { return "O(n)"; }
    requerOrdenado(): boolean { return false; }
}

function exercicio2(): void {
    console.log("\n=== EXERCÍCIO 2: BUSCA LINEAR ===\n");
    
    const buscaLinear = new BuscaLinear();
    const dados = [64, 34, 25, 12, 22, 11, 90];
    const elemento = 22;
    
    console.log("Array:", dados);
    console.log("Buscando elemento:", elemento);
    
    const { resultado, tempo } = MedidorPerformance.medirTempo(() => 
        buscaLinear.buscar(dados, elemento)
    );
    
    console.log("Índice encontrado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", buscaLinear.getEstatisticas());
    console.log("Complexidade:", buscaLinear.getComplexidade());
}

// ==================== EXERCÍCIO 3: SELECTION SORT ====================

/**
 * EXERCÍCIO 3: Implementar Selection Sort
 * Dificuldade: Fácil
 * 
 * Descrição: Implemente o algoritmo Selection Sort. O algoritmo encontra
 * o menor elemento e o coloca na primeira posição, depois repete para o resto.
 */

class SelectionSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];
        const n = resultado.length;

        for (let i = 0; i < n - 1; i++) {
            let menorIndice = i;
            
            for (let j = i + 1; j < n; j++) {
                if (this.comparar(resultado[j], resultado[menorIndice]) < 0) {
                    menorIndice = j;
                }
            }
            
            if (menorIndice !== i) {
                this.trocar(resultado, i, menorIndice);
            }
        }

        return resultado;
    }

    getNome(): string { return "Selection Sort"; }
    getComplexidade(): string { return "O(n²)"; }
    isEstavel(): boolean { return false; }
}

function exercicio3(): void {
    console.log("\n=== EXERCÍCIO 3: SELECTION SORT ===\n");
    
    const selectionSort = new SelectionSort();
    const dados = [29, 10, 14, 37, 13];
    
    console.log("Array original:", dados);
    
    const { resultado, tempo } = MedidorPerformance.medirTempo(() => 
        selectionSort.ordenar(dados)
    );
    
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", selectionSort.getEstatisticas());
    console.log("Estável:", selectionSort.isEstavel() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 4: INSERTION SORT ====================

/**
 * EXERCÍCIO 4: Implementar Insertion Sort
 * Dificuldade: Fácil
 * 
 * Descrição: Implemente o algoritmo Insertion Sort. Constrói a sequência
 * ordenada elemento por elemento, inserindo cada novo elemento na posição correta.
 */

class InsertionSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];
        const n = resultado.length;

        for (let i = 1; i < n; i++) {
            const chave = resultado[i];
            let j = i - 1;
            
            while (j >= 0 && this.comparar(resultado[j], chave) > 0) {
                resultado[j + 1] = resultado[j];
                this.trocas++;
                j--;
            }
            
            resultado[j + 1] = chave;
        }

        return resultado;
    }

    getNome(): string { return "Insertion Sort"; }
    getComplexidade(): string { return "O(n²)"; }
    isEstavel(): boolean { return true; }
}

function exercicio4(): void {
    console.log("\n=== EXERCÍCIO 4: INSERTION SORT ===\n");
    
    const insertionSort = new InsertionSort();
    const dados = [5, 2, 4, 6, 1, 3];
    
    console.log("Array original:", dados);
    
    const { resultado, tempo } = MedidorPerformance.medirTempo(() => 
        insertionSort.ordenar(dados)
    );
    
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", insertionSort.getEstatisticas());
    console.log("Estável:", insertionSort.isEstavel() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 5: BUSCA BINÁRIA ====================

/**
 * EXERCÍCIO 5: Implementar Busca Binária
 * Dificuldade: Fácil
 * 
 * Descrição: Implemente o algoritmo de busca binária para arrays ordenados.
 * O algoritmo divide o array pela metade e compara com o elemento do meio.
 */

class BuscaBinaria extends AlgoritmoBuscaBase<number> {
    buscar(array: number[], elemento: number): number {
        this.resetarEstatisticas();
        let esquerda = 0;
        let direita = array.length - 1;

        while (esquerda <= direita) {
            const meio = Math.floor((esquerda + direita) / 2);
            const comparacao = this.comparar(array[meio], elemento);
            
            if (comparacao === 0) {
                return meio;
            } else if (comparacao < 0) {
                esquerda = meio + 1;
            } else {
                direita = meio - 1;
            }
        }

        return -1;
    }

    getNome(): string { return "Busca Binária"; }
    getComplexidade(): string { return "O(log n)"; }
    requerOrdenado(): boolean { return true; }
}

function exercicio5(): void {
    console.log("\n=== EXERCÍCIO 5: BUSCA BINÁRIA ===\n");
    
    const buscaBinaria = new BuscaBinaria();
    const dados = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const elemento = 7;
    
    console.log("Array ordenado:", dados);
    console.log("Buscando elemento:", elemento);
    
    const { resultado, tempo } = MedidorPerformance.medirTempo(() => 
        buscaBinaria.buscar(dados, elemento)
    );
    
    console.log("Índice encontrado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", buscaBinaria.getEstatisticas());
    console.log("Requer ordenado:", buscaBinaria.requerOrdenado() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 6: COMPARAÇÃO DE ALGORITMOS ====================

/**
 * EXERCÍCIO 6: Comparar diferentes algoritmos de ordenação
 * Dificuldade: Fácil
 * 
 * Descrição: Compare o desempenho dos algoritmos implementados
 * em diferentes tamanhos de arrays.
 */

function exercicio6(): void {
    console.log("\n=== EXERCÍCIO 6: COMPARAÇÃO DE ALGORITMOS ===\n");
    
    const algoritmos = [
        new BubbleSort(),
        new SelectionSort(),
        new InsertionSort()
    ];
    
    const tamanhos = [10, 50, 100];
    
    tamanhos.forEach(tamanho => {
        console.log(`\n--- Array de tamanho ${tamanho} ---`);
        const dados = ArrayUtils.gerarAleatorio(tamanho, 1, 100);
        
        algoritmos.forEach(algoritmo => {
            const { tempo } = MedidorPerformance.medirTempo(() => 
                algoritmo.ordenar(dados)
            );
            
            const stats = algoritmo.getEstatisticas();
            console.log(`${algoritmo.getNome()}: ${tempo.toFixed(4)}ms (${stats.comparacoes} comp., ${stats.trocas} trocas)`);
        });
    });
}

// ==================== EXERCÍCIO 7: ORDENAÇÃO DE STRINGS ====================

/**
 * EXERCÍCIO 7: Ordenar array de strings
 * Dificuldade: Fácil
 * 
 * Descrição: Adapte o Bubble Sort para ordenar strings alfabeticamente.
 */

class BubbleSortStrings extends AlgoritmoOrdenacaoBase<string> {
    ordenar(array: string[]): string[] {
        this.resetarEstatisticas();
        const resultado = [...array];
        const n = resultado.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.comparar(resultado[j], resultado[j + 1]) > 0) {
                    this.trocar(resultado, j, j + 1);
                }
            }
        }

        return resultado;
    }

    getNome(): string { return "Bubble Sort (Strings)"; }
    getComplexidade(): string { return "O(n²)"; }
    isEstavel(): boolean { return true; }
}

function exercicio7(): void {
    console.log("\n=== EXERCÍCIO 7: ORDENAÇÃO DE STRINGS ===\n");
    
    const bubbleSortStrings = new BubbleSortStrings();
    const nomes = ["João", "Ana", "Carlos", "Beatriz", "Daniel"];
    
    console.log("Array original:", nomes);
    
    const { resultado, tempo } = MedidorPerformance.medirTempo(() => 
        bubbleSortStrings.ordenar(nomes)
    );
    
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", bubbleSortStrings.getEstatisticas());
}

// ==================== EXERCÍCIO 8: VERIFICAR SE ARRAY ESTÁ ORDENADO ====================

/**
 * EXERCÍCIO 8: Verificar se um array está ordenado
 * Dificuldade: Fácil
 * 
 * Descrição: Implemente uma função que verifica se um array está ordenado
 * em ordem crescente.
 */

class VerificadorOrdenacao {
    static verificarOrdenado<T>(array: T[]): boolean {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                return false;
            }
        }
        return true;
    }

    static encontrarPrimeiroElementoForaDeOrdem<T>(array: T[]): number {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                return i;
            }
        }
        return -1; // Array está ordenado
    }
}

function exercicio8(): void {
    console.log("\n=== EXERCÍCIO 8: VERIFICAR ORDENAÇÃO ===\n");
    
    const arrays = [
        [1, 2, 3, 4, 5],
        [5, 2, 3, 4, 1],
        [1, 2, 5, 3, 4],
        []
    ];
    
    arrays.forEach((array, index) => {
        console.log(`Array ${index + 1}: [${array.join(', ')}]`);
        const ordenado = VerificadorOrdenacao.verificarOrdenado(array);
        console.log(`Está ordenado: ${ordenado ? "Sim" : "Não"}`);
        
        if (!ordenado && array.length > 0) {
            const indiceProblema = VerificadorOrdenacao.encontrarPrimeiroElementoForaDeOrdem(array);
            console.log(`Primeiro elemento fora de ordem no índice: ${indiceProblema}`);
        }
        console.log("");
    });
}

// ==================== EXERCÍCIO 9: BUSCAR MÚLTIPLAS OCORRÊNCIAS ====================

/**
 * EXERCÍCIO 9: Buscar todas as ocorrências de um elemento
 * Dificuldade: Fácil
 * 
 * Descrição: Implemente uma função que encontra todos os índices
 * onde um elemento aparece no array.
 */

class BuscaMultipla extends AlgoritmoBuscaBase<number> {
    buscar(array: number[], elemento: number): number {
        // Implementação original retorna apenas um índice
        return this.buscarTodas(array, elemento)[0] || -1;
    }

    buscarTodas(array: number[], elemento: number): number[] {
        this.resetarEstatisticas();
        const indices: number[] = [];
        
        for (let i = 0; i < array.length; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                indices.push(i);
            }
        }
        
        return indices;
    }

    getNome(): string { return "Busca Múltipla"; }
    getComplexidade(): string { return "O(n)"; }
    requerOrdenado(): boolean { return false; }
}

function exercicio9(): void {
    console.log("\n=== EXERCÍCIO 9: BUSCA MÚLTIPLAS OCORRÊNCIAS ===\n");
    
    const buscaMultipla = new BuscaMultipla();
    const dados = [1, 3, 7, 3, 9, 3, 11, 3];
    const elemento = 3;
    
    console.log("Array:", dados);
    console.log("Buscando elemento:", elemento);
    
    const { resultado, tempo } = MedidorPerformance.medirTempo(() => 
        buscaMultipla.buscarTodas(dados, elemento)
    );
    
    console.log("Índices encontrados:", resultado);
    console.log("Total de ocorrências:", resultado.length);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", buscaMultipla.getEstatisticas());
}

// ==================== EXERCÍCIO 10: ORDENAÇÃO COM CONTAGEM DE OPERAÇÕES ====================

/**
 * EXERCÍCIO 10: Análise detalhada de operações
 * Dificuldade: Fácil
 * 
 * Descrição: Execute diferentes algoritmos e compare o número de operações
 * realizadas em diferentes cenários (melhor, médio e pior caso).
 */

function exercicio10(): void {
    console.log("\n=== EXERCÍCIO 10: ANÁLISE DE OPERAÇÕES ===\n");
    
    const algoritmos = [
        new BubbleSort(),
        new SelectionSort(),
        new InsertionSort()
    ];
    
    const cenarios = [
        { nome: "Melhor Caso (já ordenado)", dados: ArrayUtils.gerarSequencial(1, 20) },
        { nome: "Caso Médio (aleatório)", dados: ArrayUtils.gerarAleatorio(20, 1, 20) },
        { nome: "Pior Caso (inversamente ordenado)", dados: ArrayUtils.gerarInverso(20) }
    ];
    
    cenarios.forEach(cenario => {
        console.log(`\n--- ${cenario.nome} ---`);
        console.log("Dados:", cenario.dados);
        
        algoritmos.forEach(algoritmo => {
            const { tempo } = MedidorPerformance.medirTempo(() => 
                algoritmo.ordenar(cenario.dados)
            );
            
            const stats = algoritmo.getEstatisticas();
            console.log(`${algoritmo.getNome()}:`);
            console.log(`  Tempo: ${tempo.toFixed(4)}ms`);
            console.log(`  Comparações: ${stats.comparacoes}`);
            console.log(`  Trocas: ${stats.trocas}`);
        });
    });
}

// ==================== EXECUÇÃO DOS EXERCÍCIOS ====================

function executarExerciciosFaceis(): void {
    console.log("🎯 EXERCÍCIOS FÁCEIS DE BUSCA E ORDENAÇÃO\n");
    console.log("=========================================\n");
    
    exercicio1();
    exercicio2();
    exercicio3();
    exercicio4();
    exercicio5();
    exercicio6();
    exercicio7();
    exercicio8();
    exercicio9();
    exercicio10();
    
    console.log("\n✅ Todos os exercícios fáceis foram executados!");
}

// Exportar para uso em outros módulos
export {
    BubbleSort,
    BuscaLinear,
    SelectionSort,
    InsertionSort,
    BuscaBinaria,
    BubbleSortStrings,
    VerificadorOrdenacao,
    BuscaMultipla,
    executarExerciciosFaceis
};

// Executar se for o arquivo principal
if (require.main === module) {
    executarExerciciosFaceis();
}