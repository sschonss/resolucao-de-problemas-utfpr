import {
    AlgoritmoOrdenacaoBase,
    AlgoritmoBuscaBase,
    ColecaoDados,
    ArrayUtils,
    MedidorPerformance,
    ResultadoExercicio
} from '../base/classes-base';

// Importar algoritmos de ordenação dos exercícios médios
import {
    QuickSort
} from '../medios/exercicios-medios';

// Classe InsertionSort local para o desafio
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

// ==================== EXERCÍCIO 1: TIMSORT (ALGORITMO HÍBRIDO) ====================

/**
 * EXERCÍCIO 1: Implementar Timsort
 * Dificuldade: Difícil
 *
 * Descrição: Implemente o Timsort, algoritmo híbrido usado no Python e Java.
 * Combina insertion sort para pequenas sequências e merge sort para mesclar.
 */

class TimSort extends AlgoritmoOrdenacaoBase<number> {
    private readonly MIN_MERGE = 32;

    ordenar(array: number[]): number[] {
        this.resetarEstatisticas();
        const resultado = [...array];
        const n = resultado.length;

        // Aplicar insertion sort em subarrays de tamanho MIN_MERGE
        for (let i = 0; i < n; i += this.MIN_MERGE) {
            this.insertionSort(resultado, i, Math.min(i + this.MIN_MERGE - 1, n - 1));
        }

        // Mesclar os subarrays ordenados
        for (let tamanho = this.MIN_MERGE; tamanho < n; tamanho = 2 * tamanho) {
            for (let esquerda = 0; esquerda < n; esquerda += 2 * tamanho) {
                const meio = esquerda + tamanho - 1;
                const direita = Math.min(esquerda + 2 * tamanho - 1, n - 1);

                if (meio < direita) {
                    this.mesclar(resultado, esquerda, meio, direita);
                }
            }
        }

        return resultado;
    }

    private insertionSort(array: number[], esquerda: number, direita: number): void {
        for (let i = esquerda + 1; i <= direita; i++) {
            const chave = array[i];
            let j = i - 1;

            while (j >= esquerda && this.comparar(array[j], chave) > 0) {
                array[j + 1] = array[j];
                j--;
                this.trocas++;
            }

            array[j + 1] = chave;
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

    getNome(): string { return "Timsort"; }
    getComplexidade(): string { return "O(n log n)"; }
    isEstavel(): boolean { return true; }
}

function exercicio1(): void {
    console.log("=== EXERCÍCIO 1: TIMSORT ===\n");

    const timSort = new TimSort();
    const dados = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30, 15];

    console.log("Array original:", dados);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        timSort.ordenar(dados)
    );

    console.log("Array ordenado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", timSort.getEstatisticas());
    console.log("Complexidade:", timSort.getComplexidade());
    console.log("Estável:", timSort.isEstavel() ? "Sim" : "Não");
}

// ==================== EXERCÍCIO 2: ÁRVORE AVL ====================

/**
 * EXERCÍCIO 2: Implementar Árvore AVL
 * Dificuldade: Difícil
 *
 * Descrição: Implemente uma árvore AVL (Adelson-Velskii e Landis) com
 * operações de inserção, busca e balanceamento automático.
 */

class NoAVL {
    constructor(
        public valor: number,
        public altura: number = 1,
        public esquerda: NoAVL | null = null,
        public direita: NoAVL | null = null
    ) {}
}

class ArvoreAVL {
    private raiz: NoAVL | null = null;

    private altura(no: NoAVL | null): number {
        return no ? no.altura : 0;
    }

    private atualizarAltura(no: NoAVL): void {
        no.altura = 1 + Math.max(this.altura(no.esquerda), this.altura(no.direita));
    }

    private fatorBalanceamento(no: NoAVL): number {
        return this.altura(no.esquerda) - this.altura(no.direita);
    }

    private rotacaoDireita(y: NoAVL): NoAVL {
        const x = y.esquerda!;
        const T2 = x.direita;

        x.direita = y;
        y.esquerda = T2;

        this.atualizarAltura(y);
        this.atualizarAltura(x);

        return x;
    }

    private rotacaoEsquerda(x: NoAVL): NoAVL {
        const y = x.direita!;
        const T2 = y.esquerda;

        y.esquerda = x;
        x.direita = T2;

        this.atualizarAltura(x);
        this.atualizarAltura(y);

        return y;
    }

    inserir(valor: number): void {
        this.raiz = this.inserirRecursivo(this.raiz, valor);
    }

