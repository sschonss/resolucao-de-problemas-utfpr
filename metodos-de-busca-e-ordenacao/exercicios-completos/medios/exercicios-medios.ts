import {
    AlgoritmoOrdenacaoBase,
    AlgoritmoBuscaBase,
    ColecaoDados,
    ArrayUtils,
    MedidorPerformance,
    ResultadoExercicio
} from '../base/classes-base';

// Função auxiliar para verificar se array está ordenado
function verificarOrdenado(array: number[]): boolean {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            return false;
        }
    }
    return true;
}

// ==================== EXERCÍCIO 1: MERGE SORT ====================

/**
 * EXERCÍCIO 1: Implementar Merge Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Merge Sort, que divide o array em metades
 * recursivamente e depois mescla as metades ordenadas.
 */

class MergeSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];
        this.mergeSort(resultado, 0, resultado.length - 1);
        return resultado;
    }

    private mergeSort(array: number[], esquerda: number, direita: number): void {
        if (esquerda < direita) {
            const meio = Math.floor((esquerda + direita) / 2);

            this.mergeSort(array, esquerda, meio);
            this.mergeSort(array, meio + 1, direita);
            this.mesclar(array, esquerda, meio, direita);
        }
    }

    private mesclar(array: number[], esquerda: number, meio: number, direita: number): void {
        const n1 = meio - esquerda + 1;
        const n2 = direita - meio;

        const esquerdaArray = array.slice(esquerda, meio + 1);
        const direitaArray = array.slice(meio + 1, direita + 1);

        let i = 0, j = 0, k = esquerda;

        while (i < n1 && j < n2) {
            if (this.comparar(esquerdaArray[i], direitaArray[j]) <= 0) {
                array[k] = esquerdaArray[i];
                i++;
            } else {
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

    getNome(): string { return "Merge Sort"; }
    getComplexidade(): string { return "O(n log n)"; }
    isEstavel(): boolean { return true; }
}

function exercicio1(): void {
    console.log("=== EXERCÍCIO 1: MERGE SORT ===\n");

    const mergeSort = new MergeSort();
    const dados = [38, 27, 43, 3, 9, 82, 10];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        mergeSort.ordenar(dados)
    );

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

class QuickSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];
        this.quickSort(resultado, 0, resultado.length - 1);
        return resultado;
    }

    private quickSort(array: number[], baixo: number, alto: number): void {
        if (baixo < alto) {
            const indicePivo = this.particionar(array, baixo, alto);
            this.quickSort(array, baixo, indicePivo - 1);
            this.quickSort(array, indicePivo + 1, alto);
        }
    }

    private particionar(array: number[], baixo: number, alto: number): number {
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

    getNome(): string { return "Quick Sort"; }
    getComplexidade(): string { return "O(n log n) médio, O(n²) pior caso"; }
    isEstavel(): boolean { return false; }
}

function exercicio2(): void {
    console.log("\n=== EXERCÍCIO 2: QUICK SORT ===\n");

    const quickSort = new QuickSort();
    const dados = [10, 7, 8, 9, 1, 5];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        quickSort.ordenar(dados)
    );

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

class ShellSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
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

    getNome(): string { return "Shell Sort"; }
    getComplexidade(): string { return "O(n log² n)"; }
    isEstavel(): boolean { return false; }
}

function exercicio3(): void {
    console.log("\n=== EXERCÍCIO 3: SHELL SORT ===\n");

    const shellSort = new ShellSort();
    const dados = [23, 29, 15, 19, 31, 7, 9, 5, 2];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        shellSort.ordenar(dados)
    );

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

class HeapSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
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

    private heapify(array: number[], n: number, i: number): void {
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

    getNome(): string { return "Heap Sort"; }
    getComplexidade(): string { return "O(n log n)"; }
    isEstavel(): boolean { return false; }
}

function exercicio4(): void {
    console.log("\n=== EXERCÍCIO 4: HEAP SORT ===\n");

    const heapSort = new HeapSort();
    const dados = [12, 11, 13, 5, 6, 7];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        heapSort.ordenar(dados)
    );

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

class BuscaInterpolacao extends AlgoritmoBuscaBase<number> {
    buscar(array: number[], elemento: number): number {
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
            const pos = baixo + Math.floor(
                ((elemento - array[baixo]) * (alto - baixo)) /
                (array[alto] - array[baixo])
            );

            if (this.comparar(array[pos], elemento) === 0) {
                return pos;
            }

            if (this.comparar(array[pos], elemento) < 0) {
                baixo = pos + 1;
            } else {
                alto = pos - 1;
            }
        }

        return -1;
    }

    getNome(): string { return "Busca por Interpolação"; }
    getComplexidade(): string { return "O(log log n) médio"; }
    requerOrdenado(): boolean { return true; }
}

function exercicio5(): void {
    console.log("\n=== EXERCÍCIO 5: BUSCA POR INTERPOLAÇÃO ===\n");

    const buscaInterpolacao = new BuscaInterpolacao();
    const dados = [10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47];
    const elemento = 18;

    console.log("Array ordenado:", dados);
    console.log("Buscando elemento:", elemento);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        buscaInterpolacao.buscar(dados, elemento)
    );

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

class CountingSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];

        if (resultado.length === 0) return resultado;

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

    getNome(): string { return "Counting Sort"; }
    getComplexidade(): string { return "O(n + k)"; }
    isEstavel(): boolean { return true; }
}

function exercicio6(): void {
    console.log("\n=== EXERCÍCIO 6: COUNTING SORT ===\n");

    const countingSort = new CountingSort();
    const dados = [4, 2, 2, 8, 3, 3, 1];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        countingSort.ordenar(dados)
    );

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
    constructor(
        public valor: number,
        public esquerda: NoArvore | null = null,
        public direita: NoArvore | null = null
    ) {}
}

class ArvoreBinariaBusca {
    private raiz: NoArvore | null = null;

    inserir(valor: number): void {
        this.raiz = this.inserirRecursivo(this.raiz, valor);
    }

    private inserirRecursivo(no: NoArvore | null, valor: number): NoArvore {
        if (no === null) {
            return new NoArvore(valor);
        }

        if (valor < no.valor) {
            no.esquerda = this.inserirRecursivo(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this.inserirRecursivo(no.direita, valor);
        }

        return no;
    }

    buscar(valor: number): boolean {
        return this.buscarRecursivo(this.raiz, valor);
    }

    private buscarRecursivo(no: NoArvore | null, valor: number): boolean {
        if (no === null) {
            return false;
        }

        if (valor === no.valor) {
            return true;
        }

        if (valor < no.valor) {
            return this.buscarRecursivo(no.esquerda, valor);
        } else {
            return this.buscarRecursivo(no.direita, valor);
        }
    }

    emOrdem(): number[] {
        const resultado: number[] = [];
        this.emOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private emOrdemRecursivo(no: NoArvore | null, resultado: number[]): void {
        if (no !== null) {
            this.emOrdemRecursivo(no.esquerda, resultado);
            resultado.push(no.valor);
            this.emOrdemRecursivo(no.direita, resultado);
        }
    }
}

function exercicio7(): void {
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

class RadixSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];

        if (resultado.length === 0) return resultado;

        // Encontrar o número máximo para determinar o número de dígitos
        const max = Math.max(...resultado);
        const maxDigitos = Math.floor(Math.log10(max)) + 1;

        // Aplicar counting sort para cada dígito
        for (let digito = 0; digito < maxDigitos; digito++) {
            this.countingSortPorDigito(resultado, digito);
        }

        return resultado;
    }

    private countingSortPorDigito(array: number[], digito: number): void {
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

    private obterDigito(numero: number, posicao: number): number {
        return Math.floor(Math.abs(numero) / Math.pow(10, posicao)) % 10;
    }

    getNome(): string { return "Radix Sort"; }
    getComplexidade(): string { return "O(n * d)"; }
    isEstavel(): boolean { return true; }
}

function exercicio8(): void {
    console.log("\n=== EXERCÍCIO 8: RADIX SORT ===\n");

    const radixSort = new RadixSort();
    const dados = [170, 45, 75, 90, 802, 24, 2, 66];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        radixSort.ordenar(dados)
    );

    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", radixSort.getEstatisticas());
    console.log("Complexidade:", radixSort.getComplexidade());
    console.log("Estável:", radixSort.isEstavel() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 9: BUCKET SORT ====================

/**
 * EXERCÍCIO 9: Implementar Bucket Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Bucket Sort. Distribua elementos em
 * diferentes "baldes" e ordene cada balde individualmente usando insertion sort.
 */

class BucketSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];

        if (resultado.length === 0) return resultado;

        // Encontrar min e max para determinar intervalos dos baldes
        const min = Math.min(...resultado);
        const max = Math.max(...resultado);
        const numBaldes = Math.floor(Math.sqrt(resultado.length)) + 1;

        // Criar baldes
        const baldes: number[][] = Array.from({ length: numBaldes }, () => []);

        // Distribuir elementos nos baldes
        for (const num of resultado) {
            const indiceBaldes = Math.floor(((num - min) / (max - min + 1)) * numBaldes);
            const indiceSeguro = Math.min(indiceBaldes, numBaldes - 1);
            baldes[indiceSeguro].push(num);
        }

        // Ordenar cada balde e combinar
        const resultadoFinal: number[] = [];
        for (const balde of baldes) {
            if (balde.length > 0) {
                // Usar insertion sort para cada balde (eficiente para arrays pequenos)
                const baldeOrdenado = this.insertionSortBalde(balde);
                resultadoFinal.push(...baldeOrdenado);
            }
        }

