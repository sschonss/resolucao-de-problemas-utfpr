"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JogoMemoria = exports.AnalisadorOrdenacao = exports.BuscaLinearOtimizada = exports.SelectionSortRecursivo = exports.BuscaMultipla = exports.VerificadorOrdenacao = exports.BubbleSortStrings = exports.BuscaBinaria = exports.InsertionSort = exports.SelectionSort = exports.BuscaLinear = exports.BubbleSort = void 0;
exports.executarExerciciosFaceis = executarExerciciosFaceis;
const classes_base_1 = require("../base/classes-base");
// ==================== EXERCÍCIO 1: BUBBLE SORT BÁSICO ====================
/**
 * EXERCÍCIO 1: Implementar Bubble Sort
 * Dificuldade: Fácil
 *
 * Descrição: Implemente o algoritmo Bubble Sort para ordenar um array de números.
 * O Bubble Sort compara elementos adjacentes e os troca se estiverem fora de ordem.
 */
class BubbleSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
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
            if (!houveTroca)
                break;
        }
        return resultado;
    }
    getNome() { return "Bubble Sort"; }
    getComplexidade() { return "O(n²)"; }
    isEstavel() { return true; }
}
exports.BubbleSort = BubbleSort;
function exercicio1() {
    console.log("=== EXERCÍCIO 1: BUBBLE SORT ===\n");
    const bubbleSort = new BubbleSort();
    const dados = [64, 34, 25, 12, 22, 11, 90];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => bubbleSort.ordenar(dados));
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
class BuscaLinear extends classes_base_1.AlgoritmoBuscaBase {
    buscar(array, elemento) {
        this.resetarEstatisticas();
        for (let i = 0; i < array.length; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                return i;
            }
        }
        return -1;
    }
    getNome() { return "Busca Linear"; }
    getComplexidade() { return "O(n)"; }
    requerOrdenado() { return false; }
}
exports.BuscaLinear = BuscaLinear;
function exercicio2() {
    console.log("\n=== EXERCÍCIO 2: BUSCA LINEAR ===\n");
    const buscaLinear = new BuscaLinear();
    const dados = [64, 34, 25, 12, 22, 11, 90];
    const elemento = 22;
    console.log("Array:", dados);
    console.log("Buscando elemento:", elemento);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => buscaLinear.buscar(dados, elemento));
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
class SelectionSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
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
    getNome() { return "Selection Sort"; }
    getComplexidade() { return "O(n²)"; }
    isEstavel() { return false; }
}
exports.SelectionSort = SelectionSort;
function exercicio3() {
    console.log("\n=== EXERCÍCIO 3: SELECTION SORT ===\n");
    const selectionSort = new SelectionSort();
    const dados = [29, 10, 14, 37, 13];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => selectionSort.ordenar(dados));
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
class InsertionSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
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
    getNome() { return "Insertion Sort"; }
    getComplexidade() { return "O(n²)"; }
    isEstavel() { return true; }
}
exports.InsertionSort = InsertionSort;
function exercicio4() {
    console.log("\n=== EXERCÍCIO 4: INSERTION SORT ===\n");
    const insertionSort = new InsertionSort();
    const dados = [5, 2, 4, 6, 1, 3];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => insertionSort.ordenar(dados));
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
class BuscaBinaria extends classes_base_1.AlgoritmoBuscaBase {
    buscar(array, elemento) {
        this.resetarEstatisticas();
        let esquerda = 0;
        let direita = array.length - 1;
        while (esquerda <= direita) {
            const meio = Math.floor((esquerda + direita) / 2);
            const comparacao = this.comparar(array[meio], elemento);
            if (comparacao === 0) {
                return meio;
            }
            else if (comparacao < 0) {
                esquerda = meio + 1;
            }
            else {
                direita = meio - 1;
            }
        }
        return -1;
    }
    getNome() { return "Busca Binária"; }
    getComplexidade() { return "O(log n)"; }
    requerOrdenado() { return true; }
}
exports.BuscaBinaria = BuscaBinaria;
function exercicio5() {
    console.log("\n=== EXERCÍCIO 5: BUSCA BINÁRIA ===\n");
    const buscaBinaria = new BuscaBinaria();
    const dados = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const elemento = 7;
    console.log("Array ordenado:", dados);
    console.log("Buscando elemento:", elemento);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => buscaBinaria.buscar(dados, elemento));
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
function exercicio6() {
    console.log("\n=== EXERCÍCIO 6: COMPARAÇÃO DE ALGORITMOS ===\n");
    const algoritmos = [
        new BubbleSort(),
        new SelectionSort(),
        new InsertionSort()
    ];
    const tamanhos = [10, 50, 100];
    tamanhos.forEach(tamanho => {
        console.log(`\n--- Array de tamanho ${tamanho} ---`);
        const dados = classes_base_1.ArrayUtils.gerarAleatorio(tamanho, 1, 100);
        algoritmos.forEach(algoritmo => {
            const { tempo } = classes_base_1.MedidorPerformance.medirTempo(() => algoritmo.ordenar(dados));
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
class BubbleSortStrings extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
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
    getNome() { return "Bubble Sort (Strings)"; }
    getComplexidade() { return "O(n²)"; }
    isEstavel() { return true; }
}
exports.BubbleSortStrings = BubbleSortStrings;
function exercicio7() {
    console.log("\n=== EXERCÍCIO 7: ORDENAÇÃO DE STRINGS ===\n");
    const bubbleSortStrings = new BubbleSortStrings();
    const nomes = ["João", "Ana", "Carlos", "Beatriz", "Daniel"];
    console.log("Array original:", nomes);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => bubbleSortStrings.ordenar(nomes));
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
    static verificarOrdenado(array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                return false;
            }
        }
        return true;
    }
    static encontrarPrimeiroElementoForaDeOrdem(array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                return i;
            }
        }
        return -1; // Array está ordenado
    }
}
exports.VerificadorOrdenacao = VerificadorOrdenacao;
function exercicio8() {
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
class BuscaMultipla extends classes_base_1.AlgoritmoBuscaBase {
    buscar(array, elemento) {
        // Implementação original retorna apenas um índice
        return this.buscarTodas(array, elemento)[0] || -1;
    }
    buscarTodas(array, elemento) {
        this.resetarEstatisticas();
        const indices = [];
        for (let i = 0; i < array.length; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                indices.push(i);
            }
        }
        return indices;
    }
    getNome() { return "Busca Múltipla"; }
    getComplexidade() { return "O(n)"; }
    requerOrdenado() { return false; }
}
exports.BuscaMultipla = BuscaMultipla;
function exercicio9() {
    console.log("\n=== EXERCÍCIO 9: BUSCA MÚLTIPLAS OCORRÊNCIAS ===\n");
    const buscaMultipla = new BuscaMultipla();
    const dados = [1, 3, 7, 3, 9, 3, 11, 3];
    const elemento = 3;
    console.log("Array:", dados);
    console.log("Buscando elemento:", elemento);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => buscaMultipla.buscarTodas(dados, elemento));
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
function exercicio10() {
    console.log("\n=== EXERCÍCIO 10: ANÁLISE DE OPERAÇÕES ===\n");
    const algoritmos = [
        new BubbleSort(),
        new SelectionSort(),
        new InsertionSort()
    ];
    const cenarios = [
        { nome: "Melhor Caso (já ordenado)", dados: classes_base_1.ArrayUtils.gerarSequencial(1, 20) },
        { nome: "Caso Médio (aleatório)", dados: classes_base_1.ArrayUtils.gerarAleatorio(20, 1, 20) },
        { nome: "Pior Caso (inversamente ordenado)", dados: classes_base_1.ArrayUtils.gerarInverso(20) }
    ];
    cenarios.forEach(cenario => {
        console.log(`\n--- ${cenario.nome} ---`);
        console.log("Dados:", cenario.dados);
        algoritmos.forEach(algoritmo => {
            const { tempo } = classes_base_1.MedidorPerformance.medirTempo(() => algoritmo.ordenar(cenario.dados));
            const stats = algoritmo.getEstatisticas();
            console.log(`${algoritmo.getNome()}:`);
            console.log(`  Tempo: ${tempo.toFixed(4)}ms`);
            console.log(`  Comparações: ${stats.comparacoes}`);
            console.log(`  Trocas: ${stats.trocas}`);
        });
    });
}
// ==================== EXERCÍCIO 11: ORDENAÇÃO POR SELEÇÃO RECURSIVA ====================
/**
 * EXERCÍCIO 11: Implementar Selection Sort Recursivo
 * Dificuldade: Fácil
 *
 * Descrição: Implemente uma versão recursiva do Selection Sort.
 * Encontre o menor elemento e coloque na posição correta recursivamente.
 */