    private inserirRecursivo(no: NoAVL | null, valor: number): NoAVL {
        if (no === null) {
            return new NoAVL(valor);
        }

        if (valor < no.valor) {
            no.esquerda = this.inserirRecursivo(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this.inserirRecursivo(no.direita, valor);
        } else {
            return no; // Valor duplicado
        }

        this.atualizarAltura(no);

        const balanceamento = this.fatorBalanceamento(no);

        // Casos de rotação
        if (balanceamento > 1 && valor < no.esquerda!.valor) {
            return this.rotacaoDireita(no);
        }

        if (balanceamento < -1 && valor > no.direita!.valor) {
            return this.rotacaoEsquerda(no);
        }

        if (balanceamento > 1 && valor > no.esquerda!.valor) {
            no.esquerda = this.rotacaoEsquerda(no.esquerda!);
            return this.rotacaoDireita(no);
        }

        if (balanceamento < -1 && valor < no.direita!.valor) {
            no.direita = this.rotacaoDireita(no.direita!);
            return this.rotacaoEsquerda(no);
        }

        return no;
    }

    buscar(valor: number): boolean {
        return this.buscarRecursivo(this.raiz, valor);
    }

    private buscarRecursivo(no: NoAVL | null, valor: number): boolean {
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

    private emOrdemRecursivo(no: NoAVL | null, resultado: number[]): void {
        if (no !== null) {
            this.emOrdemRecursivo(no.esquerda, resultado);
            resultado.push(no.valor);
            this.emOrdemRecursivo(no.direita, resultado);
        }
    }

    getAltura(): number {
        return this.altura(this.raiz);
    }
}

function exercicio2(): void {
    console.log("\n=== EXERCÍCIO 2: ÁRVORE AVL ===\n");

    const avl = new ArvoreAVL();
    const valores = [10, 20, 30, 40, 50, 25];

    console.log("Inserindo valores:", valores);
    valores.forEach(valor => avl.inserir(valor));

    console.log("Árvore em ordem:", avl.emOrdem());
    console.log("Altura da árvore:", avl.getAltura());

    const buscarValores = [25, 35, 40, 15];
    buscarValores.forEach(valor => {
        const encontrado = avl.buscar(valor);
        console.log(`Buscar ${valor}: ${encontrado ? "Encontrado" : "Não encontrado"}`);
    });
}

// ==================== EXERCÍCIO 3: ALGORITMO DE BUSCA EM GRAFOS - BFS ====================

/**
 * EXERCÍCIO 3: Implementar Busca em Largura (BFS)
 * Dificuldade: Difícil
 *
 * Descrição: Implemente o algoritmo BFS para encontrar o caminho mais curto
 * em um grafo não ponderado representado por lista de adjacência.
 */

class BFS {
    private grafo: Map<number, number[]> = new Map();
    private visitados: Set<number> = new Set();
    private fila: number[] = [];
    private predecessores: Map<number, number> = new Map();

    adicionarAresta(u: number, v: number): void {
        if (!this.grafo.has(u)) {
            this.grafo.set(u, []);
        }
        if (!this.grafo.has(v)) {
            this.grafo.set(v, []);
        }
        this.grafo.get(u)!.push(v);
        this.grafo.get(v)!.push(u); // Grafo não direcionado
    }

    buscar(inicio: number, objetivo: number): number[] | null {
        this.visitados.clear();
        this.fila = [];
        this.predecessores.clear();

        this.visitados.add(inicio);
        this.fila.push(inicio);

        while (this.fila.length > 0) {
            const atual = this.fila.shift()!;

            if (atual === objetivo) {
                return this.reconstruirCaminho(objetivo);
            }

            const vizinhos = this.grafo.get(atual) || [];
            for (const vizinho of vizinhos) {
                if (!this.visitados.has(vizinho)) {
                    this.visitados.add(vizinho);
                    this.fila.push(vizinho);
                    this.predecessores.set(vizinho, atual);
                }
            }
        }

        return null; // Caminho não encontrado
    }

    private reconstruirCaminho(objetivo: number): number[] {
        const caminho: number[] = [];
        let atual: number | undefined = objetivo;

        while (atual !== undefined) {
            caminho.unshift(atual);
            atual = this.predecessores.get(atual);
        }

        return caminho;
    }

    getVerticesVisitados(): number[] {
        return Array.from(this.visitados);
    }
}

function exercicio3(): void {
    console.log("\n=== EXERCÍCIO 3: BUSCA EM LARGURA (BFS) ===\n");

    const bfs = new BFS();

    // Criar grafo de exemplo
    bfs.adicionarAresta(0, 1);
    bfs.adicionarAresta(0, 2);
    bfs.adicionarAresta(1, 2);
    bfs.adicionarAresta(1, 3);
    bfs.adicionarAresta(2, 3);
    bfs.adicionarAresta(3, 4);

    console.log("Grafo criado com vértices 0-4");

    const caminho = bfs.buscar(0, 4);
    console.log("Caminho mais curto de 0 para 4:", caminho);
    console.log("Vértices visitados:", bfs.getVerticesVisitados());
}

// ==================== EXERCÍCIO 4: ALGORITMO DE BUSCA EM GRAFOS - DFS ====================

/**
 * EXERCÍCIO 4: Implementar Busca em Profundidade (DFS)
 * Dificuldade: Difícil
 *
 * Descrição: Implemente o algoritmo DFS para travessia de grafos e
 * detecção de componentes conectados.
 */

class DFS {
    private grafo: Map<number, number[]> = new Map();
    private visitados: Set<number> = new Set();
    private pilha: number[] = [];
    private caminhoAtual: number[] = [];

    adicionarAresta(u: number, v: number): void {
        if (!this.grafo.has(u)) {
            this.grafo.set(u, []);
        }
        if (!this.grafo.has(v)) {
            this.grafo.set(v, []);
        }
        this.grafo.get(u)!.push(v);
        this.grafo.get(v)!.push(u); // Grafo não direcionado
    }

    buscar(inicio: number): number[] {
        this.visitados.clear();
        this.caminhoAtual = [];
        this.dfsRecursivo(inicio);
        return this.caminhoAtual;
    }

    private dfsRecursivo(atual: number): void {
        this.visitados.add(atual);
        this.caminhoAtual.push(atual);

        const vizinhos = this.grafo.get(atual) || [];
        for (const vizinho of vizinhos) {
            if (!this.visitados.has(vizinho)) {
                this.dfsRecursivo(vizinho);
            }
        }
    }

    encontrarComponentesConectados(): number[][] {
        this.visitados.clear();
        const componentes: number[][] = [];

        for (const vertice of this.grafo.keys()) {
            if (!this.visitados.has(vertice)) {
                const componente: number[] = [];
                this.dfsComponente(vertice, componente);
                componentes.push(componente);
            }
        }

        return componentes;
    }

    private dfsComponente(atual: number, componente: number[]): void {
        this.visitados.add(atual);
        componente.push(atual);

        const vizinhos = this.grafo.get(atual) || [];
        for (const vizinho of vizinhos) {
            if (!this.visitados.has(vizinho)) {
                this.dfsComponente(vizinho, componente);
            }
        }
    }

    getVerticesVisitados(): number[] {
        return Array.from(this.visitados);
    }
}

function exercicio4(): void {
    console.log("\n=== EXERCÍCIO 4: BUSCA EM PROFUNDIDADE (DFS) ===\n");

    const dfs = new DFS();

    // Criar grafo desconectado
    dfs.adicionarAresta(0, 1);
    dfs.adicionarAresta(0, 2);
    dfs.adicionarAresta(1, 2);
    dfs.adicionarAresta(3, 4);
    dfs.adicionarAresta(5, 6);
    dfs.adicionarAresta(5, 7);

    console.log("Grafo criado com componentes desconectados");

    const caminho = dfs.buscar(0);
    console.log("Travessia DFS a partir de 0:", caminho);

    const componentes = dfs.encontrarComponentesConectados();
    console.log("Componentes conectados:", componentes);
}

// ==================== EXERCÍCIO 5: ALGORITMO DE KNUTH-MORRIS-PRATT (KMP) ====================

/**
 * EXERCÍCIO 5: Implementar algoritmo KMP para busca de padrões
 * Dificuldade: Difícil
 *
 * Descrição: Implemente o algoritmo KMP para busca eficiente de padrões
 * em strings, evitando retrocessos desnecessários.
 */

class BuscaKMP extends AlgoritmoBuscaBase<string> {
    buscar(array: string[], elemento: string): number {
        // Para compatibilidade com a interface base, buscar em array de strings
        this.resetarEstatisticas();
        for (let i = 0; i < array.length; i++) {
            if (this.comparar(array[i], elemento) === 0) {
                return i;
            }
        }
        return -1;
    }

    buscarString(texto: string, padrao: string): number {
        this.resetarEstatisticas();

        if (padrao.length === 0) return 0;
        if (texto.length < padrao.length) return -1;

        const tabelaPrefixo = this.construirTabelaPrefixo(padrao);
        let i = 0; // índice para texto
        let j = 0; // índice para padrão

        while (i < texto.length) {
            if (this.comparar(texto[i], padrao[j]) === 0) {
                i++;
                j++;

                if (j === padrao.length) {
                    return i - j; // Encontrado
                }
            } else {
                if (j !== 0) {
                    j = tabelaPrefixo[j - 1];
                } else {
                    i++;
                }
            }
        }

        return -1; // Não encontrado
    }

    private construirTabelaPrefixo(padrao: string): number[] {
        const tabela = new Array(padrao.length).fill(0);
        let comprimento = 0;
        let i = 1;

        while (i < padrao.length) {
            if (this.comparar(padrao[i], padrao[comprimento]) === 0) {
                comprimento++;
                tabela[i] = comprimento;
                i++;
            } else {
                if (comprimento !== 0) {
                    comprimento = tabela[comprimento - 1];
                } else {
                    tabela[i] = 0;
                    i++;
                }
            }
        }

        return tabela;
    }

    buscarTodasStrings(texto: string, padrao: string): number[] {
        const indices: number[] = [];
        let indice = this.buscarString(texto, padrao);

        while (indice !== -1) {
            indices.push(indice);
            const restoTexto = texto.substring(indice + 1);
            const proximoIndice = this.buscarString(restoTexto, padrao);
            if (proximoIndice !== -1) {
                indice = indice + 1 + proximoIndice;
            } else {
                indice = -1;
            }
        }

        return indices;
    }

    getNome(): string { return "Busca KMP"; }
    getComplexidade(): string { return "O(n + m)"; }
    requerOrdenado(): boolean { return false; }
}

function exercicio5(): void {
    console.log("\n=== EXERCÍCIO 5: ALGORITMO KMP ===\n");

    const kmp = new BuscaKMP();
    const texto = "ABABDABACDABABCABAB";
    const padrao = "ABABCABAB";

    console.log("Texto:", texto);
    console.log("Padrão:", padrao);

    const { resultado, tempo } = MedidorPerformance.medirTempo(() =>
        kmp.buscarString(texto, padrao)
    );

    console.log("Índice encontrado:", resultado);
    console.log("Tempo de execução:", tempo.toFixed(4), "ms");
    console.log("Estatísticas:", kmp.getEstatisticas());

    // Buscar todas as ocorrências
    const todasOcorrencias = kmp.buscarTodasStrings(texto, "AB");
    console.log("Todas as ocorrências de 'AB':", todasOcorrencias);
}

// ==================== EXERCÍCIO 6: ALGORITMO DE DIJKSTRA ====================

/**
 * EXERCÍCIO 6: Implementar algoritmo de Dijkstra
 * Dificuldade: Difícil
 *
 * Descrição: Implemente o algoritmo de Dijkstra para encontrar o caminho
 * mais curto em grafos com pesos não negativos.
 */

class Dijkstra {
    private grafo: Map<number, Map<number, number>> = new Map();

    adicionarAresta(u: number, v: number, peso: number): void {
        if (!this.grafo.has(u)) {
            this.grafo.set(u, new Map());
        }
        if (!this.grafo.has(v)) {
            this.grafo.set(v, new Map());
        }
        this.grafo.get(u)!.set(v, peso);
        // Para grafo não direcionado, adicionar também v -> u
        // this.grafo.get(v)!.set(u, peso);
    }

    encontrarCaminhoMaisCurto(inicio: number, objetivo: number): { caminho: number[], distancia: number } | null {
        const distancias = new Map<number, number>();
        const predecessores = new Map<number, number>();
        const naoVisitados = new Set<number>();

        // Inicializar distâncias
        for (const vertice of this.grafo.keys()) {
            distancias.set(vertice, Infinity);
            naoVisitados.add(vertice);
        }
        distancias.set(inicio, 0);

        while (naoVisitados.size > 0) {
            // Encontrar vértice com menor distância
            let menorDistancia = Infinity;
            let verticeAtual: number | null = null;

            for (const vertice of naoVisitados) {
                const distancia = distancias.get(vertice)!;
                if (distancia < menorDistancia) {
                    menorDistancia = distancia;
                    verticeAtual = vertice;
                }
            }

            if (verticeAtual === null || distancias.get(verticeAtual)! === Infinity) {
                break;
            }

            naoVisitados.delete(verticeAtual);

            // Atualizar distâncias dos vizinhos
            const vizinhos = this.grafo.get(verticeAtual) || new Map();
            for (const [vizinho, peso] of vizinhos) {
                if (naoVisitados.has(vizinho)) {
                    const distanciaAlternativa = distancias.get(verticeAtual)! + peso;
                    if (distanciaAlternativa < distancias.get(vizinho)!) {
                        distancias.set(vizinho, distanciaAlternativa);
                        predecessores.set(vizinho, verticeAtual);
                    }
                }
            }
        }

        if (distancias.get(objetivo) === Infinity) {
            return null; // Caminho não encontrado
        }

        // Reconstruir caminho
        const caminho: number[] = [];
        let atual: number | undefined = objetivo;
        while (atual !== undefined) {
            caminho.unshift(atual);
            atual = predecessores.get(atual);
        }

        return {
            caminho,
            distancia: distancias.get(objetivo)!
        };
    }
}

function exercicio6(): void {
    console.log("\n=== EXERCÍCIO 6: ALGORITMO DE DIJKSTRA ===\n");

    const dijkstra = new Dijkstra();

    // Criar grafo com pesos
    dijkstra.adicionarAresta(0, 1, 4);
    dijkstra.adicionarAresta(0, 2, 1);
    dijkstra.adicionarAresta(1, 2, 2);
    dijkstra.adicionarAresta(1, 3, 5);
    dijkstra.adicionarAresta(2, 3, 8);
    dijkstra.adicionarAresta(2, 4, 10);
    dijkstra.adicionarAresta(3, 4, 2);

    console.log("Grafo criado com pesos");

    const resultado = dijkstra.encontrarCaminhoMaisCurto(0, 4);
    if (resultado) {
        console.log("Caminho mais curto de 0 para 4:", resultado.caminho);
        console.log("Distância total:", resultado.distancia);
    } else {
        console.log("Caminho não encontrado");
    }
}

// ==================== EXERCÍCIO 7: ÁRVORE B ====================

/**
 * EXERCÍCIO 7: Implementar Árvore B
 * Dificuldade: Difícil
 *
 * Descrição: Implemente uma árvore B simplificada com operações básicas
 * de inserção e busca. Árvores B são usadas em bancos de dados e sistemas de arquivos.
 */

class NoArvoreB<T> {
    constructor(
        public chaves: T[] = [],
        public filhos: NoArvoreB<T>[] = [],
        public folha: boolean = true
    ) {}
}

class ArvoreB<T> {
    private raiz: NoArvoreB<T>;
    private readonly ordem: number; // Número máximo de chaves por nó

    constructor(ordem: number = 3) {
        this.ordem = ordem;
        this.raiz = new NoArvoreB<T>();
    }

    inserir(chave: T): void {
        const raiz = this.raiz;

        if (raiz.chaves.length === this.ordem - 1) {
            // Raiz cheia, criar nova raiz
            const novaRaiz = new NoArvoreB<T>();
            novaRaiz.folha = false;
            novaRaiz.filhos.push(raiz);
            this.dividirNo(novaRaiz, 0);
            this.raiz = novaRaiz;
        }

        this.inserirNaoCheio(this.raiz, chave);
    }

    private inserirNaoCheio(no: NoArvoreB<T>, chave: T): void {
        let i = no.chaves.length - 1;

        if (no.folha) {
            // Inserir na posição correta
            while (i >= 0 && chave < no.chaves[i]) {
                i--;
            }
            no.chaves.splice(i + 1, 0, chave);
        } else {
            // Encontrar filho apropriado
            while (i >= 0 && chave < no.chaves[i]) {
                i--;
            }
            i++;

            if (no.filhos[i].chaves.length === this.ordem - 1) {
                this.dividirNo(no, i);
                if (chave > no.chaves[i]) {
                    i++;
                }
            }

            this.inserirNaoCheio(no.filhos[i], chave);
        }
    }

    private dividirNo(pai: NoArvoreB<T>, indice: number): void {
        const filho = pai.filhos[indice];
        const novoNo = new NoArvoreB<T>();
        novoNo.folha = filho.folha;

        // Mover metade das chaves para o novo nó
        const meio = Math.floor(this.ordem / 2);
        const chaveMeio = filho.chaves[meio];

        novoNo.chaves = filho.chaves.splice(meio + 1);
        filho.chaves.splice(meio, 1);

        if (!filho.folha) {
            novoNo.filhos = filho.filhos.splice(meio + 1);
        }

        // Inserir nova chave no pai
        pai.chaves.splice(indice, 0, chaveMeio);
        pai.filhos.splice(indice + 1, 0, novoNo);
    }

    buscar(chave: T): boolean {
        return this.buscarRecursivo(this.raiz, chave);
    }

    private buscarRecursivo(no: NoArvoreB<T>, chave: T): boolean {
        let i = 0;
        while (i < no.chaves.length && chave > no.chaves[i]) {
            i++;
        }

        if (i < no.chaves.length && chave === no.chaves[i]) {
            return true;
        }

        if (no.folha) {
            return false;
        }

        return this.buscarRecursivo(no.filhos[i], chave);
    }

    getAltura(): number {
        return this.calcularAltura(this.raiz);
    }

    private calcularAltura(no: NoArvoreB<T>): number {
        if (no.folha) return 0;
        return 1 + this.calcularAltura(no.filhos[0]);
    }

    emOrdem(): T[] {
        const resultado: T[] = [];
        this.emOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private emOrdemRecursivo(no: NoArvoreB<T>, resultado: T[]): void {
        if (!no.folha) {
            for (let i = 0; i < no.chaves.length; i++) {
                this.emOrdemRecursivo(no.filhos[i], resultado);
                resultado.push(no.chaves[i]);
            }
            this.emOrdemRecursivo(no.filhos[no.chaves.length], resultado);
        } else {
            resultado.push(...no.chaves);
        }
    }
}

function exercicio7(): void {
    console.log("\n=== EXERCÍCIO 7: ÁRVORE B ===\n");

    const arvoreB = new ArvoreB<number>(3);
    const valores = [10, 20, 5, 6, 12, 30, 7, 17];

    console.log("Inserindo valores:", valores);
    valores.forEach(valor => arvoreB.inserir(valor));

    console.log("Árvore em ordem:", arvoreB.emOrdem());
    console.log("Altura da árvore:", arvoreB.getAltura());

    const buscarValores = [6, 15, 20, 25];
    buscarValores.forEach(valor => {
        const encontrado = arvoreB.buscar(valor);
        console.log(`Buscar ${valor}: ${encontrado ? "Encontrado" : "Não encontrado"}`);
    });
}

// ==================== EXERCÍCIO 8: ALGORITMO DE BELLMAN-FORD ====================

/**
 * EXERCÍCIO 8: Implementar algoritmo de Bellman-Ford
 * Dificuldade: Difícil
 *
 * Descrição: Implemente o algoritmo de Bellman-Ford para encontrar caminhos
 * mais curtos em grafos com pesos negativos (detecta ciclos negativos).
 */

class BellmanFord {
    private grafo: Map<number, Map<number, number>> = new Map();

    adicionarAresta(u: number, v: number, peso: number): void {
        if (!this.grafo.has(u)) {
            this.grafo.set(u, new Map());
        }
        this.grafo.get(u)!.set(v, peso);
    }

    encontrarCaminhoMaisCurto(inicio: number): { distancias: Map<number, number>, predecessores: Map<number, number>, cicloNegativo: boolean } {
        const distancias = new Map<number, number>();
        const predecessores = new Map<number, number>();
        const vertices = Array.from(this.grafo.keys());

        // Inicializar distâncias
        for (const vertice of vertices) {
            distancias.set(vertice, Infinity);
            predecessores.set(vertice, -1);
        }
        distancias.set(inicio, 0);

        // Relaxar arestas |V| - 1 vezes
        for (let i = 0; i < vertices.length - 1; i++) {
            for (const [u, vizinhos] of this.grafo) {
                for (const [v, peso] of vizinhos) {
                    const distanciaAlternativa = distancias.get(u)! + peso;
                    if (distanciaAlternativa < distancias.get(v)!) {
                        distancias.set(v, distanciaAlternativa);
                        predecessores.set(v, u);
                    }
                }
            }
        }

        // Verificar ciclos negativos
        let cicloNegativo = false;
        for (const [u, vizinhos] of this.grafo) {
            for (const [v, peso] of vizinhos) {
                if (distancias.get(u)! + peso < distancias.get(v)!) {
                    cicloNegativo = true;
                    break;
                }
            }
            if (cicloNegativo) break;
        }

        return { distancias, predecessores, cicloNegativo };
    }

    reconstruirCaminho(predecessores: Map<number, number>, destino: number): number[] {
        const caminho: number[] = [];
        let atual = destino;

        while (atual !== -1) {
            caminho.unshift(atual);
            atual = predecessores.get(atual) || -1;
            if (caminho.includes(atual)) {
                // Ciclo detectado
                return [];
            }
        }

        return caminho;
    }
}

function exercicio8(): void {
    console.log("\n=== EXERCÍCIO 8: ALGORITMO DE BELLMAN-FORD ===\n");

    const bf = new BellmanFord();

    // Criar grafo com pesos (alguns negativos)
    bf.adicionarAresta(0, 1, 4);
    bf.adicionarAresta(0, 2, 2);
    bf.adicionarAresta(1, 2, -3);
    bf.adicionarAresta(1, 3, 2);
    bf.adicionarAresta(2, 3, 4);
    bf.adicionarAresta(3, 1, -1); // Aresta com peso negativo

    console.log("Grafo criado com pesos (incluindo negativos)");

    const resultado = bf.encontrarCaminhoMaisCurto(0);

    console.log("Ciclo negativo detectado:", resultado.cicloNegativo ? "Sim" : "Não");

    if (!resultado.cicloNegativo) {
        console.log("Distancias a partir do vértice 0:");
        for (const [vertice, distancia] of resultado.distancias) {
            console.log(`  Vértice ${vertice}: ${distancia === Infinity ? '∞' : distancia}`);
        }

        // Reconstruir caminho para vértice 3
        const caminho = bf.reconstruirCaminho(resultado.predecessores, 3);
        console.log("Caminho para vértice 3:", caminho);
    }
}

// ==================== EXERCÍCIO 9: ALGORITMO DE FLOYD-WARSHALL ====================

/**
 * EXERCÍCIO 9: Implementar algoritmo de Floyd-Warshall
 * Dificuldade: Difícil
 *
 * Descrição: Implemente o algoritmo de Floyd-Warshall para encontrar
 * caminhos mais curtos entre todos os pares de vértices.
 */

class FloydWarshall {
    private readonly INF = Infinity;
    private matriz: number[][];

    constructor(numVertices: number) {
        this.matriz = Array.from({ length: numVertices }, () =>
            Array(numVertices).fill(this.INF)
        );

        // Diagonal principal = 0
        for (let i = 0; i < numVertices; i++) {
            this.matriz[i][i] = 0;
        }
    }

    adicionarAresta(u: number, v: number, peso: number): void {
        this.matriz[u][v] = peso;
    }

    calcularCaminhosMaisCurtos(): { matriz: number[][], predecessores: number[][] } {
        const n = this.matriz.length;
        const dist = this.matriz.map(linha => [...linha]);
        const pred = Array.from({ length: n }, () =>
            Array(n).fill(-1)
        );

        // Inicializar predecessores
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j && dist[i][j] !== this.INF) {
                    pred[i][j] = i;
                }
            }
        }

        // Algoritmo principal
        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (dist[i][k] !== this.INF && dist[k][j] !== this.INF) {
                        const novaDist = dist[i][k] + dist[k][j];
                        if (novaDist < dist[i][j]) {
                            dist[i][j] = novaDist;
                            pred[i][j] = pred[k][j];
                        }
                    }
                }
            }
        }

        return { matriz: dist, predecessores: pred };
    }

    reconstruirCaminho(predecessores: number[][], origem: number, destino: number): number[] {
        if (predecessores[origem][destino] === -1) {
            return []; // Sem caminho
        }

        const caminho: number[] = [];
        let atual = destino;

        while (atual !== origem) {
            caminho.unshift(atual);
            if (predecessores[origem][atual] === -1) {
                return []; // Caminho inválido
            }
            atual = predecessores[origem][atual];
        }
        caminho.unshift(origem);

        return caminho;
    }
}

