/**
 * EXERCÍCIOS EXTRAS - NÍVEL AVANÇADO 🔴
 * Algoritmos complexos, estruturas de dados avançadas e otimizações
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
     * Logaritmo base 3 implementado manualmente
     */
    MathUtils.log3 = function (n) {
        if (n <= 0)
            return -Infinity;
        if (n === 1)
            return 0;
        var resultado = 0;
        var temp = n;
        while (temp > 1) {
            temp = temp / 3;
            resultado++;
        }
        // Refinamento para maior precisão
        if (temp > 0.33) {
            resultado += temp;
        }
        return resultado;
    };
    /**
     * Logaritmo natural implementado manualmente (aproximação)
     */
    MathUtils.log = function (n) {
        if (n <= 0)
            return -Infinity;
        if (n === 1)
            return 0;
        // Aproximação usando série de Taylor
        var x = (n - 1) / (n + 1);
        var x_squared = x * x;
        var resultado = x;
        var termo = x;
        for (var i = 1; i < 10; i++) {
            termo *= x_squared;
            resultado += termo / (2 * i + 1);
        }
        return 2 * resultado;
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
 * EXERCÍCIO EXTRA 7: HEAP SORT COMPLETO
 * Algoritmo baseado em árvore binária heap - O(n log n) garantido!
 */
var HeapSortCompleto = /** @class */ (function () {
    function HeapSortCompleto() {
    }
    /**
     * Heap Sort principal - sempre O(n log n), mesmo no pior caso!
     * CONCEITO: Constrói um heap máximo, depois extrai o maior elemento repetidamente
     */
    HeapSortCompleto.ordenar = function (array) {
        var _a;
        var arr = __spreadArray([], array, true); // Cópia para não modificar original
        var n = arr.length;
        console.log("🏗️  HEAP SORT - O(n log n) GARANTIDO!");
        console.log("Array inicial: [".concat(arr.join(', '), "]"));
        console.log("\n🔨 FASE 1: CONSTRUINDO HEAP MÁXIMO");
        // FASE 1: Constrói heap máximo (heapify)
        for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapificar(arr, n, i, "Heapificando a partir do \u00EDndice ".concat(i));
        }
        console.log("\n\u2705 Heap m\u00E1ximo constru\u00EDdo: [".concat(arr.join(', '), "]"));
        console.log("\n📤 FASE 2: EXTRAINDO ELEMENTOS EM ORDEM DECRESCENTE");
        // FASE 2: Extrai elementos um por um do heap
        for (var i = n - 1; i > 0; i--) {
            // Move a raiz atual (maior elemento) para o final
            _a = [arr[i], arr[0]], arr[0] = _a[0], arr[i] = _a[1];
            console.log("\n\uD83D\uDD04 Movendo maior elemento ".concat(arr[i], " para posi\u00E7\u00E3o ").concat(i));
            console.log("   Array atual: [".concat(arr.join(', '), "]"));
            // Chama heapificar na raiz reduzida
            this.heapificar(arr, i, 0, "Reheapificando ap\u00F3s remo\u00E7\u00E3o");
        }
        console.log("\n\uD83C\uDF89 RESULTADO FINAL: [".concat(arr.join(', '), "]"));
        return arr;
    };
    /**
     * Heapificar - garante propriedade de heap máximo
     * CONCEITO: Pai sempre maior que filhos
     */
    HeapSortCompleto.heapificar = function (arr, tamanho, indiceRaiz, contexto) {
        var _a;
        var maior = indiceRaiz;
        var esquerda = 2 * indiceRaiz + 1;
        var direita = 2 * indiceRaiz + 2;
        console.log("\n  \uD83D\uDD0D ".concat(contexto, " - raiz: ").concat(indiceRaiz, " (valor: ").concat(arr[indiceRaiz], ")"));
        // Verifica se filho esquerdo é maior que raiz
        if (esquerda < tamanho && arr[esquerda] > arr[maior]) {
            console.log("    \u2B05\uFE0F  Filho esquerdo ".concat(arr[esquerda], " > raiz ").concat(arr[maior]));
            maior = esquerda;
        }
        // Verifica se filho direito é maior que o maior atual
        if (direita < tamanho && arr[direita] > arr[maior]) {
            console.log("    \u27A1\uFE0F  Filho direito ".concat(arr[direita], " > maior atual ").concat(arr[maior]));
            maior = direita;
        }
        // Se maior não é raiz, troca e continua heapificando
        if (maior !== indiceRaiz) {
            console.log("    \uD83D\uDD04 Trocando ".concat(arr[indiceRaiz], " com ").concat(arr[maior]));
            _a = [arr[maior], arr[indiceRaiz]], arr[indiceRaiz] = _a[0], arr[maior] = _a[1];
            console.log("    \uD83D\uDCCA Array ap\u00F3s troca: [".concat(arr.join(', '), "]"));
            // Recursivamente heapifica a subárvore afetada
            this.heapificar(arr, tamanho, maior, "Heapificação recursiva");
        }
        else {
            console.log("    \u2705 Propriedade heap j\u00E1 satisfeita no \u00EDndice ".concat(indiceRaiz));
        }
    };
    /**
     * Visualiza a estrutura da árvore heap
     */
    HeapSortCompleto.visualizarHeap = function (array) {
        console.log("\n🌳 VISUALIZAÇÃO DA ÁRVORE HEAP:");
        console.log("Representação de árvore binária como array:");
        console.log("============================================================");
        var n = array.length;
        for (var i = 0; i < n; i++) {
            var pai = i === 0 ? "raiz" : Math.floor((i - 1) / 2);
            var esquerda = 2 * i + 1 < n ? array[2 * i + 1] : "null";
            var direita = 2 * i + 2 < n ? array[2 * i + 2] : "null";
            console.log("\u00CDndice ".concat(i, ": valor ").concat(array[i]));
            if (i > 0)
                console.log("  \uD83D\uDC46 Pai: \u00EDndice ".concat(pai, " (valor ").concat(array[pai], ")"));
            console.log("  \uD83D\uDC47 Filhos: esquerda=".concat(esquerda, ", direita=").concat(direita));
            console.log("");
        }
    };
    return HeapSortCompleto;
}());
/**
 * EXERCÍCIO EXTRA 8: ALGORITMO DE BUSCA AVANÇADA
 * Busca ternária e busca interpolada
 */