        return resultadoFinal;
    }

    private insertionSortBalde(balde: number[]): number[] {
        const resultado = [...balde];
        for (let i = 1; i < resultado.length; i++) {
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

    getNome(): string { return "Bucket Sort"; }
    getComplexidade(): string { return "O(n + k)"; }
    isEstavel(): boolean { return true; }
}

function exercicio9(): void {
    console.log("\n=== EXERCÍCIO 9: BUCKET SORT ===\n");

    const bucketSort = new BucketSort();
    const dados = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        bucketSort.ordenar(dados)
    );

    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", bucketSort.getEstatisticas());
    console.log("Complexidade:", bucketSort.getComplexidade());
    console.log("Estável:", bucketSort.isEstavel() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 10: COMB SORT ====================

/**
 * EXERCÍCIO 10: Implementar Comb Sort
 * Dificuldade: Médio
 *
 * Descrição: Implemente o algoritmo Comb Sort, uma variação do Bubble Sort
 * que usa intervalos decrescentes para eliminar tartarugas (elementos pequenos no final).
 */

class CombSort extends AlgoritmoOrdenacaoBase<number> {
    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];
        const n = resultado.length;

        // Fator de redução (geralmente 1.3)
        const fatorReducao = 1.3;
        let intervalo = n;
        let houveTroca = true;

        while (intervalo > 1 || houveTroca) {
            if (intervalo > 1) {
                intervalo = Math.floor(intervalo / fatorReducao);
            }

            houveTroca = false;

            for (let i = 0; i + intervalo < n; i++) {
                if (this.comparar(resultado[i], resultado[i + intervalo]) > 0) {
                    this.trocar(resultado, i, i + intervalo);
                    houveTroca = true;
                }
            }
        }

        return resultado;
    }

    getNome(): string { return "Comb Sort"; }
    getComplexidade(): string { return "O(n²) pior caso, O(n log n) médio"; }
    isEstavel(): boolean { return false; }
}