function exercicio9(): void {
    console.log("\n=== EXERCÍCIO 9: ALGORITMO DE FLOYD-WARSHALL ===\n");

    const fw = new FloydWarshall(4);

    // Criar grafo
    fw.adicionarAresta(0, 1, 3);
    fw.adicionarAresta(0, 3, 7);
    fw.adicionarAresta(1, 0, 8);
    fw.adicionarAresta(1, 2, 2);
    fw.adicionarAresta(2, 0, 5);
    fw.adicionarAresta(2, 3, 1);
    fw.adicionarAresta(3, 0, 2);

    console.log("Calculando caminhos mais curtos entre todos os pares...");

    const { matriz, predecessores } = fw.calcularCaminhosMaisCurtos();

    console.log("Matriz de distâncias:");
    matriz.forEach((linha, i) => {
        console.log(`  ${i}: [${linha.map(d => d === Infinity ? '∞' : d).join(', ')}]`);
    });

    // Exemplos de caminhos
    const exemplos = [
        [0, 2], [1, 3], [2, 1]
    ];

    console.log("\nCaminhos reconstruídos:");
    exemplos.forEach(([origem, destino]) => {
        const caminho = fw.reconstruirCaminho(predecessores, origem, destino);
        const distancia = matriz[origem][destino];
        console.log(`  ${origem} → ${destino}: ${caminho.join(' → ')} (distância: ${distancia === Infinity ? '∞' : distancia})`);
    });
}