class SelectionSortRecursivo extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
        this.resetarEstatisticas();
        const resultado = [...array];
        this.selectionSortRecursivo(resultado, 0);
        return resultado;
    }
    selectionSortRecursivo(array, inicio) {
        if (inicio >= array.length - 1)
            return;
        // Encontrar índice do menor elemento
        let menorIndice = inicio;
        for (let i = inicio + 1; i < array.length; i++) {
            if (this.comparar(array[i], array[menorIndice]) < 0) {
                menorIndice = i;
            }
        }
        // Trocar com o primeiro elemento não ordenado
        if (menorIndice !== inicio) {
            this.trocar(array, inicio, menorIndice);
        }
        // Chamada recursiva para o resto do array
        this.selectionSortRecursivo(array, inicio + 1);
    }
    getNome() { return "Selection Sort Recursivo"; }
    getComplexidade() { return "O(n²)"; }
    isEstavel() { return false; }
}
exports.SelectionSortRecursivo = SelectionSortRecursivo;
function exercicio11() {
    console.log("\n=== EXERCÍCIO 11: SELECTION SORT RECURSIVO ===\n");
    const selectionSortRec = new SelectionSortRecursivo();
    const dados = [64, 25, 12, 22, 11];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => selectionSortRec.ordenar(dados));
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", selectionSortRec.getEstatisticas());
    console.log("Complexidade:", selectionSortRec.getComplexidade());
    console.log("Estável:", selectionSortRec.isEstavel() ? "Sim" : "Não");
}
// ==================== EXERCÍCIO 12: BUSCA LINEAR MELHORADA ====================
/**
 * EXERCÍCIO 12: Implementar Busca Linear com Otimizações
 * Dificuldade: Fácil
 *
 * Descrição: Implemente uma busca linear que guarda a última posição encontrada
 * para otimizar buscas subsequentes pelo mesmo elemento.
 */
