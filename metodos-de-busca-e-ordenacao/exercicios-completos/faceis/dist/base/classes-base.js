"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultadoExercicio = exports.ArrayUtils = exports.MedidorPerformance = exports.ColecaoDados = exports.AlgoritmoBuscaBase = exports.AlgoritmoOrdenacaoBase = void 0;
/**
 * Classe abstrata base para algoritmos de ordenação
 */
class AlgoritmoOrdenacaoBase {
    constructor() {
        this.comparacoes = 0;
        this.trocas = 0;
    }
    /**
     * Compara dois elementos e incrementa o contador
     */
    comparar(a, b) {
        this.comparacoes++;
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    }
    /**
     * Troca dois elementos do array e incrementa o contador
     */
    trocar(array, i, j) {
        this.trocas++;
        [array[i], array[j]] = [array[j], array[i]];
    }
    /**
     * Reseta os contadores de estatísticas
     */
    resetarEstatisticas() {
        this.comparacoes = 0;
        this.trocas = 0;
    }
    /**
     * Retorna as estatísticas da última execução
     */
    getEstatisticas() {
        return {
            comparacoes: this.comparacoes,
            trocas: this.trocas
        };
    }
    /**
     * Valida se o array foi ordenado corretamente
     */
    validarOrdenacao(array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                return false;
            }
        }
        return true;
    }
}
exports.AlgoritmoOrdenacaoBase = AlgoritmoOrdenacaoBase;
/**
 * Classe abstrata base para algoritmos de busca
 */
class AlgoritmoBuscaBase {
    constructor() {
        this.comparacoes = 0;
    }
    /**
     * Compara dois elementos e incrementa o contador
     */
    comparar(a, b) {
        this.comparacoes++;
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    }
    /**
     * Reseta os contadores de estatísticas
     */
    resetarEstatisticas() {
        this.comparacoes = 0;
    }
    /**
     * Retorna as estatísticas da última execução
     */
    getEstatisticas() {
        return {
            comparacoes: this.comparacoes
        };
    }
}
exports.AlgoritmoBuscaBase = AlgoritmoBuscaBase;
/**
 * Classe para gerenciar coleções de dados com diferentes tipos
 */
class ColecaoDados {
    constructor(dados = []) {
        this.dados = [...dados];
    }
    /**
     * Adiciona um elemento à coleção
     */
    adicionar(elemento) {
        this.dados.push(elemento);
    }
    /**
     * Remove um elemento da coleção
     */
    remover(indice) {
        return this.dados.splice(indice, 1)[0];
    }
    /**
     * Retorna uma cópia dos dados
     */
    obterDados() {
        return [...this.dados];
    }
    /**
     * Retorna o tamanho da coleção
     */
    tamanho() {
        return this.dados.length;
    }
    /**
     * Limpa todos os dados
     */
    limpar() {
        this.dados = [];
    }
    /**
     * Gera dados aleatórios (para números)
     */
    gerarDadosAleatorios(quantidade, min = 0, max = 100) {
        this.dados = [];
        for (let i = 0; i < quantidade; i++) {
            this.dados.push(Math.floor(Math.random() * (max - min + 1) + min));
        }
    }
    /**
     * Verifica se a coleção está ordenada
     */
    estaOrdenada() {
        for (let i = 1; i < this.dados.length; i++) {
            if (this.dados[i] < this.dados[i - 1]) {
                return false;
            }
        }
        return true;
    }
}
exports.ColecaoDados = ColecaoDados;
/**
 * Classe para medir performance dos algoritmos
 */
class MedidorPerformance {
    /**
     * Mede o tempo de execução de uma função
     */
    static medirTempo(funcao) {
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
    static executarTestes(funcao, numeroTestes = 10) {
        const tempos = [];
        const resultados = [];
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
exports.MedidorPerformance = MedidorPerformance;
/**
 * Utilitários para trabalhar com arrays
 */
class ArrayUtils {
    /**
     * Gera um array de números sequencial
     */
    static gerarSequencial(inicio, fim) {
        const array = [];
        for (let i = inicio; i <= fim; i++) {
            array.push(i);
        }
        return array;
    }
    /**
     * Embaralha um array usando algoritmo Fisher-Yates
     */
    static embaralhar(array) {
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
    static gerarAleatorio(tamanho, min = 0, max = 100) {
        const array = [];
        for (let i = 0; i < tamanho; i++) {
            array.push(Math.floor(Math.random() * (max - min + 1) + min));
        }
        return array;
    }
    /**
     * Gera um array quase ordenado (alguns elementos fora do lugar)
     */
    static gerarQuaseOrdenado(tamanho, percentualDesordenado = 0.1) {
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
    static gerarInverso(tamanho) {
        const array = [];
        for (let i = tamanho; i >= 1; i--) {
            array.push(i);
        }
        return array;
    }
}
exports.ArrayUtils = ArrayUtils;
/**
 * Classe para representar resultados de exercícios
 */
class ResultadoExercicio {
    constructor(exercicio, entrada, saida, algoritmo, tempo, estatisticas, correto) {
        this.exercicio = exercicio;
        this.entrada = entrada;
        this.saida = saida;
        this.algoritmo = algoritmo;
        this.tempo = tempo;
        this.estatisticas = estatisticas;
        this.correto = correto;
    }
    /**
     * Exibe o resultado formatado
     */
    exibir() {
        console.log(`\n=== ${this.exercicio} ===`);
        console.log(`Algoritmo: ${this.algoritmo}`);
        console.log(`Entrada: [${this.entrada.slice(0, 10).join(', ')}${this.entrada.length > 10 ? '...' : ''}]`);
        console.log(`Saída: [${this.saida.slice(0, 10).join(', ')}${this.saida.length > 10 ? '...' : ''}]`);
        console.log(`Tempo: ${this.tempo.toFixed(4)}ms`);
        console.log(`Estatísticas:`, this.estatisticas);
        console.log(`Resultado: ${this.correto ? '✅ Correto' : '❌ Incorreto'}`);
    }
}
exports.ResultadoExercicio = ResultadoExercicio;