function exercicio10(): void {
    console.log("\n=== EXERCÍCIO 10: COMB SORT ===\n");

    const combSort = new CombSort();
    const dados = [8, 4, 1, 56, 3, -44, 23, -6, 28, 0];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        combSort.ordenar(dados)
    );

    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", combSort.getEstatisticas());
    console.log("Complexidade:", combSort.getComplexidade());
    console.log("Estável:", combSort.isEstavel() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 11: BUSCA TERNÁRIA ====================

/**
 * EXERCÍCIO 11: Implementar Busca Ternária
 * Dificuldade: Médio
 *
 * Descrição: Implemente a busca ternária para arrays ordenados.
 * Divide o array em três partes ao invés de duas.
 */

class BuscaTernaria extends AlgoritmoBuscaBase<number> {
    buscar(array: number[], elemento: number): number {
        this.resetarEstatisticas();
        return this.buscaTernariaRecursiva(array, elemento, 0, array.length - 1);
    }

    private buscaTernariaRecursiva(array: number[], elemento: number, esquerda: number, direita: number): number {
        if (esquerda > direita) {
            return -1;
        }

        // Dividir em três partes
        const terco1 = esquerda + Math.floor((direita - esquerda) / 3);
        const terco2 = direita - Math.floor((direita - esquerda) / 3);

        // Verificar os pontos de divisão
        if (this.comparar(array[terco1], elemento) === 0) {
            return terco1;
        }
        if (this.comparar(array[terco2], elemento) === 0) {
            return terco2;
        }

        // Decidir qual terço procurar
        if (this.comparar(elemento, array[terco1]) < 0) {
            return this.buscaTernariaRecursiva(array, elemento, esquerda, terco1 - 1);
        } else if (this.comparar(elemento, array[terco2]) < 0) {
            return this.buscaTernariaRecursiva(array, elemento, terco1 + 1, terco2 - 1);
        } else {
            return this.buscaTernariaRecursiva(array, elemento, terco2 + 1, direita);
        }
    }

    getNome(): string { return "Busca Ternária"; }
    getComplexidade(): string { return "O(log₃ n)"; }
    requerOrdenado(): boolean { return true; }
}

function exercicio11(): void {
    console.log("\n=== EXERCÍCIO 11: BUSCA TERNÁRIA ===\n");

    const buscaTernaria = new BuscaTernaria();
    const dados = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const elemento = 8;

    console.log("Array ordenado:", dados);
    console.log("Buscando elemento:", elemento);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        buscaTernaria.buscar(dados, elemento)
    );

    console.log("Índice encontrado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", buscaTernaria.getEstatisticas());
    console.log("Requer ordenado:", buscaTernaria.requerOrdenado() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 12: BUSCA EXPONENCIAL ====================

/**
 * EXERCÍCIO 12: Implementar Busca Exponencial
 * Dificuldade: Médio
 *
 * Descrição: Implemente a busca exponencial, que encontra um intervalo
 * usando busca exponencial e depois aplica busca binária.
 */

class BuscaExponencial extends AlgoritmoBuscaBase<number> {
    buscar(array: number[], elemento: number): number {
        this.resetarEstatisticas();

        if (array.length === 0) return -1;

        // Verificar primeiro elemento
        if (this.comparar(array[0], elemento) === 0) {
            return 0;
        }

        // Encontrar intervalo usando busca exponencial
        let i = 1;
        while (i < array.length && this.comparar(array[i], elemento) <= 0) {
            i *= 2;
        }

        // Aplicar busca binária no intervalo encontrado
        return this.buscaBinaria(array, elemento, i / 2, Math.min(i, array.length - 1));
    }

    private buscaBinaria(array: number[], elemento: number, esquerda: number, direita: number): number {
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

    getNome(): string { return "Busca Exponencial"; }
    getComplexidade(): string { return "O(log n)"; }
    requerOrdenado(): boolean { return true; }
}

function exercicio12(): void {
    console.log("\n=== EXERCÍCIO 12: BUSCA EXPONENCIAL ===\n");

    const buscaExponencial = new BuscaExponencial();
    const dados = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const elemento = 15;

    console.log("Array ordenado:", dados);
    console.log("Buscando elemento:", elemento);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        buscaExponencial.buscar(dados, elemento)
    );

    console.log("Índice encontrado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", buscaExponencial.getEstatisticas());
    console.log("Requer ordenado:", buscaExponencial.requerOrdenado() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 13: ORDENAÇÃO DE ARRAYS MULTIDIMENSIONAIS ====================

/**
 * EXERCÍCIO 13: Ordenação de arrays multidimensionais
 * Dificuldade: Médio
 *
 * Descrição: Implemente algoritmos para ordenar arrays multidimensionais
 * (matrizes) por linhas, colunas ou elementos individuais.
 */

class OrdenadorMatrizes {
    // Ordenar cada linha da matriz
    static ordenarLinhas(matriz: number[][]): number[][] {
        return matriz.map(linha => {
            const sorter = new QuickSort();
            return sorter.ordenar(linha);
        });
    }

    // Ordenar cada coluna da matriz
    static ordenarColunas(matriz: number[][]): number[][] {
        if (matriz.length === 0 || matriz[0].length === 0) return matriz;

        const resultado = matriz.map(linha => [...linha]);
        const numLinhas = resultado.length;
        const numColunas = resultado[0].length;

        for (let col = 0; col < numColunas; col++) {
            const coluna = [];
            for (let lin = 0; lin < numLinhas; lin++) {
                coluna.push(resultado[lin][col]);
            }

            const sorter = new QuickSort();
            const colunaOrdenada = sorter.ordenar(coluna);

            for (let lin = 0; lin < numLinhas; lin++) {
                resultado[lin][col] = colunaOrdenada[lin];
            }
        }

        return resultado;
    }

    // Transformar matriz em array 1D, ordenar e reconstruir
    static ordenarElementos(matriz: number[][]): number[][] {
        const todosElementos = matriz.flat();
        const sorter = new MergeSort();
        const elementosOrdenados = sorter.ordenar(todosElementos);

        // Reconstruir matriz mantendo dimensões
        const resultado: number[][] = [];
        let indice = 0;

        for (const linha of matriz) {
            const novaLinha: number[] = [];
            for (let i = 0; i < linha.length; i++) {
                novaLinha.push(elementosOrdenados[indice++]);
            }
            resultado.push(novaLinha);
        }

        return resultado;
    }

    // Ordenar linhas baseado na soma dos elementos
    static ordenarLinhasPorSoma(matriz: number[][]): number[][] {
        return [...matriz].sort((a, b) => {
            const somaA = a.reduce((acc, val) => acc + val, 0);
            const somaB = b.reduce((acc, val) => acc + val, 0);
            return somaA - somaB;
        });
    }
}

function exercicio13(): void {
    console.log("\n=== EXERCÍCIO 13: ORDENAÇÃO DE MATRIZES ===\n");

    const matriz = [
        [3, 1, 4, 1],
        [5, 9, 2, 6],
        [5, 3, 5, 8],
        [9, 7, 9, 3]
    ];

    console.log("Matriz original:");
    matriz.forEach(linha => console.log("  [" + linha.join(", ") + "]"));

    console.log("\nOrdenando linhas:");
    const linhasOrdenadas = OrdenadorMatrizes.ordenarLinhas(matriz);
    linhasOrdenadas.forEach(linha => console.log("  [" + linha.join(", ") + "]"));

    console.log("\nOrdenando colunas:");
    const colunasOrdenadas = OrdenadorMatrizes.ordenarColunas(matriz);
    colunasOrdenadas.forEach(linha => console.log("  [" + linha.join(", ") + "]"));

    console.log("\nOrdenando todos os elementos:");
    const elementosOrdenados = OrdenadorMatrizes.ordenarElementos(matriz);
    elementosOrdenados.forEach(linha => console.log("  [" + linha.join(", ") + "]"));

    console.log("\nOrdenando linhas por soma:");
    const linhasPorSoma = OrdenadorMatrizes.ordenarLinhasPorSoma(matriz);
    linhasPorSoma.forEach(linha => console.log("  [" + linha.join(", ") + "]"));
}

// ==================== EXERCÍCIO 14: BUSCA EM ARRAY ROTACIONADO ====================

/**
 * EXERCÍCIO 14: Busca em array rotacionado
 * Dificuldade: Médio
 *
 * Descrição: Implemente uma busca eficiente em um array que foi rotacionado
 * em um ponto desconhecido. O array originalmente estava ordenado.
 */

class BuscaArrayRotacionado extends AlgoritmoBuscaBase<number> {
    buscar(array: number[], elemento: number): number {
        this.resetarEstatisticas();
        return this.buscaRotacionada(array, elemento, 0, array.length - 1);
    }

    private buscaRotacionada(array: number[], elemento: number, esquerda: number, direita: number): number {
        if (esquerda > direita) return -1;

        const meio = Math.floor((esquerda + direita) / 2);

        if (this.comparar(array[meio], elemento) === 0) {
            return meio;
        }

        // Verificar se o lado esquerdo está ordenado
        if (array[esquerda] <= array[meio]) {
            // Lado esquerdo está ordenado
            if (elemento >= array[esquerda] && elemento <= array[meio]) {
                return this.buscaRotacionada(array, elemento, esquerda, meio - 1);
            } else {
                return this.buscaRotacionada(array, elemento, meio + 1, direita);
            }
        } else {
            // Lado direito está ordenado
            if (elemento >= array[meio] && elemento <= array[direita]) {
                return this.buscaRotacionada(array, elemento, meio + 1, direita);
            } else {
                return this.buscaRotacionada(array, elemento, esquerda, meio - 1);
            }
        }
    }

    // Método adicional para encontrar o ponto de rotação
    encontrarPontoRotacao(array: number[]): number {
        let esquerda = 0;
        let direita = array.length - 1;

        while (esquerda < direita) {
            const meio = Math.floor((esquerda + direita) / 2);

            if (array[meio] > array[direita]) {
                esquerda = meio + 1;
            } else {
                direita = meio;
            }
        }

        return esquerda;
    }

    getNome(): string { return "Busca em Array Rotacionado"; }
    getComplexidade(): string { return "O(log n)"; }
    requerOrdenado(): boolean { return false; } // Array está ordenado mas rotacionado
}

function exercicio14(): void {
    console.log("\n=== EXERCÍCIO 14: BUSCA EM ARRAY ROTACIONADO ===\n");

    const buscaRotacionada = new BuscaArrayRotacionado();

    // Array rotacionado (original: [1,2,3,4,5,6,7,8,9,10] rotacionado 4 posições)
    const dados = [7, 8, 9, 10, 1, 2, 3, 4, 5, 6];
    const elementos = [1, 5, 8, 11];

    console.log("Array rotacionado:", dados);
    console.log("Ponto de rotação:", buscaRotacionada.encontrarPontoRotacao(dados));

    elementos.forEach(elemento => {
        const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
            buscaRotacionada.buscar(dados, elemento)
        );

        console.log(`Buscar ${elemento}: índice ${resultado} (${tempo.toFixed(4)}ms)`);
    });

    console.log("Estatísticas totais:", buscaRotacionada.getEstatisticas());
}

// ==================== EXERCÍCIO 15: ANÁLISE DE ESTABILIDADE ====================

/**
 * EXERCÍCIO 15: Análise de estabilidade em algoritmos de ordenação
 * Dificuldade: Médio
 *
 * Descrição: Demonstre a diferença entre algoritmos estáveis e não estáveis
 * usando objetos com chave e valor secundário.
 */

interface ElementoOrdenacao {
    chave: number;
    valor: string;
}

class AnalisadorEstabilidade {
    static criarDadosTeste(): ElementoOrdenacao[] {
        return [
            { chave: 3, valor: "A" },
            { chave: 1, valor: "B" },
            { chave: 3, valor: "C" },
            { chave: 2, valor: "D" },
            { chave: 1, valor: "E" },
            { chave: 2, valor: "F" }
        ];
    }

    static ordenarEstavel(dados: ElementoOrdenacao[]): ElementoOrdenacao[] {
        // Merge Sort é estável
        const sorter = new MergeSort();
        return sorter.ordenar(dados.map(item => item.chave))
            .map(chave => dados.find(item => item.chave === chave)!);
    }

    static ordenarNaoEstavel(dados: ElementoOrdenacao[]): ElementoOrdenacao[] {
        // Quick Sort não é estável
        const sorter = new QuickSort();
        return sorter.ordenar(dados.map(item => item.chave))
            .map(chave => dados.find(item => item.chave === chave)!);
    }

    static verificarEstabilidade(original: ElementoOrdenacao[], ordenado: ElementoOrdenacao[]): boolean {
        // Verificar se elementos com mesma chave mantêm ordem relativa
        for (let i = 0; i < ordenado.length - 1; i++) {
            for (let j = i + 1; j < ordenado.length; j++) {
                if (ordenado[i].chave === ordenado[j].chave) {
                    // Encontrar posições originais
                    const posI = original.findIndex(item =>
                        item.chave === ordenado[i].chave && item.valor === ordenado[i].valor);
                    const posJ = original.findIndex(item =>
                        item.chave === ordenado[j].chave && item.valor === ordenado[j].valor);

                    if (posI > posJ) {
                        return false; // Ordem relativa não mantida
                    }
                }
            }
        }
        return true;
    }
}

function exercicio15(): void {
    console.log("\n=== EXERCÍCIO 15: ANÁLISE DE ESTABILIDADE ===\n");

    const dadosOriginais = AnalisadorEstabilidade.criarDadosTeste();

    console.log("Dados originais:");
    dadosOriginais.forEach(item => console.log(`  Chave: ${item.chave}, Valor: ${item.valor}`));

    console.log("\nOrdenação com algoritmo ESTÁVEL (Merge Sort):");
    const ordenadoEstavel = AnalisadorEstabilidade.ordenarEstavel(dadosOriginais);
    ordenadoEstavel.forEach(item => console.log(`  Chave: ${item.chave}, Valor: ${item.valor}`));
    console.log("Estável:", AnalisadorEstabilidade.verificarEstabilidade(dadosOriginais, ordenadoEstavel));

    console.log("\nOrdenação com algoritmo NÃO ESTÁVEL (Quick Sort):");
    const ordenadoNaoEstavel = AnalisadorEstabilidade.ordenarNaoEstavel(dadosOriginais);
    ordenadoNaoEstavel.forEach(item => console.log(`  Chave: ${item.chave}, Valor: ${item.valor}`));
    console.log("Estável:", AnalisadorEstabilidade.verificarEstabilidade(dadosOriginais, ordenadoNaoEstavel));

    console.log("\n💡 Elementos com mesma chave mantêm ordem relativa apenas no algoritmo estável!");
}

// ==================== EXERCÍCIO 16: ORDENAÇÃO DE OBJETOS POR MÚLTIPLAS PROPRIEDADES ====================

/**
 * EXERCÍCIO 16: Ordenação de objetos por múltiplas propriedades
 * Dificuldade: Médio
 *
 * Descrição: Implemente ordenação de arrays de objetos considerando
 * múltiplas propriedades em ordem de prioridade.
 */

interface Pessoa {
    nome: string;
    idade: number;
    salario: number;
}

class OrdenadorObjetos {
    static ordenarPessoas(pessoas: Pessoa[], prioridades: (keyof Pessoa)[]): Pessoa[] {
        return [...pessoas].sort((a, b) => {
            for (const propriedade of prioridades) {
                const valorA = a[propriedade];
                const valorB = b[propriedade];

                if (valorA < valorB) return -1;
                if (valorA > valorB) return 1;
            }
            return 0;
        });
    }

    static ordenarPessoasEstavel(pessoas: Pessoa[], prioridades: (keyof Pessoa)[]): Pessoa[] {
        // Usar Merge Sort para estabilidade
        const resultado = [...pessoas];

        for (let i = prioridades.length - 1; i >= 0; i--) {
            const propriedade = prioridades[i];
            resultado.sort((a, b) => {
                const valorA = a[propriedade];
                const valorB = b[propriedade];

                if (valorA < valorB) return -1;
                if (valorA > valorB) return 1;
                return 0;
            });
        }

        return resultado;
    }
}

function exercicio16(): void {
    console.log("\n=== EXERCÍCIO 16: ORDENAÇÃO DE OBJETOS ===\n");

    const pessoas: Pessoa[] = [
        { nome: "Ana", idade: 25, salario: 3000 },
        { nome: "João", idade: 30, salario: 2500 },
        { nome: "Maria", idade: 25, salario: 3500 },
        { nome: "Pedro", idade: 35, salario: 3000 },
        { nome: "Lucas", idade: 30, salario: 2800 }
    ];

    console.log("Pessoas originais:");
    pessoas.forEach(p => console.log(`  ${p.nome}: ${p.idade} anos, R$ ${p.salario}`));

    console.log("\nOrdenação por idade, depois salário:");
    const ordenadoIdadeSalario = OrdenadorObjetos.ordenarPessoas(pessoas, ['idade', 'salario']);
    ordenadoIdadeSalario.forEach(p => console.log(`  ${p.nome}: ${p.idade} anos, R$ ${p.salario}`));

    console.log("\nOrdenação por salário, depois idade:");
    const ordenadoSalarioIdade = OrdenadorObjetos.ordenarPessoas(pessoas, ['salario', 'idade']);
    ordenadoSalarioIdade.forEach(p => console.log(`  ${p.nome}: ${p.idade} anos, R$ ${p.salario}`));

    console.log("\nOrdenação estável por múltiplas propriedades:");
    const ordenadoEstavel = OrdenadorObjetos.ordenarPessoasEstavel(pessoas, ['idade', 'salario']);
    ordenadoEstavel.forEach(p => console.log(`  ${p.nome}: ${p.idade} anos, R$ ${p.salario}`));
}

// ==================== EXERCÍCIO 17: BUSCA EM ARRAYS COM DUPLICATAS ====================

/**
 * EXERCÍCIO 17: Busca eficiente em arrays com muitos elementos duplicados
 * Dificuldade: Médio
 *
 * Descrição: Implemente algoritmos otimizados para busca em arrays
 * com alta frequência de elementos duplicados.
 */

class BuscaComDuplicatas extends AlgoritmoBuscaBase<number> {
    buscar(array: number[], elemento: number): number {
        this.resetarEstatisticas();
        return this.buscaOtimizadaDuplicatas(array, elemento);
    }

    private buscaOtimizadaDuplicatas(array: number[], elemento: number): number {
        // Para arrays com muitas duplicatas, usar busca linear otimizada
        // que para quando encontra o primeiro elemento maior
        for (let i = 0; i < array.length; i++) {
            const comparacao = this.comparar(array[i], elemento);
            if (comparacao === 0) {
                return i;
            }
            // Se array está ordenado e encontramos elemento maior, podemos parar
            if (comparacao > 0) {
                return -1;
            }
        }
        return -1;
    }

    // Buscar todas as ocorrências
    buscarTodas(array: number[], elemento: number): number[] {
        this.resetarEstatisticas();
        const indices: number[] = [];

        for (let i = 0; i < array.length; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                indices.push(i);
            } else if (indices.length > 0 && this.comparar(array[i], elemento) > 0) {
                // Se já encontramos algumas ocorrências e o array está ordenado,
                // podemos parar quando encontramos elemento maior
                break;
            }
        }

        return indices;
    }

    // Encontrar primeira e última ocorrência
    encontrarIntervalo(array: number[], elemento: number): { primeiro: number, ultimo: number } {
        this.resetarEstatisticas();

        let primeiro = -1;
        let ultimo = -1;

        for (let i = 0; i < array.length; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                if (primeiro === -1) primeiro = i;
                ultimo = i;
            } else if (ultimo !== -1 && this.comparar(array[i], elemento) > 0) {
                // Se já encontramos o intervalo e o array está ordenado, podemos parar
                break;
            }
        }

        return { primeiro, ultimo };
    }

    getNome(): string { return "Busca Otimizada para Duplicatas"; }
    getComplexidade(): string { return "O(n) pior caso, O(k) para arrays ordenados com k duplicatas"; }
    requerOrdenado(): boolean { return false; }
}

function exercicio17(): void {
    console.log("\n=== EXERCÍCIO 17: BUSCA COM DUPLICATAS ===\n");

    const buscaDuplicatas = new BuscaComDuplicatas();

    // Array com muitas duplicatas
    const dados = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5];
    const elementos = [1, 3, 6]; // 6 não existe

    console.log("Array com duplicatas:", dados);

    elementos.forEach(elemento => {
        console.log(`\nBuscando elemento ${elemento}:`);

        // Buscar primeira ocorrência
        const primeira = buscaDuplicatas.buscar(dados, elemento);
        console.log(`  Primeira ocorrência: índice ${primeira}`);

        // Buscar todas as ocorrências
        const todas = buscaDuplicatas.buscarTodas(dados, elemento);
        console.log(`  Todas as ocorrências: índices [${todas.join(', ')}]`);

        // Encontrar intervalo
        const intervalo = buscaDuplicatas.encontrarIntervalo(dados, elemento);
        console.log(`  Intervalo: ${intervalo.primeiro} até ${intervalo.ultimo}`);
    });

    console.log("\nEstatísticas totais:", buscaDuplicatas.getEstatisticas());
}