var BuscaAvancada = /** @class */ (function () {
    function BuscaAvancada() {
    }
    /**
     * Busca Ternária - divide em 3 partes ao invés de 2
     * Melhor que busca binária para alguns casos específicos
     */
    BuscaAvancada.buscaTernaria = function (array, elemento) {
        console.log("\uD83D\uDD00 BUSCA TERN\u00C1RIA: Procurando ".concat(elemento));
        console.log("Array: [".concat(array.join(', '), "]"));
        console.log("💡 CONCEITO: Divide em 3 partes ao invés de 2");
        var esquerda = 0;
        var direita = array.length - 1;
        var tentativas = 0;
        while (esquerda <= direita) {
            tentativas++;
            // Dois pontos de divisão
            var meio1 = esquerda + Math.floor((direita - esquerda) / 3);
            var meio2 = direita - Math.floor((direita - esquerda) / 3);
            console.log("\n\uD83C\uDFAF Tentativa ".concat(tentativas, ":"));
            console.log("   Intervalo: [".concat(esquerda, ", ").concat(direita, "]"));
            console.log("   Meio1: \u00EDndice ".concat(meio1, ", valor ").concat(array[meio1]));
            console.log("   Meio2: \u00EDndice ".concat(meio2, ", valor ").concat(array[meio2]));
            if (array[meio1] === elemento) {
                console.log("   \uD83C\uDF89 Encontrado no meio1! Posi\u00E7\u00E3o: ".concat(meio1));
                return meio1;
            }
            if (array[meio2] === elemento) {
                console.log("   \uD83C\uDF89 Encontrado no meio2! Posi\u00E7\u00E3o: ".concat(meio2));
                return meio2;
            }
            // Elemento está no primeiro terço
            if (elemento < array[meio1]) {
                console.log("   \u2B05\uFE0F  ".concat(elemento, " < ").concat(array[meio1], ", buscando no primeiro ter\u00E7o"));
                direita = meio1 - 1;
            }
            // Elemento está no último terço
            else if (elemento > array[meio2]) {
                console.log("   \u27A1\uFE0F  ".concat(elemento, " > ").concat(array[meio2], ", buscando no \u00FAltimo ter\u00E7o"));
                esquerda = meio2 + 1;
            }
            // Elemento está no terço do meio
            else {
                console.log("   \uD83C\uDFAF ".concat(array[meio1], " < ").concat(elemento, " < ").concat(array[meio2], ", buscando no ter\u00E7o do meio"));
                esquerda = meio1 + 1;
                direita = meio2 - 1;
            }
        }
        console.log("\n\u274C Elemento ".concat(elemento, " n\u00E3o encontrado ap\u00F3s ").concat(tentativas, " tentativas"));
        return -1;
    };
    /**
     * Busca Interpolada - "adivinha" a posição baseada no valor
     * Excelente para dados uniformemente distribuídos
     */
    BuscaAvancada.buscaInterpolada = function (array, elemento) {
        console.log("\uD83C\uDFAF BUSCA INTERPOLADA: Procurando ".concat(elemento));
        console.log("Array: [".concat(array.join(', '), "]"));
        console.log("💡 CONCEITO: 'Adivinha' a posição baseada na proporção do valor");
        var esquerda = 0;
        var direita = array.length - 1;
        var tentativas = 0;
        while (esquerda <= direita && elemento >= array[esquerda] && elemento <= array[direita]) {
            tentativas++;
            // Se só há um elemento
            if (esquerda === direita) {
                if (array[esquerda] === elemento) {
                    console.log("\n\uD83C\uDF89 Encontrado! Posi\u00E7\u00E3o: ".concat(esquerda));
                    return esquerda;
                }
                break;
            }
            // Fórmula da interpolação - estima a posição
            var proporcao = (elemento - array[esquerda]) / (array[direita] - array[esquerda]);
            var posicao = esquerda + Math.floor(proporcao * (direita - esquerda));
            console.log("\n\uD83E\uDDEE Tentativa ".concat(tentativas, ":"));
            console.log("   Intervalo: [".concat(esquerda, ", ").concat(direita, "] = valores [").concat(array[esquerda], ", ").concat(array[direita], "]"));
            console.log("   Propor\u00E7\u00E3o: (".concat(elemento, " - ").concat(array[esquerda], ") / (").concat(array[direita], " - ").concat(array[esquerda], ") = ").concat(proporcao.toFixed(3)));
            console.log("   Posi\u00E7\u00E3o estimada: ".concat(posicao, ", valor: ").concat(array[posicao]));
            if (array[posicao] === elemento) {
                console.log("   \uD83C\uDF89 Encontrado! Posi\u00E7\u00E3o: ".concat(posicao));
                return posicao;
            }
            if (array[posicao] < elemento) {
                console.log("   \u27A1\uFE0F  ".concat(array[posicao], " < ").concat(elemento, ", buscando na parte direita"));
                esquerda = posicao + 1;
            }
            else {
                console.log("   \u2B05\uFE0F  ".concat(array[posicao], " > ").concat(elemento, ", buscando na parte esquerda"));
                direita = posicao - 1;
            }
        }
        console.log("\n\u274C Elemento ".concat(elemento, " n\u00E3o encontrado ap\u00F3s ").concat(tentativas, " tentativas"));
        return -1;
    };
    /**
     * Compara eficiência de diferentes algoritmos de busca
     */
    BuscaAvancada.compararAlgoritmosBusca = function (array, elemento) {
        console.log("\n⚡ COMPARAÇÃO DE ALGORITMOS DE BUSCA");
        console.log("============================================================");
        // Simular contadores para cada algoritmo
        var tamanho = array.length;
        var maxComparacoesBinaria = MathUtils.ceil(MathUtils.log2(tamanho));
        var maxComparacoesTernaria = MathUtils.ceil(MathUtils.log3(tamanho));
        var maxComparacoesInterpolada = MathUtils.ceil(MathUtils.log2(MathUtils.log2(tamanho))); // Para distribuição uniforme
        console.log("\n\uD83D\uDCCF Para array de ".concat(tamanho, " elementos:"));
        console.log("   \uD83D\uDD0D Busca Linear: at\u00E9 ".concat(tamanho, " compara\u00E7\u00F5es"));
        console.log("   \u26A1 Busca Bin\u00E1ria: at\u00E9 ".concat(maxComparacoesBinaria, " compara\u00E7\u00F5es"));
        console.log("   \uD83D\uDD00 Busca Tern\u00E1ria: at\u00E9 ".concat(maxComparacoesTernaria, " compara\u00E7\u00F5es"));
        console.log("   \uD83C\uDFAF Busca Interpolada: at\u00E9 ".concat(maxComparacoesInterpolada, " compara\u00E7\u00F5es (distribui\u00E7\u00E3o uniforme)"));
        console.log("\n\uD83D\uDCCA QUANDO USAR CADA ALGORITMO:");
        console.log("   \uD83D\uDD0D Linear: Array pequeno ou n\u00E3o ordenado");
        console.log("   \u26A1 Bin\u00E1ria: Array ordenado, uso geral");
        console.log("   \uD83D\uDD00 Tern\u00E1ria: Arrays muito grandes, acesso custoso");
        console.log("   \uD83C\uDFAF Interpolada: Dados uniformemente distribu\u00EDdos");
    };
    return BuscaAvancada;
}());
/**
 * EXERCÍCIO EXTRA 9: ALGORITMOS HÍBRIDOS
 * Combine diferentes algoritmos para máxima eficiência
 */