// ==================== EXERCÍCIO 10: PROBLEMA DO CAIXEIRO VIAJANTE (APROXIMAÇÃO) ====================

/**
 * EXERCÍCIO 10: Implementar solução aproximada para o Caixeiro Viajante
 * Dificuldade: Difícil
 *
 * Descrição: Implemente uma heurística gulosa para o problema do caixeiro viajante
 * usando o algoritmo do vizinho mais próximo.
 */

class CaixeiroViajante {
    private grafo: number[][];

    constructor(grafo: number[][]) {
        this.grafo = grafo;
    }

    encontrarCaminhoAproximado(inicio: number = 0): { caminho: number[], distancia: number } {
        const n = this.grafo.length;
        const visitados = new Set<number>();
        const caminho: number[] = [inicio];
        visitados.add(inicio);

        let distanciaTotal = 0;
        let atual = inicio;

        for (let i = 1; i < n; i++) {
            let proximo = -1;
            let menorDistancia = Infinity;

            // Encontrar vizinho mais próximo não visitado
            for (let j = 0; j < n; j++) {
                if (!visitados.has(j) && this.grafo[atual][j] < menorDistancia) {
                    menorDistancia = this.grafo[atual][j];
                    proximo = j;
                }
            }

            if (proximo === -1) break; // Não há mais vértices

            caminho.push(proximo);
            visitados.add(proximo);
            distanciaTotal += menorDistancia;
            atual = proximo;
        }

        // Retornar ao início
        distanciaTotal += this.grafo[atual][inicio];
        caminho.push(inicio);

        return { caminho, distancia: distanciaTotal };
    }

