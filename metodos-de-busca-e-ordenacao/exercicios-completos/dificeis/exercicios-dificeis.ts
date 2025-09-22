import {
    AlgoritmoOrdenacaoBase,
    AlgoritmoBuscaBase,
    ColecaoDados,
    ArrayUtils,
    MedidorPerformance,
    ResultadoExercicio
} from '../base/classes-base';

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
    executarExerciciosDificeis
};