var AlgoritmosHibridos = /** @class */ (function () {
    function AlgoritmosHibridos() {
    }
    /**
     * Tim Sort (inspirado no algoritmo do Python)
     * Combina Merge Sort e Insertion Sort de forma inteligente
     */
    AlgoritmosHibridos.timSortSimplificado = function (array) {
        var arr = __spreadArray([], array, true);
        var minMerge = 32;
        console.log("🚀 TIM SORT SIMPLIFICADO (inspirado no Python)");
        console.log("Array inicial: [".concat(arr.join(', '), "]"));
        console.log("\uD83D\uDCA1 CONCEITO: Insertion Sort para pequenos, Merge Sort para grandes");
        // Insertion sort para arrays pequenos
        if (arr.length < minMerge) {
            console.log("\n\uD83D\uDCCF Array pequeno (".concat(arr.length, " < ").concat(minMerge, "), usando Insertion Sort"));
            return this.insertionSortOtimizado(arr);
        }
        console.log("\n\uD83D\uDCCF Array grande, usando estrat\u00E9gia h\u00EDbrida");
        // Para arrays grandes, divide em "runs" e usa insertion sort em cada um
        var tamanhoRun = this.calcularTamanhoRun(arr.length);
        console.log("\uD83D\uDCCA Tamanho do run calculado: ".concat(tamanhoRun));
        // Ordena runs individuais com insertion sort
        for (var i = 0; i < arr.length; i += tamanhoRun) {
            var fim = Math.min(i + tamanhoRun - 1, arr.length - 1);
            console.log("\n\uD83D\uDD27 Ordenando run ".concat(Math.floor(i / tamanhoRun) + 1, ": posi\u00E7\u00F5es ").concat(i, " a ").concat(fim));
            this.insertionSortOtimizadoRange(arr, i, fim);
        }
        // Merge dos runs ordenados
        var tamanho = tamanhoRun;
        while (tamanho < arr.length) {
            for (var inicio = 0; inicio < arr.length; inicio += tamanho * 2) {
                var meio = inicio + tamanho - 1;
                var fim = Math.min(inicio + tamanho * 2 - 1, arr.length - 1);
                if (meio < fim) {
                    console.log("\n\uD83D\uDD17 Mesclando: [".concat(inicio, "..").concat(meio, "] com [").concat(meio + 1, "..").concat(fim, "]"));
                    this.merge(arr, inicio, meio, fim);
                }
            }
            tamanho *= 2;
        }
        console.log("\n\uD83C\uDF89 RESULTADO FINAL: [".concat(arr.join(', '), "]"));
        return arr;
    };
    /**
     * Calcula tamanho ótimo do run para Tim Sort
     */
    AlgoritmosHibridos.calcularTamanhoRun = function (n) {
        var r = 0;
        while (n >= 32) {
            r |= n & 1;
            n >>= 1;
        }
        return n + r;
    };
    /**
     * Insertion sort otimizado para pequenos arrays
     */
    AlgoritmosHibridos.insertionSortOtimizado = function (array) {
        console.log("  🔧 Executando Insertion Sort otimizado...");
        for (var i = 1; i < array.length; i++) {
            var chave = array[i];
            var j = i - 1;
            // Move elementos maiores uma posição à frente
            while (j >= 0 && array[j] > chave) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = chave;
        }
        console.log("  \u2705 Insertion Sort conclu\u00EDdo: [".concat(array.join(', '), "]"));
        return array;
    };
    /**
     * Insertion sort para uma faixa específica do array
     */
    AlgoritmosHibridos.insertionSortOtimizadoRange = function (array, inicio, fim) {
        for (var i = inicio + 1; i <= fim; i++) {
            var chave = array[i];
            var j = i - 1;
            while (j >= inicio && array[j] > chave) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = chave;
        }
        console.log("    \u2705 Range [".concat(inicio, "..").concat(fim, "] ordenado: [").concat(array.slice(inicio, fim + 1).join(', '), "]"));
    };
    /**
     * Merge function para Tim Sort
     */
    AlgoritmosHibridos.merge = function (array, inicio, meio, fim) {
        var esquerda = array.slice(inicio, meio + 1);
        var direita = array.slice(meio + 1, fim + 1);
        var i = 0, j = 0, k = inicio;
        while (i < esquerda.length && j < direita.length) {
            if (esquerda[i] <= direita[j]) {
                array[k] = esquerda[i];
                i++;
            }
            else {
                array[k] = direita[j];
                j++;
            }
            k++;
        }
        while (i < esquerda.length) {
            array[k] = esquerda[i];
            i++;
            k++;
        }
        while (j < direita.length) {
            array[k] = direita[j];
            j++;
            k++;
        }
    };
    /**
     * Intro Sort - Quick Sort com fallback para Heap Sort
     * Usado na biblioteca padrão do C++
     */
    AlgoritmosHibridos.introSort = function (array) {
        var arr = __spreadArray([], array, true);
        var maxDepth = 2 * Math.floor(MathUtils.log2(arr.length));
        console.log("🔀 INTRO SORT (usado no C++)");
        console.log("Array inicial: [".concat(arr.join(', '), "]"));
        console.log("\uD83D\uDCA1 CONCEITO: Quick Sort com fallback para Heap Sort se muito recursivo");
        console.log("\uD83D\uDCCA Profundidade m\u00E1xima permitida: ".concat(maxDepth));
        this.introSortRecursivo(arr, 0, arr.length - 1, maxDepth);
        console.log("\n\uD83C\uDF89 RESULTADO FINAL: [".concat(arr.join(', '), "]"));
        return arr;
    };
    AlgoritmosHibridos.introSortRecursivo = function (array, inicio, fim, profundidadeMax) {
        if (inicio < fim) {
            // Se muito profundo, usa Heap Sort
            if (profundidadeMax === 0) {
                console.log("\n\u26A0\uFE0F  Profundidade m\u00E1xima atingida, mudando para Heap Sort no range [".concat(inicio, "..").concat(fim, "]"));
                this.heapSortRange(array, inicio, fim);
                return;
            }
            // Caso contrário, usa Quick Sort
            var pivo = this.particionarIntro(array, inicio, fim);
            this.introSortRecursivo(array, inicio, pivo - 1, profundidadeMax - 1);
            this.introSortRecursivo(array, pivo + 1, fim, profundidadeMax - 1);
        }
    };
    AlgoritmosHibridos.particionarIntro = function (array, inicio, fim) {
        var _a, _b;
        var pivo = array[fim];
        var i = inicio - 1;
        for (var j = inicio; j < fim; j++) {
            if (array[j] <= pivo) {
                i++;
                _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
            }
        }
        _b = [array[fim], array[i + 1]], array[i + 1] = _b[0], array[fim] = _b[1];
        return i + 1;
    };
    AlgoritmosHibridos.heapSortRange = function (array, inicio, fim) {
        // Implementação simplificada para o range
        var temp = array.slice(inicio, fim + 1);
        HeapSortCompleto.ordenar(temp);
        for (var i = 0; i < temp.length; i++) {
            array[inicio + i] = temp[i];
        }
    };
    return AlgoritmosHibridos;
}());
// Execução dos exercícios avançados
console.log("🔴 EXERCÍCIOS EXTRAS - NÍVEL AVANÇADO");
console.log("============================================================");
console.log("\n📚 EXERCÍCIO 7: HEAP SORT COMPLETO\n");
var arrayHeap = [12, 11, 13, 5, 6, 7];
console.log("🏗️  DEMONSTRAÇÃO DO HEAP SORT:");
HeapSortCompleto.visualizarHeap(arrayHeap);
var resultadoHeap = HeapSortCompleto.ordenar(arrayHeap);
console.log("\n============================================================");
console.log("📚 EXERCÍCIO 8: ALGORITMOS DE BUSCA AVANÇADA\n");
var arrayBuscaAvancada = [2, 5, 8, 12, 16, 23, 38, 45, 67, 78, 88, 99, 101, 105, 110];
console.log("🔀 DEMONSTRAÇÃO DA BUSCA TERNÁRIA:");
BuscaAvancada.buscaTernaria(arrayBuscaAvancada, 67);
console.log("\n🎯 DEMONSTRAÇÃO DA BUSCA INTERPOLADA:");
BuscaAvancada.buscaInterpolada(arrayBuscaAvancada, 45);
BuscaAvancada.compararAlgoritmosBusca(arrayBuscaAvancada, 67);
console.log("\n============================================================");
console.log("📚 EXERCÍCIO 9: ALGORITMOS HÍBRIDOS\n");
var arrayHibrido = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42];
console.log("🚀 DEMONSTRAÇÃO DO TIM SORT:");
AlgoritmosHibridos.timSortSimplificado(arrayHibrido);
console.log("\n🔀 DEMONSTRAÇÃO DO INTRO SORT:");
AlgoritmosHibridos.introSort(__spreadArray([], arrayHibrido, true));