    // Calcular distância exata (força bruta - apenas para pequenos grafos)
    encontrarCaminhoExato(inicio: number = 0): { caminho: number[], distancia: number } {
        const n = this.grafo.length;
        const vertices = Array.from({ length: n }, (_, i) => i).filter(v => v !== inicio);
        const permutacoes = this.gerarPermutacoes(vertices);

        let melhorCaminho: number[] = [];
        let menorDistancia = Infinity;

        for (const perm of permutacoes) {
            const caminho = [inicio, ...perm, inicio];
            let distancia = 0;

            for (let i = 0; i < caminho.length - 1; i++) {
                distancia += this.grafo[caminho[i]][caminho[i + 1]];
            }

            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                melhorCaminho = caminho;
            }
        }

        return { caminho: melhorCaminho, distancia: menorDistancia };
    }

    private gerarPermutacoes(array: number[]): number[][] {
        if (array.length <= 1) return [array];

        const resultado: number[][] = [];

        for (let i = 0; i < array.length; i++) {
            const atual = array[i];
            const restante = array.slice(0, i).concat(array.slice(i + 1));
            const permRestante = this.gerarPermutacoes(restante);

            for (const perm of permRestante) {
                resultado.push([atual, ...perm]);
            }
        }

        return resultado;
    }
}