// ==================== EXERCÍCIO 18: ALGORITMOS HÍBRIDOS DE ORDENAÇÃO ====================

/**
 * EXERCÍCIO 18: Implementação de algoritmos híbridos de ordenação
 * Dificuldade: Médio
 *
 * Descrição: Combine diferentes algoritmos de ordenação para criar
 * versões híbridas otimizadas para diferentes cenários.
 */

class AlgoritmosHibridos {
    // Intro Sort: Quick Sort + Heap Sort
    static introSort(array: number[]): number[] {
        const resultado = [...array];
        const maxProfundidade = Math.floor(2 * Math.log2(resultado.length));

        this.introSortRecursivo(resultado, 0, resultado.length - 1, maxProfundidade);
        return resultado;
    }

    private static introSortRecursivo(array: number[], esquerda: number, direita: number, profundidade: number): void {
        const tamanho = direita - esquerda + 1;

        if (tamanho <= 16) {
            // Para arrays pequenos, usar Insertion Sort
            this.insertionSort(array, esquerda, direita);
        } else if (profundidade === 0) {
            // Profundidade máxima atingida, usar Heap Sort
            this.heapSort(array, esquerda, direita);
        } else {
            // Usar Quick Sort
            const pivo = this.particionar(array, esquerda, direita);
            this.introSortRecursivo(array, esquerda, pivo - 1, profundidade - 1);
            this.introSortRecursivo(array, pivo + 1, direita, profundidade - 1);
        }
    }

