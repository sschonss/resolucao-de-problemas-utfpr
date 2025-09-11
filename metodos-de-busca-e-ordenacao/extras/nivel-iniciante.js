/**
 * EXERCÍCIOS EXTRAS - NÍVEL INICIANTE 🟢
 * Algoritmos fundamentais de busca e ordenação com explicações detalhadas
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * EXERCÍCIO EXTRA 1: BUSCA LINEAR COM VARIAÇÕES
 * Implementa diferentes versões da busca linear para ensinar conceitos básicos
 */
var BuscaLinear = /** @class */ (function () {
    function BuscaLinear() {
    }
    /**
     * Busca linear básica - encontra primeira ocorrência
     * COMPLEXIDADE: O(n) - no pior caso, percorre todo o array
     *
     * @param array - Array onde buscar
     * @param elemento - Elemento a ser encontrado
     * @returns Índice do elemento ou -1 se não encontrado
     */
    BuscaLinear.buscarPrimeiraOcorrencia = function (array, elemento) {
        console.log("\uD83D\uDD0D Buscando primeira ocorr\u00EAncia de ".concat(elemento, " em [").concat(array.join(', '), "]"));
        // Percorre o array do início ao fim
        for (var i = 0; i < array.length; i++) {
            console.log("   Verificando posi\u00E7\u00E3o ".concat(i, ": ").concat(array[i]));
            // Se encontrou o elemento, retorna o índice
            if (array[i] === elemento) {
                console.log("   \u2705 Encontrado na posi\u00E7\u00E3o ".concat(i, "!"));
                return i;
            }
        }
        console.log("   \u274C Elemento ".concat(elemento, " n\u00E3o encontrado"));
        return -1; // Não encontrado
    };
    /**
     * Busca linear - encontra todas as ocorrências
     * Útil quando um elemento pode aparecer múltiplas vezes
     *
     * @param array - Array onde buscar
     * @param elemento - Elemento a ser encontrado
     * @returns Array com todos os índices onde o elemento aparece
     */
    BuscaLinear.buscarTodasOcorrencias = function (array, elemento) {
        console.log("\uD83D\uDD0D Buscando todas as ocorr\u00EAncias de ".concat(elemento));
        var indices = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] === elemento) {
                indices.push(i);
                console.log("   \u2705 Encontrado na posi\u00E7\u00E3o ".concat(i));
            }
        }
        console.log("   \uD83D\uDCCA Total de ocorr\u00EAncias: ".concat(indices.length));
        return indices;
    };
    /**
     * Busca linear com contador de comparações
     * Demonstra como medir a eficiência de algoritmos
     */
    BuscaLinear.buscarComContador = function (array, elemento) {
        console.log("\uD83D\uDD0D Busca com contador de compara\u00E7\u00F5es");
        var comparacoes = 0;
        for (var i = 0; i < array.length; i++) {
            comparacoes++; // Conta cada comparação
            console.log("   Compara\u00E7\u00E3o ".concat(comparacoes, ": array[").concat(i, "] = ").concat(array[i], " == ").concat(elemento, "?"));
            if (array[i] === elemento) {
                console.log("   \u2705 Encontrado ap\u00F3s ".concat(comparacoes, " compara\u00E7\u00F5es"));
                return { indice: i, comparacoes: comparacoes };
            }
        }
        console.log("   \u274C N\u00E3o encontrado ap\u00F3s ".concat(comparacoes, " compara\u00E7\u00F5es"));
        return { indice: -1, comparacoes: comparacoes };
    };
    return BuscaLinear;
}());
/**
 * EXERCÍCIO EXTRA 2: BUBBLE SORT EDUCATIVO
 * Implementação didática do Bubble Sort com visualização completa
 */
