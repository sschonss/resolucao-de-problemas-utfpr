"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadixSort = exports.ArvoreBinariaBusca = exports.CountingSort = exports.BuscaInterpolacao = exports.HeapSort = exports.ShellSort = exports.QuickSort = exports.MergeSort = void 0;
exports.executarExerciciosMedios = executarExerciciosMedios;
const classes_base_1 = require("../base/classes-base");
// ==================== EXERCÍCIO 1: MERGE SORT ====================
/**
 * EXERCÍCIO 1: Implementar Merge Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Merge Sort, que divide o array em metades
 * recursivamente e depois mescla as metades ordenadas.
 */
class MergeSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
        this.resetarEstatisticas();
        const resultado = [...array];
        this.mergeSort(resultado, 0, resultado.length - 1);
        return resultado;
    }
    mergeSort(array, esquerda, direita) {
        if (esquerda < direita) {
            const meio = Math.floor((esquerda + direita) / 2);
            this.mergeSort(array, esquerda, meio);
            this.mergeSort(array, meio + 1, direita);
            this.mesclar(array, esquerda, meio, direita);
        }
    }
    mesclar(array, esquerda, meio, direita) {
        const n1 = meio - esquerda + 1;
        const n2 = direita - meio;
        const esquerdaArray = array.slice(esquerda, meio + 1);
        const direitaArray = array.slice(meio + 1, direita + 1);
        let i = 0, j = 0, k = esquerda;
        while (i < n1 && j < n2) {
            if (this.comparar(esquerdaArray[i], direitaArray[j]) <= 0) {
                array[k] = esquerdaArray[i];
                i++;
            }
            else {
                array[k] = direitaArray[j];
                j++;
            }
            k++;
        }
        while (i < n1) {
            array[k] = esquerdaArray[i];
            i++;
            k++;
        }
        while (j < n2) {
            array[k] = direitaArray[j];
            j++;
            k++;
        }
    }
    getNome() { return "Merge Sort"; }
    getComplexidade() { return "O(n log n)"; }
    isEstavel() { return true; }
}
exports.MergeSort = MergeSort;
function exercicio1() {
    console.log("=== EXERCÍCIO 1: MERGE SORT ===\n");
    const mergeSort = new MergeSort();
    const dados = [38, 27, 43, 3, 9, 82, 10];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => mergeSort.ordenar(dados));
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", mergeSort.getEstatisticas());
    console.log("Complexidade:", mergeSort.getComplexidade());
    console.log("Estável:", mergeSort.isEstavel() ? "Sim" : "Não");
}
// ==================== EXERCÍCIO 2: QUICK SORT ====================
/**
 * EXERCÍCIO 2: Implementar Quick Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Quick Sort usando o método de partição Lomuto.
 * Escolha o último elemento como pivô.
 */
class QuickSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
        this.resetarEstatisticas();
        const resultado = [...array];
        this.quickSort(resultado, 0, resultado.length - 1);
        return resultado;
    }
    quickSort(array, baixo, alto) {
        if (baixo < alto) {
            const indicePivo = this.particionar(array, baixo, alto);
            this.quickSort(array, baixo, indicePivo - 1);
            this.quickSort(array, indicePivo + 1, alto);
        }
    }
    particionar(array, baixo, alto) {
        const pivo = array[alto];
        let i = baixo - 1;
        for (let j = baixo; j < alto; j++) {
            if (this.comparar(array[j], pivo) <= 0) {
                i++;
                this.trocar(array, i, j);
            }
        }
        this.trocar(array, i + 1, alto);
        return i + 1;
    }
    getNome() { return "Quick Sort"; }
    getComplexidade() { return "O(n log n) médio, O(n²) pior caso"; }
    isEstavel() { return false; }
}
exports.QuickSort = QuickSort;
function exercicio2() {
    console.log("\n=== EXERCÍCIO 2: QUICK SORT ===\n");
    const quickSort = new QuickSort();
    const dados = [10, 7, 8, 9, 1, 5];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => quickSort.ordenar(dados));
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", quickSort.getEstatisticas());
    console.log("Complexidade:", quickSort.getComplexidade());
    console.log("Estável:", quickSort.isEstavel() ? "Sim" : "Não");
}
// ==================== EXERCÍCIO 3: SHELL SORT ====================
/**
 * EXERCÍCIO 3: Implementar Shell Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Shell Sort usando a sequência de intervalos
 * de Knuth (3n + 1).
 */
class ShellSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
        this.resetarEstatisticas();
        const resultado = [...array];
        const n = resultado.length;
        // Sequência de Knuth: 3n + 1
        let intervalo = 1;
        while (intervalo < n / 3) {
            intervalo = intervalo * 3 + 1;
        }
        while (intervalo >= 1) {
            for (let i = intervalo; i < n; i++) {
                const temp = resultado[i];
                let j = i;
                while (j >= intervalo && this.comparar(resultado[j - intervalo], temp) > 0) {
                    resultado[j] = resultado[j - intervalo];
                    j -= intervalo;
                    this.trocas++;
                }
                resultado[j] = temp;
            }
            intervalo = Math.floor(intervalo / 3);
        }
        return resultado;
    }
    getNome() { return "Shell Sort"; }
    getComplexidade() { return "O(n log² n)"; }
    isEstavel() { return false; }
}
exports.ShellSort = ShellSort;
function exercicio3() {
    console.log("\n=== EXERCÍCIO 3: SHELL SORT ===\n");
    const shellSort = new ShellSort();
    const dados = [23, 29, 15, 19, 31, 7, 9, 5, 2];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => shellSort.ordenar(dados));
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", shellSort.getEstatisticas());
    console.log("Complexidade:", shellSort.getComplexidade());
    console.log("Estável:", shellSort.isEstavel() ? "Sim" : "Não");
}
// ==================== EXERCÍCIO 4: HEAP SORT ====================
/**
 * EXERCÍCIO 4: Implementar Heap Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Heap Sort. Primeiro construa um max-heap,
 * depois extraia elementos um por um.
 */
class HeapSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
        this.resetarEstatisticas();
        const resultado = [...array];
        const n = resultado.length;
        // Construir max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(resultado, n, i);
        }
        // Extrair elementos do heap um por um
        for (let i = n - 1; i > 0; i--) {
            this.trocar(resultado, 0, i);
            this.heapify(resultado, i, 0);
        }
        return resultado;
    }
    heapify(array, n, i) {
        let maior = i;
        const esquerda = 2 * i + 1;
        const direita = 2 * i + 2;
        if (esquerda < n && this.comparar(array[esquerda], array[maior]) > 0) {
            maior = esquerda;
        }
        if (direita < n && this.comparar(array[direita], array[maior]) > 0) {
            maior = direita;
        }
        if (maior !== i) {
            this.trocar(array, i, maior);
            this.heapify(array, n, maior);
        }
    }
    getNome() { return "Heap Sort"; }
    getComplexidade() { return "O(n log n)"; }
    isEstavel() { return false; }
}
exports.HeapSort = HeapSort;
function exercicio4() {
    console.log("\n=== EXERCÍCIO 4: HEAP SORT ===\n");
    const heapSort = new HeapSort();
    const dados = [12, 11, 13, 5, 6, 7];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => heapSort.ordenar(dados));
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", heapSort.getEstatisticas());
    console.log("Complexidade:", heapSort.getComplexidade());
    console.log("Estável:", heapSort.isEstavel() ? "Sim" : "Não");
}
// ==================== EXERCÍCIO 5: BUSCA INTERPOLAÇÃO ====================
/**
 * EXERCÍCIO 5: Implementar Busca por Interpolação
 * Dificuldade: Médio
 *
 * Descrição: Implemente a busca por interpolação, que estima a posição
 * do elemento baseado em seu valor, assumindo distribuição uniforme.
 */
