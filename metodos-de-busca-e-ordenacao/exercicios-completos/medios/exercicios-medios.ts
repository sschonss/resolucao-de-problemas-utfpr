import {
    AlgoritmoOrdenacaoBase,
    AlgoritmoBuscaBase,
    ColecaoDados,
    ArrayUtils,
    MedidorPerformance,
    ResultadoExercicio
} from '../base/classes-base';

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
    executarExerciciosMedios
};