/**
 * EXERCÍCIOS EXTRAS - NÍVEL INTERMEDIÁRIO 🟡
 * Algoritmos mais eficientes e técnicas avançadas de busca e ordenação
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
 * FUNÇÕES AUXILIARES MATEMÁTICAS
 * Implementações manuais para compatibilidade
 */
var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    /**
     * Logaritmo base 2 implementado manualmente
     */
    MathUtils.log2 = function (n) {
        if (n <= 0)
            return -Infinity;
        if (n === 1)
            return 0;
        var resultado = 0;
        var temp = n;
        // Usando logaritmo natural: log2(n) = ln(n) / ln(2)
        // Implementação aproximada do logaritmo natural
        while (temp > 1) {
            temp = temp / 2;
            resultado++;
        }
        // Refinamento para maior precisão
        if (temp > 0.5) {
            resultado += temp;
        }
        return resultado;
    };
    /**
     * Math.ceil implementado manualmente
     */
    MathUtils.ceil = function (n) {
        var intPart = Math.floor(n);
        return (n > intPart) ? intPart + 1 : intPart;
    };
    /**
     * Math.round implementado manualmente
     */
    MathUtils.round = function (n) {
        return Math.floor(n + 0.5);
    };
    /**
     * Repetir string implementado manualmente
     */
    MathUtils.repeat = function (str, count) {
        var resultado = "";
        for (var i = 0; i < count; i++) {
            resultado += str;
        }
        return resultado;
    };
    return MathUtils;
}());
/**
 * EXERCÍCIO EXTRA 4: MERGE SORT EDUCATIVO
 * Algoritmo "Dividir para Conquistar" - O(n log n)
 * Um dos algoritmos mais importantes da computação!
 */
var MergeSortEducativo = /** @class */ (function () {
    function MergeSortEducativo() {
    }
    /**
     * Merge Sort principal com visualização completa
     * CONCEITO: Divide o array ao meio até ter elementos únicos, depois mescla ordenadamente
     * COMPLEXIDADE: O(n log n) - muito melhor que O(n²)!
     */
    MergeSortEducativo.ordenar = function (array, nivel) {
        if (nivel === void 0) { nivel = 0; }
        var indentacao = MathUtils.repeat("  ", nivel);
        console.log("".concat(indentacao, "\uD83D\uDD38 DIVIS\u00C3O n\u00EDvel ").concat(nivel, ": [").concat(array.join(', '), "]"));
        // CASO BASE: Se o array tem 1 ou 0 elementos, já está ordenado
        if (array.length <= 1) {
            console.log("".concat(indentacao, "   \u2705 Caso base: array com ").concat(array.length, " elemento(s)"));
            return array;
        }
        // DIVISÃO: Divide o array ao meio
        var meio = Math.floor(array.length / 2);
        var esquerda = array.slice(0, meio);
        var direita = array.slice(meio);
        console.log("".concat(indentacao, "   \u2199\uFE0F  Esquerda: [").concat(esquerda.join(', '), "]"));
        console.log("".concat(indentacao, "   \u2198\uFE0F  Direita: [").concat(direita.join(', '), "]"));
        // CONQUISTA: Ordena recursivamente cada metade
        var esquerdaOrdenada = this.ordenar(esquerda, nivel + 1);
        var direitaOrdenada = this.ordenar(direita, nivel + 1);
        // COMBINAÇÃO: Mescla as duas metades ordenadas
        var resultado = this.mesclar(esquerdaOrdenada, direitaOrdenada, nivel);
        console.log("".concat(indentacao, "\uD83D\uDD39 RESULTADO n\u00EDvel ").concat(nivel, ": [").concat(resultado.join(', '), "]"));
        return resultado;
    };
    /**
     * Mescla duas arrays ordenadas em uma array ordenada
     * ESTA É A PARTE MÁGICA DO MERGE SORT!
     */
    MergeSortEducativo.mesclar = function (esquerda, direita, nivel) {
        var indentacao = MathUtils.repeat("  ", nivel);
        var resultado = [];
        var i = 0, j = 0;
        console.log("".concat(indentacao, "   \uD83D\uDD00 MESCLANDO: [").concat(esquerda.join(', '), "] + [").concat(direita.join(', '), "]"));
        // Compara elemento por elemento e pega o menor
        while (i < esquerda.length && j < direita.length) {
            if (esquerda[i] <= direita[j]) {
                resultado.push(esquerda[i]);
                console.log("".concat(indentacao, "      ").concat(esquerda[i], " \u2264 ").concat(direita[j], " \u2192 pegando ").concat(esquerda[i]));
                i++;
            }
            else {
                resultado.push(direita[j]);
                console.log("".concat(indentacao, "      ").concat(esquerda[i], " > ").concat(direita[j], " \u2192 pegando ").concat(direita[j]));
                j++;
            }
        }
        // Adiciona elementos restantes (se houver)
        while (i < esquerda.length) {
            resultado.push(esquerda[i]);
            console.log("".concat(indentacao, "      Restante da esquerda: ").concat(esquerda[i]));
            i++;
        }
        while (j < direita.length) {
            resultado.push(direita[j]);
            console.log("".concat(indentacao, "      Restante da direita: ").concat(direita[j]));
            j++;
        }
        console.log("".concat(indentacao, "   \u2705 Mesclagem conclu\u00EDda: [").concat(resultado.join(', '), "]"));
        return resultado;
    };
    /**
     * Análise de complexidade do Merge Sort
     */
    MergeSortEducativo.analisarComplexidade = function (tamanhos) {
        console.log("\n📊 ANÁLISE DE COMPLEXIDADE DO MERGE SORT");
        console.log("Comparando com outros algoritmos O(n²)");
        console.log("============================================================");
        tamanhos.forEach(function (n) {
            var operacoesMerge = n * MathUtils.log2(n);
            var operacoesBubble = n * n;
            var melhoria = operacoesBubble / operacoesMerge;
            console.log("\n\uD83D\uDCCF Array de tamanho ".concat(n, ":"));
            console.log("   Merge Sort (n log n): ~".concat(MathUtils.round(operacoesMerge), " opera\u00E7\u00F5es"));
            console.log("   Bubble Sort (n\u00B2): ~".concat(operacoesBubble, " opera\u00E7\u00F5es"));
            console.log("   \uD83D\uDE80 Merge Sort \u00E9 ".concat(melhoria.toFixed(1), "x mais r\u00E1pido!"));
        });
    };
    return MergeSortEducativo;
}());
/**
 * EXERCÍCIO EXTRA 5: BUSCA BINÁRIA INTERATIVA
 * Algoritmo O(log n) - muito eficiente para arrays ordenados!
 */