class BuscaLinearOtimizada extends classes_base_1.AlgoritmoBuscaBase {
    constructor() {
        super(...arguments);
        this.ultimaPosicao = -1;
    }
    buscar(array, elemento) {
        this.resetarEstatisticas();
        // Otimização: começar da última posição conhecida
        let inicio = Math.max(0, this.ultimaPosicao - 5); // Buscar em uma janela
        // Busca linear otimizada
        for (let i = inicio; i < array.length; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                this.ultimaPosicao = i;
                return i;
            }
        }
        // Se não encontrou na janela otimizada, buscar do início
        for (let i = 0; i < inicio; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                this.ultimaPosicao = i;
                return i;
            }
        }
        return -1;
    }
    // Método para demonstrar a otimização
    buscarMultiplasVezes(array, elementos) {
        let comparacoesTotais = 0;
        const resultados = [];
        for (const elemento of elementos) {
            this.resetarEstatisticas();
            const indice = this.buscar(array, elemento);
            resultados.push(indice);
            comparacoesTotais += this.getEstatisticas().comparacoes;
        }
        return { resultados, comparacoesTotais };
    }
    getNome() { return "Busca Linear Otimizada"; }
    getComplexidade() { return "O(n) médio, O(1) para elementos próximos"; }
    requerOrdenado() { return false; }
}
exports.BuscaLinearOtimizada = BuscaLinearOtimizada;
function exercicio12() {
    console.log("\n=== EXERCÍCIO 12: BUSCA LINEAR OTIMIZADA ===\n");
    const buscaOtimizada = new BuscaLinearOtimizada();
    const dados = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    // Simular buscas por elementos próximos
    const elementosParaBuscar = [30, 35, 40, 45, 50, 55, 60];
    console.log("Array:", dados);
    console.log("Buscando elementos:", elementosParaBuscar);
    const { resultados, comparacoesTotais } = buscaOtimizada.buscarMultiplasVezes(dados, elementosParaBuscar);
    console.log("Resultados das buscas:", resultados);
    console.log("Comparações totais:", comparacoesTotais);
    console.log("Comparações médias por busca:", (comparacoesTotais / elementosParaBuscar.length).toFixed(2));
}
// ==================== EXERCÍCIO 13: VERIFICADOR DE ORDENAÇÃO COM ANÁLISE ====================
/**
 * EXERCÍCIO 13: Verificar ordenação com análise detalhada
 * Dificuldade: Fácil
 *
 * Descrição: Implemente um verificador que não só verifica se um array está ordenado,
 * mas também identifica o tipo de ordenação e possíveis problemas.
 */