function exercicio10(): void {
    console.log("\n=== EXERCÍCIO 10: CAIXEIRO VIAJANTE (APROXIMAÇÃO) ===\n");

    // Criar grafo de distâncias (matriz simétrica)
    const grafo = [
        [0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0]
    ];

    const cv = new CaixeiroViajante(grafo);

    console.log("Matriz de distâncias:");
    grafo.forEach((linha, i) => {
        console.log(`  Cidade ${i}: [${linha.join(', ')}]`);
    });

    // Solução aproximada
    const aproximada = cv.encontrarCaminhoAproximado(0);
    console.log("\nSolução aproximada (Vizinho Mais Próximo):");
    console.log(`  Caminho: ${aproximada.caminho.join(' → ')}`);
    console.log(`  Distância: ${aproximada.distancia}`);

    // Para grafos pequenos, calcular solução exata
    if (grafo.length <= 10) {
        const exata = cv.encontrarCaminhoExato(0);
        console.log("\nSolução exata (Força Bruta):");
        console.log(`  Caminho: ${exata.caminho.join(' → ')}`);
        console.log(`  Distância: ${exata.distancia}`);
        console.log(`  Aproximação: ${((aproximada.distancia / exata.distancia - 1) * 100).toFixed(1)}% acima do ótimo`);
    }
}

// ==================== DESAFIO EXTRA: BINGO ORDENADO vs NÃO ORDENADO ====================

/**
 * DESAFIO EXTRA: Bingo com Estratégias de Ordenação e Busca
 * Dificuldade: Especial (Combina múltiplos algoritmos)
 *
 * Descrição: Implemente um sistema de bingo que usa diferentes estratégias
 * de ordenação e busca dependendo do tipo de jogo. O desafio envolve:
 * - Bingo Ordenado: cartelas mantidas ordenadas para busca binária rápida
 * - Bingo Não Ordenado: cartelas desordenadas com busca linear
 * - Estratégias híbridas para otimização de performance
 */

interface ICartelaBingo {
    adicionarNumero(numero: number): void;
    verificarNumero(numero: number): boolean;
    estaCompleta(): boolean;
    getNumeros(): number[];
    getTipo(): string;
}

class CartelaBingoOrdenada implements ICartelaBingo {
    private numeros: number[] = [];
    private readonly tamanhoMaximo: number;
    private algoritmoOrdenacao: AlgoritmoOrdenacaoBase<number>;

