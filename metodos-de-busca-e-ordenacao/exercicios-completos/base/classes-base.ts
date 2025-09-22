/**
 * Interface para definir o contrato dos algoritmos de ordenação
 */
interface IAlgoritmoOrdenacao<T> {
    ordenar(array: T[]): T[];
    getNome(): string;
    getComplexidade(): string;
    isEstavel(): boolean;
}

/**
 * Interface para definir o contrato dos algoritmos de busca
 */
interface IAlgoritmoBusca<T> {
    buscar(array: T[], elemento: T): number;
    getNome(): string;
    getComplexidade(): string;
    requerOrdenado(): boolean;
}

/**
 * Classe abstrata base para algoritmos de ordenação
 */
abstract class AlgoritmoOrdenacaoBase<T> implements IAlgoritmoOrdenacao<T> {
    protected comparacoes: number = 0;
    protected trocas: number = 0;

    abstract ordenar(array: T[]): T[];
    abstract getNome(): string;
    abstract getComplexidade(): string;
    abstract isEstavel(): boolean;

    /**
     * Compara dois elementos e incrementa o contador
     */
    protected comparar(a: T, b: T): number {
        this.comparacoes++;
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    /**
     * Troca dois elementos do array e incrementa o contador
     */
    protected trocar(array: T[], i: number, j: number): void {
        this.trocas++;
        [array[i], array[j]] = [array[j], array[i]];
    }

    /**
     * Reseta os contadores de estatísticas
     */
    protected resetarEstatisticas(): void {
        this.comparacoes = 0;
        this.trocas = 0;
    }

    /**
     * Retorna as estatísticas da última execução
     */
    getEstatisticas(): { comparacoes: number; trocas: number } {
        return {
            comparacoes: this.comparacoes,
            trocas: this.trocas
        };
    }

    /**
     * Valida se o array foi ordenado corretamente
     */
    protected validarOrdenacao(array: T[]): boolean {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Classe abstrata base para algoritmos de busca
 */
abstract class AlgoritmoBuscaBase<T> implements IAlgoritmoBusca<T> {
    protected comparacoes: number = 0;

    abstract buscar(array: T[], elemento: T): number;
    abstract getNome(): string;
    abstract getComplexidade(): string;
    abstract requerOrdenado(): boolean;

    /**
     * Compara dois elementos e incrementa o contador
     */
    protected comparar(a: T, b: T): number {
        this.comparacoes++;
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    /**
     * Reseta os contadores de estatísticas
     */
    protected resetarEstatisticas(): void {
        this.comparacoes = 0;
    }

    /**
     * Retorna as estatísticas da última execução
     */
    getEstatisticas(): { comparacoes: number } {
        return {
            comparacoes: this.comparacoes
        };
    }
}

/**
 * Classe para gerenciar coleções de dados com diferentes tipos
 */
class ColecaoDados<T> {
    private dados: T[];

    constructor(dados: T[] = []) {
        this.dados = [...dados];
    }

    /**
     * Adiciona um elemento à coleção
     */
    adicionar(elemento: T): void {
        this.dados.push(elemento);
    }

    /**
     * Remove um elemento da coleção
     */
    remover(indice: number): T | undefined {
        return this.dados.splice(indice, 1)[0];
    }

    /**
     * Retorna uma cópia dos dados
     */
    obterDados(): T[] {
        return [...this.dados];
    }

    /**
     * Retorna o tamanho da coleção
     */
    tamanho(): number {
        return this.dados.length;
    }

    /**
     * Limpa todos os dados
     */
    limpar(): void {
        this.dados = [];
    }

    /**
     * Gera dados aleatórios (para números)
     */
    gerarDadosAleatorios(quantidade: number, min: number = 0, max: number = 100): void {
        this.dados = [];
        for (let i = 0; i < quantidade; i++) {
            this.dados.push(Math.floor(Math.random() * (max - min + 1) + min) as T);
        }
    }

    /**
     * Verifica se a coleção está ordenada
     */
    estaOrdenada(): boolean {
        for (let i = 1; i < this.dados.length; i++) {
            if (this.dados[i] < this.dados[i - 1]) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Classe para medir performance dos algoritmos
 */
class MedidorPerformance {
    /**
     * Mede o tempo de execução de uma função
     */
    static medirTempo<T>(funcao: () => T): { resultado: T; tempo: number } {
        const inicio = performance.now();
        const resultado = funcao();
        const fim = performance.now();
        return {
            resultado,
            tempo: fim - inicio
        };
    }

    /**
     * Executa múltiplos testes e retorna estatísticas
     */
    static executarTestes<T>(
        funcao: () => T,
        numeroTestes: number = 10
    ): {
        tempoMedio: number;
        tempoMinimo: number;
        tempoMaximo: number;
        resultados: T[];
    } {
        const tempos: number[] = [];
        const resultados: T[] = [];

        for (let i = 0; i < numeroTestes; i++) {
            const { resultado, tempo } = this.medirTempo(funcao);
            tempos.push(tempo);
            resultados.push(resultado);
        }

        return {
            tempoMedio: tempos.reduce((a, b) => a + b, 0) / tempos.length,
            tempoMinimo: Math.min(...tempos),
            tempoMaximo: Math.max(...tempos),
            resultados
        };
    }
}

/**
 * Utilitários para trabalhar com arrays
 */
class ArrayUtils {
    /**
     * Gera um array de números sequencial
     */
    static gerarSequencial(inicio: number, fim: number): number[] {
        const array: number[] = [];
        for (let i = inicio; i <= fim; i++) {
            array.push(i);
        }
        return array;
    }

    /**
     * Embaralha um array usando algoritmo Fisher-Yates
     */
    static embaralhar<T>(array: T[]): T[] {
        const resultado = [...array];
        for (let i = resultado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
        }
        return resultado;
    }

    /**
     * Gera um array aleatório de números
     */
    static gerarAleatorio(tamanho: number, min: number = 0, max: number = 100): number[] {
        const array: number[] = [];
        for (let i = 0; i < tamanho; i++) {
            array.push(Math.floor(Math.random() * (max - min + 1) + min));
        }
        return array;
    }

    /**
     * Gera um array quase ordenado (alguns elementos fora do lugar)
     */
    static gerarQuaseOrdenado(tamanho: number, percentualDesordenado: number = 0.1): number[] {
        const array = this.gerarSequencial(1, tamanho);
        const elementosParaTrocar = Math.floor(tamanho * percentualDesordenado);
        
        for (let i = 0; i < elementosParaTrocar; i++) {
            const pos1 = Math.floor(Math.random() * tamanho);
            const pos2 = Math.floor(Math.random() * tamanho);
            [array[pos1], array[pos2]] = [array[pos2], array[pos1]];
        }
        
        return array;
    }

    /**
     * Gera um array inversamente ordenado
     */
    static gerarInverso(tamanho: number): number[] {
        const array: number[] = [];
        for (let i = tamanho; i >= 1; i--) {
            array.push(i);
        }
        return array;
    }
}

/**
 * Classe para representar resultados de exercícios
 */
class ResultadoExercicio<T> {
    constructor(
        public exercicio: string,
        public entrada: T[],
        public saida: T[],
        public algoritmo: string,
        public tempo: number,
        public estatisticas: object,
        public correto: boolean
    ) {}

    /**
     * Exibe o resultado formatado
     */
    exibir(): void {
        console.log(`\n=== ${this.exercicio} ===`);
        console.log(`Algoritmo: ${this.algoritmo}`);
        console.log(`Entrada: [${this.entrada.slice(0, 10).join(', ')}${this.entrada.length > 10 ? '...' : ''}]`);
        console.log(`Saída: [${this.saida.slice(0, 10).join(', ')}${this.saida.length > 10 ? '...' : ''}]`);
        console.log(`Tempo: ${this.tempo.toFixed(4)}ms`);
        console.log(`Estatísticas:`, this.estatisticas);
        console.log(`Resultado: ${this.correto ? '✅ Correto' : '❌ Incorreto'}`);
    }
}

export {
    IAlgoritmoOrdenacao,
    IAlgoritmoBusca,
    AlgoritmoOrdenacaoBase,
    AlgoritmoBuscaBase,
    ColecaoDados,
    MedidorPerformance,
    ArrayUtils,
    ResultadoExercicio
};