class BuscaInterpolacao extends classes_base_1.AlgoritmoBuscaBase {
    buscar(array, elemento) {
        this.resetarEstatisticas();
        let baixo = 0;
        let alto = array.length - 1;
        while (baixo <= alto && elemento >= array[baixo] && elemento <= array[alto]) {
            if (baixo === alto) {
                if (this.comparar(array[baixo], elemento) === 0) {
                    return baixo;
                }
                return -1;
            }
            // Fórmula de interpolação
            const pos = baixo + Math.floor(((elemento - array[baixo]) * (alto - baixo)) /
                (array[alto] - array[baixo]));
            if (this.comparar(array[pos], elemento) === 0) {
                return pos;
            }
            if (this.comparar(array[pos], elemento) < 0) {
                baixo = pos + 1;
            }
            else {
                alto = pos - 1;
            }
        }
        return -1;
    }
    getNome() { return "Busca por Interpolação"; }
    getComplexidade() { return "O(log log n) médio"; }
    requerOrdenado() { return true; }
}
exports.BuscaInterpolacao = BuscaInterpolacao;
function exercicio5() {
    console.log("\n=== EXERCÍCIO 5: BUSCA POR INTERPOLAÇÃO ===\n");
    const buscaInterpolacao = new BuscaInterpolacao();
    const dados = [10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47];
    const elemento = 18;
    console.log("Array ordenado:", dados);
    console.log("Buscando elemento:", elemento);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => buscaInterpolacao.buscar(dados, elemento));
    console.log("Índice encontrado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", buscaInterpolacao.getEstatisticas());
    console.log("Requer ordenado:", buscaInterpolacao.requerOrdenado() ? "Sim" : "Não");
}
// ==================== EXERCÍCIO 6: ORDENAÇÃO POR CONTAGEM ====================
/**
 * EXERCÍCIO 6: Implementar Counting Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Counting Sort para arrays de números inteiros
 * não negativos. O algoritmo conta ocorrências de cada elemento.
 */
class CountingSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
        this.resetarEstatisticas();
        const resultado = [...array];
        if (resultado.length === 0)
            return resultado;
        // Encontrar o valor máximo
        const max = Math.max(...resultado);
        // Inicializar array de contagem
        const contagem = new Array(max + 1).fill(0);
        // Contar ocorrências
        for (const num of resultado) {
            contagem[num]++;
        }
        // Reconstruir array ordenado
        let indice = 0;
        for (let i = 0; i <= max; i++) {
            while (contagem[i] > 0) {
                resultado[indice] = i;
                indice++;
                contagem[i]--;
            }
        }
        return resultado;
    }
    getNome() { return "Counting Sort"; }
    getComplexidade() { return "O(n + k)"; }
    isEstavel() { return true; }
}
exports.CountingSort = CountingSort;
function exercicio6() {
    console.log("\n=== EXERCÍCIO 6: COUNTING SORT ===\n");
    const countingSort = new CountingSort();
    const dados = [4, 2, 2, 8, 3, 3, 1];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => countingSort.ordenar(dados));
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", countingSort.getEstatisticas());
    console.log("Complexidade:", countingSort.getComplexidade());
    console.log("Estável:", countingSort.isEstavel() ? "Sim" : "Não");
}
// ==================== EXERCÍCIO 7: BUSCA EM ÁRVORE BINÁRIA ====================
/**
 * EXERCÍCIO 7: Implementar busca em árvore binária de busca
 * Dificuldade: Médio
 *
 * Descrição: Implemente uma classe para árvore binária de busca (BST)
 * e métodos para inserção e busca.
 */