    constructor(tamanhoMaximo: number = 25, algoritmo?: AlgoritmoOrdenacaoBase<number>) {
        this.tamanhoMaximo = tamanhoMaximo;
        this.algoritmoOrdenacao = algoritmo || new QuickSort();
    }

    adicionarNumero(numero: number): void {
        if (this.numeros.length >= this.tamanhoMaximo) return;

        // Verificar se número já existe (usando busca binária se ordenado)
        if (this.numeros.length > 0 && this.verificarNumero(numero)) return;

        this.numeros.push(numero);
        // Manter ordenado após inserção
        this.numeros = this.algoritmoOrdenacao.ordenar(this.numeros);
    }

    verificarNumero(numero: number): boolean {
        // Busca binária para arrays ordenados
        let esquerda = 0;
        let direita = this.numeros.length - 1;

        while (esquerda <= direita) {
            const meio = Math.floor((esquerda + direita) / 2);
            if (this.numeros[meio] === numero) {
                return true;
            } else if (this.numeros[meio] < numero) {
                esquerda = meio + 1;
            } else {
                direita = meio - 1;
            }
        }
        return false;
    }

    estaCompleta(): boolean {
        return this.numeros.length >= this.tamanhoMaximo;
    }

    getNumeros(): number[] {
        return [...this.numeros];
    }

    getTipo(): string {
        return "Ordenado (Busca Binária)";
    }
}

class CartelaBingoNaoOrdenada implements ICartelaBingo {
    private numeros: Set<number> = new Set();
    private readonly tamanhoMaximo: number;

    constructor(tamanhoMaximo: number = 25) {
        this.tamanhoMaximo = tamanhoMaximo;
    }

    adicionarNumero(numero: number): void {
        if (this.numeros.size >= this.tamanhoMaximo) return;
        this.numeros.add(numero);
    }

    verificarNumero(numero: number): boolean {
        return this.numeros.has(numero);
    }

    estaCompleta(): boolean {
        return this.numeros.size >= this.tamanhoMaximo;
    }

    getNumeros(): number[] {
        return Array.from(this.numeros);
    }

    getTipo(): string {
        return "Não Ordenado (Busca em Set)";
    }
}

class CartelaBingoHibrida implements ICartelaBingo {
    private numeros: number[] = [];
    private readonly tamanhoMaximo: number;
    private readonly limiteParaOrdenacao: number;
    private algoritmoOrdenacao: AlgoritmoOrdenacaoBase<number>;

    constructor(tamanhoMaximo: number = 25, limiteParaOrdenacao: number = 10) {
        this.tamanhoMaximo = tamanhoMaximo;
        this.limiteParaOrdenacao = limiteParaOrdenacao;
        this.algoritmoOrdenacao = new InsertionSort(); // Mais eficiente para arrays pequenos
    }

    adicionarNumero(numero: number): void {
        if (this.numeros.length >= this.tamanhoMaximo) return;

        // Verificar duplicatas
        if (this.numeros.length < this.limiteParaOrdenacao) {
            // Para arrays pequenos, usar busca linear simples
            if (this.numeros.includes(numero)) return;
        } else {
            // Para arrays maiores, ordenar e usar busca binária
            this.numeros = this.algoritmoOrdenacao.ordenar(this.numeros);
            if (this.verificarNumero(numero)) return;
        }

        this.numeros.push(numero);
    }

    verificarNumero(numero: number): boolean {
        if (this.numeros.length <= this.limiteParaOrdenacao) {
            // Busca linear para arrays pequenos
            return this.numeros.includes(numero);
        } else {
            // Busca binária para arrays ordenados
            let esquerda = 0;
            let direita = this.numeros.length - 1;

            while (esquerda <= direita) {
                const meio = Math.floor((esquerda + direita) / 2);
                if (this.numeros[meio] === numero) {
                    return true;
                } else if (this.numeros[meio] < numero) {
                    esquerda = meio + 1;
                } else {
                    direita = meio - 1;
                }
            }
            return false;
        }
    }

    estaCompleta(): boolean {
        return this.numeros.length >= this.tamanhoMaximo;
    }

    getNumeros(): number[] {
        return [...this.numeros];
    }

    getTipo(): string {
        return `Híbrido (Linear até ${this.limiteParaOrdenacao}, depois Binária)`;
    }
}

class JogoBingo {
    private cartelas: ICartelaBingo[] = [];
    private numerosSorteados: number[] = [];
    private readonly intervaloNumeros: { min: number; max: number };

    constructor(numCartelas: number = 3, intervalo: { min: number; max: number } = { min: 1, max: 75 }) {
        this.intervaloNumeros = intervalo;

        // Criar cartelas de diferentes tipos
        this.cartelas.push(new CartelaBingoOrdenada(15));
        this.cartelas.push(new CartelaBingoNaoOrdenada(15));
        this.cartelas.push(new CartelaBingoHibrida(15));

        // Limitar ao número solicitado
        this.cartelas = this.cartelas.slice(0, numCartelas);

        this.gerarCartelas();
    }