var BuscaBinariaInterativa = /** @class */ (function () {
    function BuscaBinariaInterativa() {
    }
    /**
     * Busca binária com explicação detalhada
     * CONCEITO: "Chute inteligente" - sempre elimina metade das possibilidades
     * PRÉ-REQUISITO: Array deve estar ordenado!
     */
    BuscaBinariaInterativa.buscar = function (array, elemento) {
        console.log("\uD83C\uDFAF BUSCA BIN\u00C1RIA: Procurando ".concat(elemento, " em [").concat(array.join(', '), "]"));
        console.log("\uD83D\uDCA1 CONCEITO: Eliminar metade das possibilidades a cada compara\u00E7\u00E3o");
        console.log("\u26A0\uFE0F  PR\u00C9-REQUISITO: Array deve estar ordenado!");
        var inicio = 0;
        var fim = array.length - 1;
        var tentativas = 0;
        while (inicio <= fim) {
            tentativas++;
            var meio = Math.floor((inicio + fim) / 2);
            var valorMeio = array[meio];
            console.log("\n\uD83D\uDD0D TENTATIVA ".concat(tentativas, ":"));
            console.log("   Intervalo: posi\u00E7\u00F5es ".concat(inicio, " a ").concat(fim));
            console.log("   Meio: posi\u00E7\u00E3o ".concat(meio, ", valor ").concat(valorMeio));
            console.log("   Comparando: ".concat(valorMeio, " com ").concat(elemento));
            if (valorMeio === elemento) {
                console.log("   \uD83C\uDF89 ENCONTRADO! Elemento ".concat(elemento, " est\u00E1 na posi\u00E7\u00E3o ").concat(meio));
                console.log("   \uD83D\uDCCA Total de tentativas: ".concat(tentativas));
                console.log("   \uD83D\uDE80 Efici\u00EAncia: O(log n) = ".concat(MathUtils.ceil(MathUtils.log2(array.length)), " tentativas m\u00E1ximas"));
                return meio;
            }
            else if (valorMeio < elemento) {
                console.log("   \u27A1\uFE0F  ".concat(valorMeio, " < ").concat(elemento, ", procurando na metade direita"));
                inicio = meio + 1;
            }
            else {
                console.log("   \u2B05\uFE0F  ".concat(valorMeio, " > ").concat(elemento, ", procurando na metade esquerda"));
                fim = meio - 1;
            }
            console.log("   Novo intervalo: posi\u00E7\u00F5es ".concat(inicio, " a ").concat(fim));
        }
        console.log("\n\u274C Elemento ".concat(elemento, " n\u00E3o encontrado ap\u00F3s ").concat(tentativas, " tentativas"));
        return -1;
    };
    /**
     * Compara busca binária com busca linear
     */
    BuscaBinariaInterativa.compararComBuscaLinear = function (array, elemento) {
        console.log("\n\u26A1 COMPARA\u00C7\u00C3O: BUSCA BIN\u00C1RIA vs BUSCA LINEAR");
        console.log("Array de ".concat(array.length, " elementos, buscando ").concat(elemento));
        console.log("============================================================");
        // Busca Linear
        console.log("\n\uD83D\uDCCD BUSCA LINEAR:");
        var comparacoesLinear = 0;
        var indiceLinear = -1;
        for (var i = 0; i < array.length; i++) {
            comparacoesLinear++;
            if (array[i] === elemento) {
                indiceLinear = i;
                break;
            }
        }
        console.log("   Compara\u00E7\u00F5es: ".concat(comparacoesLinear));
        console.log("   Resultado: ".concat(indiceLinear >= 0 ? "encontrado na posi\u00E7\u00E3o ".concat(indiceLinear) : 'não encontrado'));
        // Busca Binária
        console.log("\n\uD83C\uDFAF BUSCA BIN\u00C1RIA:");
        var inicio = 0, fim = array.length - 1, comparacoesBinaria = 0, indiceBinario = -1;
        while (inicio <= fim) {
            comparacoesBinaria++;
            var meio = Math.floor((inicio + fim) / 2);
            if (array[meio] === elemento) {
                indiceBinario = meio;
                break;
            }
            else if (array[meio] < elemento) {
                inicio = meio + 1;
            }
            else {
                fim = meio - 1;
            }
        }
        console.log("   Compara\u00E7\u00F5es: ".concat(comparacoesBinaria));
        console.log("   Resultado: ".concat(indiceBinario >= 0 ? "encontrado na posi\u00E7\u00E3o ".concat(indiceBinario) : 'não encontrado'));
        // Resumo
        var eficiencia = comparacoesLinear / comparacoesBinaria;
        console.log("\n\uD83D\uDCCA RESUMO:");
        console.log("   Busca bin\u00E1ria \u00E9 ".concat(eficiencia.toFixed(1), "x mais eficiente!"));
        console.log("   Para array de ".concat(array.length, " elementos:"));
        console.log("   - Linear: at\u00E9 ".concat(array.length, " compara\u00E7\u00F5es"));
        console.log("   - Bin\u00E1ria: at\u00E9 ".concat(MathUtils.ceil(MathUtils.log2(array.length)), " compara\u00E7\u00F5es"));
    };
    return BuscaBinariaInterativa;
}());
/**
 * EXERCÍCIO EXTRA 6: QUICK SORT EXPLICADO
 * Algoritmo muito eficiente na prática - O(n log n) em média
 */