var BubbleSortEducativo = /** @class */ (function () {
    function BubbleSortEducativo() {
    }
    /**
     * Bubble Sort básico com explicação passo a passo
     * IDEIA: "Bolhas" (elementos maiores) "sobem" para o final do array
     * COMPLEXIDADE: O(n²) - dois loops aninhados
     */
    BubbleSortEducativo.ordenar = function (array) {
        var _a;
        var arr = __spreadArray([], array, true); // Cria cópia para não modificar o original
        var passos = [];
        var comparacoes = 0;
        var trocas = 0;
        passos.push("\uD83E\uDEE7 BUBBLE SORT - Array inicial: [".concat(arr.join(', '), "]"));
        passos.push("\uD83D\uDCA1 Conceito: Elementos maiores \"sobem\" como bolhas");
        passos.push("\uD83D\uDCCF Tamanho do array: ".concat(arr.length, " elementos"));
        passos.push("");
        // Loop externo - determina quantas "passadas" fazer
        for (var i = 0; i < arr.length - 1; i++) {
            passos.push("--- PASSADA ".concat(i + 1, " ---"));
            var trocouNestaPassada = false;
            // Loop interno - compara elementos adjacentes
            // Nota: arr.length - 1 - i porque os últimos i elementos já estão ordenados
            for (var j = 0; j < arr.length - 1 - i; j++) {
                comparacoes++;
                passos.push("Comparando posi\u00E7\u00F5es ".concat(j, " e ").concat(j + 1, ": ").concat(arr[j], " vs ").concat(arr[j + 1]));
                // Se elemento atual é maior que o próximo, troca
                if (arr[j] > arr[j + 1]) {
                    // Troca os elementos
                    _a = [arr[j + 1], arr[j]], arr[j] = _a[0], arr[j + 1] = _a[1];
                    trocas++;
                    trocouNestaPassada = true;
                    passos.push("   \u2194\uFE0F TROCA! ".concat(arr[j + 1], " e ").concat(arr[j], " \u2192 [").concat(arr.join(', '), "]"));
                }
                else {
                    passos.push("   \u2705 J\u00E1 est\u00E3o em ordem");
                }
            }
            if (!trocouNestaPassada) {
                passos.push("\uD83C\uDFAF OTIMIZA\u00C7\u00C3O: N\u00E3o houve trocas nesta passada - array j\u00E1 est\u00E1 ordenado!");
                break;
            }
            passos.push("Fim da passada ".concat(i + 1, ": [").concat(arr.join(', '), "]"));
            passos.push("");
        }
        var estatisticas = {
            comparacoes: comparacoes,
            trocas: trocas,
            complexidadeAtual: "O(".concat(comparacoes, ")"),
            complexidadeTeorica: 'O(n²)'
        };
        passos.push("\uD83D\uDCCA ESTAT\u00CDSTICAS FINAIS:");
        passos.push("   Compara\u00E7\u00F5es: ".concat(comparacoes));
        passos.push("   Trocas: ".concat(trocas));
        passos.push("   Array ordenado: [".concat(arr.join(', '), "]"));
        return { arrayFinal: arr, passos: passos, estatisticas: estatisticas };
    };
    /**
     * Demonstra o Bubble Sort em diferentes cenários
     */
    BubbleSortEducativo.demonstrarCenarios = function () {
        console.log("🎓 BUBBLE SORT - ANÁLISE DE DIFERENTES CENÁRIOS\n");
        // Cenário 1: Array em ordem decrescente (pior caso)
        console.log("📉 CENÁRIO 1: Pior caso (ordem decrescente)");
        var resultado1 = this.ordenar([5, 4, 3, 2, 1]);
        console.log("Resultado: ".concat(resultado1.estatisticas.comparacoes, " compara\u00E7\u00F5es, ").concat(resultado1.estatisticas.trocas, " trocas\n"));
        // Cenário 2: Array já ordenado (melhor caso)
        console.log("📈 CENÁRIO 2: Melhor caso (já ordenado)");
        var resultado2 = this.ordenar([1, 2, 3, 4, 5]);
        console.log("Resultado: ".concat(resultado2.estatisticas.comparacoes, " compara\u00E7\u00F5es, ").concat(resultado2.estatisticas.trocas, " trocas\n"));
        // Cenário 3: Array aleatório (caso médio)
        console.log("🎲 CENÁRIO 3: Caso médio (ordem aleatória)");
        var resultado3 = this.ordenar([3, 1, 4, 2, 5]);
        console.log("Resultado: ".concat(resultado3.estatisticas.comparacoes, " compara\u00E7\u00F5es, ").concat(resultado3.estatisticas.trocas, " trocas\n"));
        // Comparação
        console.log("📊 COMPARAÇÃO DOS CENÁRIOS:");
        console.log("┌─────────────────┬─────────────┬─────────┐");
        console.log("│ Cenário         │ Comparações │ Trocas  │");
        console.log("├─────────────────┼─────────────┼─────────┤");
        console.log("\u2502 Pior caso       \u2502 ".concat(resultado1.estatisticas.comparacoes.toString().padStart(11), " \u2502 ").concat(resultado1.estatisticas.trocas.toString().padStart(7), " \u2502"));
        console.log("\u2502 Melhor caso     \u2502 ".concat(resultado2.estatisticas.comparacoes.toString().padStart(11), " \u2502 ").concat(resultado2.estatisticas.trocas.toString().padStart(7), " \u2502"));
        console.log("\u2502 Caso m\u00E9dio      \u2502 ".concat(resultado3.estatisticas.comparacoes.toString().padStart(11), " \u2502 ").concat(resultado3.estatisticas.trocas.toString().padStart(7), " \u2502"));
        console.log("└─────────────────┴─────────────┴─────────┘");
    };
    return BubbleSortEducativo;
}());
/**
 * EXERCÍCIO EXTRA 3: INSERTION SORT DETALHADO
 * Simula como uma pessoa ordenaria cartas na mão
 */