    private gerarCartelas(): void {
        this.cartelas.forEach(cartela => {
            const numerosDisponiveis = Array.from(
                { length: this.intervaloNumeros.max - this.intervaloNumeros.min + 1 },
                (_, i) => i + this.intervaloNumeros.min
            );

            // Embaralhar e pegar primeiros números
            for (let i = numerosDisponiveis.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numerosDisponiveis[i], numerosDisponiveis[j]] = [numerosDisponiveis[j], numerosDisponiveis[i]];
            }

            // Adicionar números à cartela (quantidade menor para teste)
            const quantidadeNumeros = Math.floor(Math.random() * 10) + 5; // 5-15 números
            for (let i = 0; i < quantidadeNumeros && i < numerosDisponiveis.length; i++) {
                cartela.adicionarNumero(numerosDisponiveis[i]);
            }
        });
    }

    sortearNumero(): number {
        let numero: number;
        do {
            numero = Math.floor(Math.random() * (this.intervaloNumeros.max - this.intervaloNumeros.min + 1)) + this.intervaloNumeros.min;
        } while (this.numerosSorteados.includes(numero));

        this.numerosSorteados.push(numero);
        return numero;
    }

    verificarVencedores(): { cartelaIndex: number; tipo: string; numeros: number[] }[] {
        const vencedores: { cartelaIndex: number; tipo: string; numeros: number[] }[] = [];

        this.cartelas.forEach((cartela, index) => {
            let todosPresentes = true;
            const numerosCartela = cartela.getNumeros();

            for (const numero of numerosCartela) {
                if (!this.numerosSorteados.includes(numero)) {
                    todosPresentes = false;
                    break;
                }
            }

            if (todosPresentes && numerosCartela.length > 0) {
                vencedores.push({
                    cartelaIndex: index,
                    tipo: cartela.getTipo(),
                    numeros: numerosCartela
                });
            }
        });

        return vencedores;
    }

    jogarRodada(): { numeroSorteado: number; vencedores: any[]; estatisticas: any } {
        const numeroSorteado = this.sortearNumero();
        const vencedores = this.verificarVencedores();

        // Calcular estatísticas de performance
        const estatisticas = this.cartelas.map((cartela, index) => {
            const inicioTempo = performance.now();
            const temNumero = cartela.verificarNumero(numeroSorteado);
            const tempoVerificacao = performance.now() - inicioTempo;

            return {
                tipo: cartela.getTipo(),
                tempoVerificacao: tempoVerificacao.toFixed(4) + 'ms',
                temNumero,
                totalNumeros: cartela.getNumeros().length
            };
        });

        return {
            numeroSorteado,
            vencedores,
            estatisticas
        };
    }

    getStatus(): void {
        console.log("\n=== STATUS DO JOGO BINGO ===");
        console.log(`Números sorteados: [${this.numerosSorteados.join(', ')}]`);
        console.log(`Total sorteados: ${this.numerosSorteados.length}`);

        this.cartelas.forEach((cartela, index) => {
            console.log(`\nCartela ${index + 1} (${cartela.getTipo()}):`);
            console.log(`  Números: [${cartela.getNumeros().join(', ')}]`);
            console.log(`  Completa: ${cartela.estaCompleta() ? 'Sim' : 'Não'}`);
        });
    }

    getCartelas(): ICartelaBingo[] {
        return this.cartelas;
    }

    getNumerosSorteados(): number[] {
        return [...this.numerosSorteados];
    }
}

function desafioBingo(): void {
    console.log("🎯 DESAFIO EXTRA: BINGO ORDENADO vs NÃO ORDENADO\n");
    console.log("====================================================\n");

    console.log("Este desafio compara três estratégias diferentes para cartelas de bingo:");
    console.log("1. Cartela Ordenada: Mantém números ordenados, usa busca binária");
    console.log("2. Cartela Não Ordenada: Usa Set para busca O(1)");
    console.log("3. Cartela Híbrida: Busca linear para poucos elementos, binária para muitos\n");

    const jogo = new JogoBingo(3);

    console.log("=== CARTELAS INICIAIS ===");
    jogo.getStatus();

    console.log("\n=== INICIANDO SORTEIOS ===");

    let rodada = 1;
    const maxRodadas = 20;

    while (rodada <= maxRodadas && jogo.verificarVencedores().length === 0) {
        console.log(`\n--- RODADA ${rodada} ---`);

        const resultado = jogo.jogarRodada();

        console.log(`Número sorteado: ${resultado.numeroSorteado}`);

        console.log("Performance das verificações:");
        resultado.estatisticas.forEach((stat: any, index: number) => {
            console.log(`  Cartela ${index + 1} (${stat.tipo}): ${stat.tempoVerificacao} - ${stat.temNumero ? 'TEM' : 'NÃO TEM'}`);
        });

        if (resultado.vencedores.length > 0) {
            console.log("\n🏆 VENCEDORES ENCONTRADOS!");
            resultado.vencedores.forEach(vencedor => {
                console.log(`  Cartela ${vencedor.cartelaIndex + 1} (${vencedor.tipo}) - Números: [${vencedor.numeros.join(', ')}]`);
            });
            break;
        }

        rodada++;
    }

    if (rodada > maxRodadas) {
        console.log(`\n⏰ Limite de ${maxRodadas} rodadas atingido. Jogo encerrado sem vencedores.`);
    }

    console.log("\n=== ANÁLISE FINAL ===");
    console.log(`Total de números sorteados: ${jogo.getNumerosSorteados().length}`);
    console.log("Números sorteados:", jogo.getNumerosSorteados());

    // Análise comparativa
    console.log("\n📊 ANÁLISE COMPARATIVA DAS ESTRATÉGIAS:");
    jogo.getCartelas().forEach((cartela, index) => {
        const tipo = cartela.getTipo();
        const numeros = cartela.getNumeros().length;
        const sorteadosPresentes = cartela.getNumeros().filter(n => jogo.getNumerosSorteados().includes(n)).length;

        console.log(`Cartela ${index + 1} (${tipo}):`);
        console.log(`  - ${numeros} números na cartela`);
        console.log(`  - ${sorteadosPresentes} números sorteados encontrados`);
        console.log(`  - Eficiência: ${(sorteadosPresentes / jogo.getNumerosSorteados().length * 100).toFixed(1)}% dos sorteados estavam na cartela`);
    });

    console.log("\n💡 INSIGHTS:");
    console.log("- Cartelas ordenadas são mais eficientes para busca em arrays grandes");
    console.log("- Cartelas não ordenadas com Set têm busca O(1) mas usam mais memória");
    console.log("- Estratégia híbrida adapta-se ao tamanho dos dados");
    console.log("- A escolha da estratégia depende do tamanho esperado dos dados!");
}

// ==================== EXECUÇÃO DOS EXERCÍCIOS ====================

function executarExerciciosDificeis(): void {
    console.log("🎯 EXERCÍCIOS DIFÍCEIS DE BUSCA E ORDENAÇÃO\n");
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
    desafioBingo();

    console.log("\n✅ Todos os exercícios difíceis foram executados!");
}

// Exportar para uso em outros módulos
export {
    TimSort,
    ArvoreAVL,
    BFS,
    DFS,
    BuscaKMP,
    Dijkstra,
    CartelaBingoOrdenada,
    CartelaBingoNaoOrdenada,
    CartelaBingoHibrida,
    JogoBingo,
    desafioBingo,
    executarExerciciosDificeis
};