class AnalisadorOrdenacao {
    static analisarOrdenacao(array) {
        if (array.length <= 1) {
            return {
                ordenado: true,
                tipo: 'crescente',
                estatisticas: { trocasNecessarias: 0, elementosForaOrdem: 0 }
            };
        }
        let crescente = true;
        let decrescente = true;
        let primeiroErro;
        let elementosForaOrdem = 0;
        let trocasNecessarias = 0;
        // Verificar ordenação e contar problemas
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                crescente = false;
                elementosForaOrdem++;
                if (primeiroErro === undefined) {
                    primeiroErro = i;
                }
            }
            if (array[i] > array[i - 1]) {
                decrescente = false;
            }
        }
        // Calcular trocas necessárias (usando algoritmo de contagem de inversões simplificado)
        const arrayOrdenado = [...array].sort((a, b) => a - b);
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== arrayOrdenado[i]) {
                trocasNecessarias++;
            }
        }
        let tipo;
        if (crescente) {
            tipo = 'crescente';
        }
        else if (decrescente) {
            tipo = 'decrescente';
        }
        else {
            tipo = 'desordenado';
        }
        return {
            ordenado: crescente || decrescente,
            tipo,
            primeiroErro,
            estatisticas: { trocasNecessarias, elementosForaOrdem }
        };
    }
    static sugerirAlgoritmo(array) {
        const analise = this.analisarOrdenacao(array);
        if (analise.ordenado) {
            return "Array já está ordenado!";
        }
        const n = array.length;
        const foraOrdem = analise.estatisticas.elementosForaOrdem;
        if (foraOrdem < n * 0.1) {
            return "Use Insertion Sort (poucos elementos fora de ordem)";
        }
        else if (foraOrdem < n * 0.5) {
            return "Use Quick Sort ou Merge Sort (desordem moderada)";
        }
        else {
            return "Use Heap Sort (muito desordenado)";
        }
    }
}
exports.AnalisadorOrdenacao = AnalisadorOrdenacao;
function exercicio13() {
    console.log("\n=== EXERCÍCIO 13: ANALISADOR DE ORDENAÇÃO ===\n");
    const arrays = [
        { nome: "Ordenado crescente", dados: [1, 2, 3, 4, 5] },
        { nome: "Ordenado decrescente", dados: [5, 4, 3, 2, 1] },
        { nome: "Quase ordenado", dados: [1, 2, 4, 3, 5] },
        { nome: "Muito desordenado", dados: [3, 1, 4, 1, 5, 9, 2, 6] },
        { nome: "Array vazio", dados: [] },
        { nome: "Um elemento", dados: [42] }
    ];
    arrays.forEach(({ nome, dados }) => {
        console.log(`\n--- ${nome} ---`);
        console.log(`Dados: [${dados.join(', ')}]`);
        const analise = AnalisadorOrdenacao.analisarOrdenacao(dados);
        console.log(`Ordenado: ${analise.ordenado ? 'Sim' : 'Não'}`);
        console.log(`Tipo: ${analise.tipo}`);
        if (analise.primeiroErro !== undefined) {
            console.log(`Primeiro erro no índice: ${analise.primeiroErro}`);
        }
        console.log(`Elementos fora de ordem: ${analise.estatisticas.elementosForaOrdem}`);
        console.log(`Trocas necessárias: ${analise.estatisticas.trocasNecessarias}`);
        console.log(`Algoritmo sugerido: ${AnalisadorOrdenacao.sugerirAlgoritmo(dados)}`);
    });
}
// ==================== EXERCÍCIO 14: JOGO DA MEMÓRIA COM ORDENAÇÃO ====================
/**
 * EXERCÍCIO 14: Jogo da Memória com Estratégias de Ordenação
 * Dificuldade: Fácil
 *
 * Descrição: Implemente um jogo da memória onde os jogadores precisam
 * organizar cartas em ordem crescente usando diferentes algoritmos.
 */