    // Tim Sort: Merge Sort + Insertion Sort
    static timSort(array: number[]): number[] {
        const resultado = [...array];
        const RUN = 32; // Tamanho mínimo das runs

        // Ordenar runs individuais com Insertion Sort
        for (let i = 0; i < resultado.length; i += RUN) {
            this.insertionSort(resultado, i, Math.min(i + RUN - 1, resultado.length - 1));
        }

        // Mesclar runs usando Merge Sort
        for (let tamanho = RUN; tamanho < resultado.length; tamanho *= 2) {
            for (let esquerda = 0; esquerda < resultado.length; esquerda += 2 * tamanho) {
                const meio = esquerda + tamanho - 1;
                const direita = Math.min(esquerda + 2 * tamanho - 1, resultado.length - 1);

                if (meio < direita) {
                    this.mesclar(resultado, esquerda, meio, direita);
                }
            }
        }

        return resultado;
    }

    // Métodos auxiliares
    private static insertionSort(array: number[], esquerda: number, direita: number): void {
        for (let i = esquerda + 1; i <= direita; i++) {
            const chave = array[i];
            let j = i - 1;

            while (j >= esquerda && array[j] > chave) {
                array[j + 1] = array[j];
                j--;
            }

            array[j + 1] = chave;
        }
    }