var QuickSortExplicado = /** @class */ (function () {
    function QuickSortExplicado() {
    }
    /**
     * Quick Sort com visualização completa
     * CONCEITO: Escolhe um "pivô" e organiza elementos menores à esquerda, maiores à direita
     */
    QuickSortExplicado.ordenar = function (array, inicio, fim, nivel) {
        if (inicio === void 0) { inicio = 0; }
        if (fim === void 0) { fim = array.length - 1; }
        if (nivel === void 0) { nivel = 0; }
        var indentacao = MathUtils.repeat("  ", nivel);
        if (inicio < fim) {
            console.log("".concat(indentacao, "\uD83C\uDFAF QUICK SORT n\u00EDvel ").concat(nivel, ": array[").concat(inicio, "..").concat(fim, "] = [").concat(array.slice(inicio, fim + 1).join(', '), "]"));
            // PARTICIONAMENTO: Organiza o array em torno do pivô
            var indicePivo = this.particionar(array, inicio, fim, nivel);
            console.log("".concat(indentacao, "\uD83D\uDCCD Piv\u00F4 ").concat(array[indicePivo], " na posi\u00E7\u00E3o ").concat(indicePivo, ", array: [").concat(array.join(', '), "]"));
            // RECURSÃO: Ordena as duas partes
            console.log("".concat(indentacao, "\u2B05\uFE0F  Ordenando parte esquerda: [").concat(array.slice(inicio, indicePivo).join(', '), "]"));
            this.ordenar(array, inicio, indicePivo - 1, nivel + 1);
            console.log("".concat(indentacao, "\u27A1\uFE0F  Ordenando parte direita: [").concat(array.slice(indicePivo + 1, fim + 1).join(', '), "]"));
            this.ordenar(array, indicePivo + 1, fim, nivel + 1);
            console.log("".concat(indentacao, "\u2705 Conclu\u00EDdo n\u00EDvel ").concat(nivel, ": [").concat(array.slice(inicio, fim + 1).join(', '), "]"));
        }
        return array;
    };
    /**
     * Particionamento - a parte mais importante do Quick Sort
     * Organiza elementos menores que o pivô à esquerda, maiores à direita
     */
    QuickSortExplicado.particionar = function (array, inicio, fim, nivel) {
        var _a, _b;
        var indentacao = MathUtils.repeat("  ", nivel);
        var pivo = array[fim]; // Escolhemos o último elemento como pivô
        console.log("".concat(indentacao, "  \uD83C\uDFB2 Piv\u00F4 escolhido: ").concat(pivo, " (posi\u00E7\u00E3o ").concat(fim, ")"));
        var i = inicio - 1; // Índice do menor elemento
        for (var j = inicio; j < fim; j++) {
            console.log("".concat(indentacao, "  \uD83D\uDD0D Comparando ").concat(array[j], " com piv\u00F4 ").concat(pivo));
            // Se elemento atual é menor ou igual ao pivô
            if (array[j] <= pivo) {
                i++;
                _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1]; // Troca
                console.log("".concat(indentacao, "    \u2194\uFE0F ").concat(array[j], " \u2264 ").concat(pivo, ", trocando posi\u00E7\u00F5es ").concat(i, " e ").concat(j, ": [").concat(array.join(', '), "]"));
            }
            else {
                console.log("".concat(indentacao, "    \u27A1\uFE0F ").concat(array[j], " > ").concat(pivo, ", mantendo \u00E0 direita"));
            }
        }
        // Coloca o pivô na posição correta
        _b = [array[fim], array[i + 1]], array[i + 1] = _b[0], array[fim] = _b[1];
        console.log("".concat(indentacao, "  \uD83C\uDFAF Colocando piv\u00F4 ").concat(pivo, " na posi\u00E7\u00E3o correta ").concat(i + 1, ": [").concat(array.join(', '), "]"));
        return i + 1; // Retorna a posição do pivô
    };
    /**
     * Demonstra diferentes estratégias de escolha de pivô
     */
    QuickSortExplicado.demonstrarEstrategiasPivo = function () {
        console.log("\n🎲 ESTRATÉGIAS DE ESCOLHA DE PIVÔ NO QUICK SORT");
        console.log("============================================================");
        var arrayTeste = [3, 6, 8, 10, 1, 2, 1];
        console.log("Array teste: [".concat(arrayTeste.join(', '), "]"));
        console.log("\n📋 DIFERENTES ESTRATÉGIAS:");
        console.log("1. 🎯 Último elemento (mais comum)");
        console.log("2. 🎯 Primeiro elemento");
        console.log("3. 🎯 Elemento do meio");
        console.log("4. 🎯 Mediana de três (primeiro, meio, último)");
        console.log("5. 🎯 Elemento aleatório");
        console.log("\n💡 DICAS:");
        console.log("• Pivô ruim = O(n²) no pior caso");
        console.log("• Pivô bom = O(n log n) em média");
        console.log("• Array já ordenado é pior caso para pivô fixo");
        console.log("• Mediana de três é uma boa estratégia prática");
    };
    return QuickSortExplicado;
}());
// Execução dos exercícios intermediários
console.log("🟡 EXERCÍCIOS EXTRAS - NÍVEL INTERMEDIÁRIO");
console.log("============================================================");
console.log("\n📚 EXERCÍCIO 4: MERGE SORT EDUCATIVO\n");
console.log("🔥 DEMONSTRAÇÃO DO MERGE SORT:");
var arrayMerge = [38, 27, 43, 3, 9, 82, 10];
console.log("Array inicial: [".concat(arrayMerge.join(', '), "]\n"));
var resultadoMerge = MergeSortEducativo.ordenar(__spreadArray([], arrayMerge, true));
console.log("\n\uD83C\uDF89 RESULTADO FINAL: [".concat(resultadoMerge.join(', '), "]"));
MergeSortEducativo.analisarComplexidade([10, 100, 1000, 10000]);
console.log("\n============================================================");
console.log("📚 EXERCÍCIO 5: BUSCA BINÁRIA INTERATIVA\n");
var arrayBinariaDemo = [2, 5, 8, 12, 16, 23, 38, 45, 67, 78, 88, 99];
console.log("🔍 DEMONSTRAÇÃO DA BUSCA BINÁRIA:");
BuscaBinariaInterativa.buscar(arrayBinariaDemo, 23);
BuscaBinariaInterativa.compararComBuscaLinear(arrayBinariaDemo, 67);
console.log("\n============================================================");
console.log("📚 EXERCÍCIO 6: QUICK SORT EXPLICADO\n");
var arrayQuick = [10, 7, 8, 9, 1, 5];
console.log("⚡ DEMONSTRAÇÃO DO QUICK SORT:");
console.log("Array inicial: [".concat(arrayQuick.join(', '), "]\n"));
var resultadoQuick = QuickSortExplicado.ordenar(__spreadArray([], arrayQuick, true));
console.log("\n\uD83C\uDF89 RESULTADO FINAL: [".concat(resultadoQuick.join(', '), "]"));
QuickSortExplicado.demonstrarEstrategiasPivo();