class NoArvore {
    constructor(valor, esquerda = null, direita = null) {
        this.valor = valor;
        this.esquerda = esquerda;
        this.direita = direita;
    }
}
class ArvoreBinariaBusca {
    constructor() {
        this.raiz = null;
    }
    inserir(valor) {
        this.raiz = this.inserirRecursivo(this.raiz, valor);
    }
    inserirRecursivo(no, valor) {
        if (no === null) {
            return new NoArvore(valor);
        }
        if (valor < no.valor) {
            no.esquerda = this.inserirRecursivo(no.esquerda, valor);
        }
        else if (valor > no.valor) {
            no.direita = this.inserirRecursivo(no.direita, valor);
        }
        return no;
    }
    buscar(valor) {
        return this.buscarRecursivo(this.raiz, valor);
    }
    buscarRecursivo(no, valor) {
        if (no === null) {
            return false;
        }
        if (valor === no.valor) {
            return true;
        }
        if (valor < no.valor) {
            return this.buscarRecursivo(no.esquerda, valor);
        }
        else {
            return this.buscarRecursivo(no.direita, valor);
        }
    }
    emOrdem() {
        const resultado = [];
        this.emOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }
    emOrdemRecursivo(no, resultado) {
        if (no !== null) {
            this.emOrdemRecursivo(no.esquerda, resultado);
            resultado.push(no.valor);
            this.emOrdemRecursivo(no.direita, resultado);
        }
    }
}
exports.ArvoreBinariaBusca = ArvoreBinariaBusca;
function exercicio7() {
    console.log("\n=== EXERCÍCIO 7: ÁRVORE BINÁRIA DE BUSCA ===\n");
    const bst = new ArvoreBinariaBusca();
    const valores = [50, 30, 20, 40, 70, 60, 80];
    console.log("Inserindo valores:", valores);
    valores.forEach(valor => bst.inserir(valor));
    console.log("Árvore em ordem:", bst.emOrdem());
    const buscarValores = [40, 90, 60, 25];
    buscarValores.forEach(valor => {
        const encontrado = bst.buscar(valor);
        console.log(`Buscar ${valor}: ${encontrado ? "Encontrado" : "Não encontrado"}`);
    });
}
// ==================== EXERCÍCIO 8: ORDENAÇÃO RADIX ====================
/**
 * EXERCÍCIO 8: Implementar Radix Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Radix Sort usando counting sort
 * como subroutine para cada dígito.
 */
class RadixSort extends classes_base_1.AlgoritmoOrdenacaoBase {
    ordenar(array) {
        this.resetarEstatisticas();
        const resultado = [...array];
        if (resultado.length === 0)
            return resultado;
        // Encontrar o número máximo para determinar o número de dígitos
        const max = Math.max(...resultado);
        const maxDigitos = Math.floor(Math.log10(max)) + 1;
        // Aplicar counting sort para cada dígito
        for (let digito = 0; digito < maxDigitos; digito++) {
            this.countingSortPorDigito(resultado, digito);
        }
        return resultado;
    }
    countingSortPorDigito(array, digito) {
        const n = array.length;
        const saida = new Array(n);
        const contagem = new Array(10).fill(0);
        // Contar ocorrências do dígito atual
        for (let i = 0; i < n; i++) {
            const digitoValor = this.obterDigito(array[i], digito);
            contagem[digitoValor]++;
        }
        // Calcular posições cumulativas
        for (let i = 1; i < 10; i++) {
            contagem[i] += contagem[i - 1];
        }
        // Construir array de saída
        for (let i = n - 1; i >= 0; i--) {
            const digitoValor = this.obterDigito(array[i], digito);
            saida[contagem[digitoValor] - 1] = array[i];
            contagem[digitoValor]--;
        }
        // Copiar saída de volta para o array original
        for (let i = 0; i < n; i++) {
            array[i] = saida[i];
        }
    }
    obterDigito(numero, posicao) {
        return Math.floor(Math.abs(numero) / Math.pow(10, posicao)) % 10;
    }
    getNome() { return "Radix Sort"; }
    getComplexidade() { return "O(n * d)"; }
    isEstavel() { return true; }
}
exports.RadixSort = RadixSort;
function exercicio8() {
    console.log("\n=== EXERCÍCIO 8: RADIX SORT ===\n");
    const radixSort = new RadixSort();
    const dados = [170, 45, 75, 90, 802, 24, 2, 66];
    console.log("Array original:", dados);
    const { resultado, tempo } = classes_base_1.MedidorPerformance.medirTempo(() => radixSort.ordenar(dados));
    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", radixSort.getEstatisticas());
    console.log("Complexidade:", radixSort.getComplexidade());
    console.log("Estável:", radixSort.isEstavel() ? "Sim" : "Não");
}
// ==================== EXECUÇÃO DOS EXERCÍCIOS ====================
function executarExerciciosMedios() {
    console.log("🎯 EXERCÍCIOS MÉDIOS DE BUSCA E ORDENAÇÃO\n");
    console.log("=========================================\n");
    exercicio1();
    exercicio2();
    exercicio3();
    exercicio4();
    exercicio5();
    exercicio6();
    exercicio7();
    exercicio8();
    console.log("\n✅ Todos os exercícios médios foram executados!");
}