    private static heapSort(array: number[], esquerda: number, direita: number): void {
        // Implementação simplificada de Heap Sort para subarray
        const n = direita - esquerda + 1;

        // Construir heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(array, n, i, esquerda);
        }

        // Extrair elementos
        for (let i = n - 1; i > 0; i--) {
            [array[esquerda], array[esquerda + i]] = [array[esquerda + i], array[esquerda]];
            this.heapify(array, i, 0, esquerda);
        }
    }

    private static heapify(array: number[], n: number, i: number, offset: number): void {
        let maior = i;
        const esquerda = 2 * i + 1;
        const direita = 2 * i + 2;

        if (esquerda < n && array[offset + esquerda] > array[offset + maior]) {
            maior = esquerda;
        }

        if (direita < n && array[offset + direita] > array[offset + maior]) {
            maior = direita;
        }

        if (maior !== i) {
            [array[offset + i], array[offset + maior]] = [array[offset + maior], array[offset + i]];
            this.heapify(array, n, maior, offset);
        }
    }

    private static particionar(array: number[], esquerda: number, direita: number): number {
        const pivo = array[direita];
        let i = esquerda - 1;

        for (let j = esquerda; j < direita; j++) {
            if (array[j] <= pivo) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        [array[i + 1], array[direita]] = [array[direita], array[i + 1]];
        return i + 1;
    }

    private static mesclar(array: number[], esquerda: number, meio: number, direita: number): void {
        const n1 = meio - esquerda + 1;
        const n2 = direita - meio;

        const esquerdaArray = array.slice(esquerda, meio + 1);
        const direitaArray = array.slice(meio + 1, direita + 1);

        let i = 0, j = 0, k = esquerda;

        while (i < n1 && j < n2) {
            if (esquerdaArray[i] <= direitaArray[j]) {
                array[k] = esquerdaArray[i];
                i++;
            } else {
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
}

function exercicio18(): void {
    console.log("\n=== EXERCÍCIO 18: ALGORITMOS HÍBRIDOS ===\n");

    const dados = ArrayUtils.gerarAleatorio(100, 1, 1000);

    console.log("Array original (primeiros 20 elementos):", dados.slice(0, 20));

    console.log("\nIntro Sort (Quick + Heap + Insertion):");
    const { resultado: introResultado, tempo: introTempo } = MedidorPerformance.medirTempo(() =>
        AlgoritmosHibridos.introSort(dados)
    );
    console.log(`  Tempo: ${introTempo.toFixed(4)}ms`);
    console.log("  Ordenado corretamente:", verificarOrdenado(introResultado));

    console.log("\nTim Sort (Merge + Insertion):");
    const { resultado: timResultado, tempo: timTempo } = MedidorPerformance.medirTempo(() =>
        AlgoritmosHibridos.timSort(dados)
    );
    console.log(`  Tempo: ${timTempo.toFixed(4)}ms`);
    console.log("  Ordenado corretamente:", verificarOrdenado(timResultado));

    console.log("\nComparação com algoritmos puros:");
    const quickSort = new QuickSort();
    const mergeSort = new MergeSort();

    const quickTempo = MedidorPerformance.medirTempo(() => quickSort.ordenar(dados)).tempo;
    const mergeTempo = MedidorPerformance.medirTempo(() => mergeSort.ordenar(dados)).tempo;

    console.log(`  Quick Sort: ${quickTempo.toFixed(4)}ms`);
    console.log(`  Merge Sort: ${mergeTempo.toFixed(4)}ms`);
    console.log(`  Intro Sort: ${introTempo.toFixed(4)}ms`);
    console.log(`  Tim Sort: ${timTempo.toFixed(4)}ms`);
}

// ==================== EXECUÇÃO DOS EXERCÍCIOS ====================

function executarExerciciosMedios(): void {
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
    exercicio9();
    exercicio10();
    exercicio11();
    exercicio12();
    exercicio13();
    exercicio14();
    exercicio15();
    exercicio16();
    exercicio17();
    exercicio18();

    console.log("\n✅ Todos os exercícios médios foram executados!");
}

// Exportar para uso em outros módulos
export {
    MergeSort,
    QuickSort,
    ShellSort,
    HeapSort,
    BuscaInterpolacao,
    CountingSort,
    ArvoreBinariaBusca,
    RadixSort,
    BucketSort,
    CombSort,
    BuscaTernaria,
    BuscaExponencial,
    OrdenadorMatrizes,
    BuscaArrayRotacionado,
    AnalisadorEstabilidade,
    OrdenadorObjetos,
    BuscaComDuplicatas,
    AlgoritmosHibridos,
    executarExerciciosMedios
};

// Executar exercícios quando o arquivo for executado diretamente
executarExerciciosMedios();