var InsertionSortEducativo = /** @class */ (function () {
    function InsertionSortEducativo() {
    }
    /**
     * Insertion Sort com analogia das cartas
     * IDEIA: Pega cada carta e insere na posição correta entre as já ordenadas
     * COMPLEXIDADE: O(n²) no pior caso, O(n) no melhor caso
     */
    InsertionSortEducativo.ordenarComCartas = function (array) {
        var arr = __spreadArray([], array, true);
        console.log("\uD83C\uDCCF INSERTION SORT - Simulando ordena\u00E7\u00E3o de cartas");
        console.log("Cartas iniciais: [".concat(arr.join(', '), "]\n"));
        console.log("\uD83D\uDCA1 CONCEITO: Como ordenar cartas na sua m\u00E3o");
        console.log("1. Come\u00E7amos com a primeira carta (j\u00E1 est\u00E1 \"ordenada\")");
        console.log("2. Pegamos a pr\u00F3xima carta");
        console.log("3. Inserimos na posi\u00E7\u00E3o correta entre as cartas j\u00E1 ordenadas");
        console.log("4. Repetimos at\u00E9 acabar as cartas\n");
        // Começamos do segundo elemento (índice 1)
        for (var i = 1; i < arr.length; i++) {
            var cartaAtual = arr[i];
            console.log("--- RODADA ".concat(i, " ---"));
            console.log("\uD83C\uDCCF Pegando carta: ".concat(cartaAtual));
            console.log("\uD83D\uDCCB Cartas j\u00E1 ordenadas: [".concat(arr.slice(0, i).join(', '), "]"));
            // Encontra a posição correta para inserir
            var j = i - 1;
            console.log("\uD83D\uDD0D Procurando posi\u00E7\u00E3o correta para ".concat(cartaAtual, ":"));
            // Move cartas maiores para a direita
            while (j >= 0 && arr[j] > cartaAtual) {
                console.log("   ".concat(arr[j], " > ").concat(cartaAtual, ", movendo ").concat(arr[j], " para direita"));
                arr[j + 1] = arr[j];
                j--;
            }
            // Insere a carta na posição correta
            arr[j + 1] = cartaAtual;
            console.log("   \u2705 Inserindo ".concat(cartaAtual, " na posi\u00E7\u00E3o ").concat(j + 1));
            console.log("\uD83D\uDCCB Cartas ap\u00F3s inser\u00E7\u00E3o: [".concat(arr.join(', '), "]\n"));
        }
        console.log("\uD83C\uDFAF Todas as cartas ordenadas: [".concat(arr.join(', '), "]"));
    };
    /**
     * Versão com métricas detalhadas
     */
    InsertionSortEducativo.ordenarComMetricas = function (array) {
        var arr = __spreadArray([], array, true);
        var comparacoes = 0;
        var movimentacoes = 0;
        for (var i = 1; i < arr.length; i++) {
            var chave = arr[i];
            var j = i - 1;
            while (j >= 0) {
                comparacoes++;
                if (arr[j] > chave) {
                    arr[j + 1] = arr[j];
                    movimentacoes++;
                    j--;
                }
                else {
                    break;
                }
            }
            if (j + 1 !== i) {
                movimentacoes++; // Inserção da chave
            }
            arr[j + 1] = chave;
        }
        return {
            arrayOrdenado: arr,
            comparacoes: comparacoes,
            movimentacoes: movimentacoes,
            eficiencia: comparacoes + movimentacoes
        };
    };
    return InsertionSortEducativo;
}());
// Execução dos exercícios iniciantes
console.log("🟢 EXERCÍCIOS EXTRAS - NÍVEL INICIANTE");
console.log("============================================================");
console.log("\n📚 EXERCÍCIO 1: BUSCA LINEAR COM VARIAÇÕES\n");
var arrayBuscaTeste = [3, 7, 2, 9, 7, 1, 7, 4];
// Teste 1: Busca primeira ocorrência
console.log("🔍 TESTE 1: Primeira ocorrência");
BuscaLinear.buscarPrimeiraOcorrencia(arrayBuscaTeste, 7);
console.log("\n🔍 TESTE 2: Todas as ocorrências");
BuscaLinear.buscarTodasOcorrencias(arrayBuscaTeste, 7);
console.log("\n🔍 TESTE 3: Busca com contador");
BuscaLinear.buscarComContador(arrayBuscaTeste, 9);
console.log("\n============================================================");
console.log("📚 EXERCÍCIO 2: BUBBLE SORT EDUCATIVO\n");
BubbleSortEducativo.demonstrarCenarios();
console.log("\n============================================================");
console.log("📚 EXERCÍCIO 3: INSERTION SORT DETALHADO\n");
InsertionSortEducativo.ordenarComCartas([5, 2, 8, 1, 9]);
console.log("\n📊 COMPARAÇÃO INSERTION SORT:");
var exemploArray = [4, 3, 2, 1];
var resultado = InsertionSortEducativo.ordenarComMetricas(exemploArray);
console.log("Array [".concat(exemploArray.join(', '), "] \u2192 [").concat(resultado.arrayOrdenado.join(', '), "]"));
console.log("Compara\u00E7\u00F5es: ".concat(resultado.comparacoes, ", Movimenta\u00E7\u00F5es: ").concat(resultado.movimentacoes));