class JogoMemoria {
    constructor(tamanho = 8, algoritmo) {
        this.cartas = [];
        this.cartasViradas = new Set();
        this.algoritmo = algoritmo || new BubbleSort();
        this.gerarCartas(tamanho);
    }
    gerarCartas(tamanho) {
        // Gerar pares de cartas
        const numPares = Math.floor(tamanho / 2);
        for (let i = 1; i <= numPares; i++) {
            this.cartas.push(i, i); // Dois de cada número
        }
        // Embaralhar
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }
    virarCarta(posicao) {
        if (posicao < 0 || posicao >= this.cartas.length || this.cartasViradas.has(posicao)) {
            throw new Error("Posição inválida ou carta já virada");
        }
        const valor = this.cartas[posicao];
        this.cartasViradas.add(posicao);
        // Verificar se encontrou par
        let parEncontrado = false;
        const cartasComMesmoValor = Array.from(this.cartasViradas)
            .filter(pos => this.cartas[pos] === valor);
        if (cartasComMesmoValor.length === 2) {
            parEncontrado = true;
        }
        const jogoCompleto = this.cartasViradas.size === this.cartas.length;
        return { valor, parEncontrado, jogoCompleto };
    }
    // Método para demonstrar ordenação das cartas encontradas
    ordenarCartasEncontradas() {
        const cartasEncontradas = Array.from(this.cartasViradas)
            .map(pos => this.cartas[pos])
            .filter((valor, index, array) => array.indexOf(valor) === index); // Remover duplicatas
        return this.algoritmo.ordenar(cartasEncontradas);
    }
    getEstadoJogo() {
        const cartasExibidas = this.cartas.map((carta, index) => this.cartasViradas.has(index) ? carta : null);
        const valoresVirados = Array.from(this.cartasViradas).map(pos => this.cartas[pos]);
        const paresEncontrados = Math.floor(valoresVirados.length / 2);
        return {
            cartas: cartasExibidas,
            cartasViradas: Array.from(this.cartasViradas).sort((a, b) => a - b),
            paresEncontrados,
            progresso: (this.cartasViradas.size / this.cartas.length) * 100
        };
    }
    getAlgoritmo() {
        return this.algoritmo.getNome();
    }
}
exports.JogoMemoria = JogoMemoria;
function exercicio14() {
    console.log("\n=== EXERCÍCIO 14: JOGO DA MEMÓRIA COM ORDENAÇÃO ===\n");
    const jogo = new JogoMemoria(8, new InsertionSort());
    console.log(`Jogo criado com algoritmo: ${jogo.getAlgoritmo()}`);
    console.log("Objetivo: Encontrar pares de cartas e organizá-las em ordem crescente\n");
    // Simular algumas jogadas
    const jogadas = [0, 4, 1, 7, 2, 5]; // Simulando jogador encontrando pares
    jogadas.forEach((posicao, index) => {
        try {
            const resultado = jogo.virarCarta(posicao);
            console.log(`Jogada ${index + 1}: Carta na posição ${posicao} = ${resultado.valor}`);
            if (resultado.parEncontrado) {
                console.log("  🎉 Par encontrado!");
                const cartasOrdenadas = jogo.ordenarCartasEncontradas();
                console.log(`  Cartas encontradas ordenadas: [${cartasOrdenadas.join(', ')}]`);
            }
            const estado = jogo.getEstadoJogo();
            console.log(`  Progresso: ${estado.progresso.toFixed(1)}% (${estado.paresEncontrados} pares)`);
            if (resultado.jogoCompleto) {
                console.log("\n🏆 JOGO COMPLETO! Todas as cartas foram encontradas!");
                const finalOrdenadas = jogo.ordenarCartasEncontradas();
                console.log(`Cartas finais ordenadas: [${finalOrdenadas.join(', ')}]`);
            }
            console.log("");
        }
        catch (error) {
            console.log(`  Erro: ${error.message}`);
        }
    });
    console.log("💡 O jogo demonstra como algoritmos de ordenação podem ser aplicados");
    console.log("   em jogos e interfaces interativas para organizar dados dinâmicos!");
}
// ==================== EXECUÇÃO DOS EXERCÍCIOS ====================
function executarExerciciosFaceis() {
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
    exercicio11();
    exercicio12();
    exercicio13();
    exercicio14();
    console.log("\n✅ Todos os exercícios fáceis foram executados!");
}
// Executar exercícios quando o arquivo for executado diretamente
executarExerciciosFaceis();
