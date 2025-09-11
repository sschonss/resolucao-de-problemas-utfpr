/**
 * EXERCÍCIOS EXTRAS - NÍVEL AVANÇADO 🔴
 * Algoritmos complexos, estruturas de dados avançadas e otimizações
 */

/**
 * EXERCÍCIO EXTRA 7: HEAP SORT COMPLETO
 * Algoritmo baseado em árvore binária heap - O(n log n) garantido!
 */
class HeapSortCompleto {
    
    /**
     * Heap Sort principal - sempre O(n log n), mesmo no pior caso!
     * CONCEITO: Constrói um heap máximo, depois extrai o maior elemento repetidamente
     */
    static ordenar(array: number[]): number[] {
        const arr = [...array]; // Cópia para não modificar original
        const n = arr.length;
        
        console.log("🏗️  HEAP SORT - O(n log n) GARANTIDO!");
        console.log(`Array inicial: [${arr.join(', ')}]`);
        console.log("\n🔨 FASE 1: CONSTRUINDO HEAP MÁXIMO");
        
        // FASE 1: Constrói heap máximo (heapify)
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapificar(arr, n, i, `Heapificando a partir do índice ${i}`);
        }
        
        console.log(`\n✅ Heap máximo construído: [${arr.join(', ')}]`);
        console.log("\n📤 FASE 2: EXTRAINDO ELEMENTOS EM ORDEM DECRESCENTE");
        
        // FASE 2: Extrai elementos um por um do heap
        for (let i = n - 1; i > 0; i--) {
            // Move a raiz atual (maior elemento) para o final
            [arr[0], arr[i]] = [arr[i], arr[0]];
            console.log(`\n🔄 Movendo maior elemento ${arr[i]} para posição ${i}`);
            console.log(`   Array atual: [${arr.join(', ')}]`);
            
            // Chama heapificar na raiz reduzida
            this.heapificar(arr, i, 0, `Reheapificando após remoção`);
        }
        
        console.log(`\n🎉 RESULTADO FINAL: [${arr.join(', ')}]`);
        return arr;
    }
    
    /**
     * Heapificar - garante propriedade de heap máximo
     * CONCEITO: Pai sempre maior que filhos
     */
    private static heapificar(arr: number[], tamanho: number, indiceRaiz: number, contexto: string): void {
        let maior = indiceRaiz;
        const esquerda = 2 * indiceRaiz + 1;
        const direita = 2 * indiceRaiz + 2;
        
        console.log(`\n  🔍 ${contexto} - raiz: ${indiceRaiz} (valor: ${arr[indiceRaiz]})`);
        
        // Verifica se filho esquerdo é maior que raiz
        if (esquerda < tamanho && arr[esquerda] > arr[maior]) {
            console.log(`    ⬅️  Filho esquerdo ${arr[esquerda]} > raiz ${arr[maior]}`);
            maior = esquerda;
        }
        
        // Verifica se filho direito é maior que o maior atual
        if (direita < tamanho && arr[direita] > arr[maior]) {
            console.log(`    ➡️  Filho direito ${arr[direita]} > maior atual ${arr[maior]}`);
            maior = direita;
        }
        
        // Se maior não é raiz, troca e continua heapificando
        if (maior !== indiceRaiz) {
            console.log(`    🔄 Trocando ${arr[indiceRaiz]} com ${arr[maior]}`);
            [arr[indiceRaiz], arr[maior]] = [arr[maior], arr[indiceRaiz]];
            console.log(`    📊 Array após troca: [${arr.join(', ')}]`);
            
            // Recursivamente heapifica a subárvore afetada
            this.heapificar(arr, tamanho, maior, "Heapificação recursiva");
        } else {
            console.log(`    ✅ Propriedade heap já satisfeita no índice ${indiceRaiz}`);
        }
    }
    
    /**
     * Visualiza a estrutura da árvore heap
     */
    static visualizarHeap(array: number[]): void {
        console.log("\n🌳 VISUALIZAÇÃO DA ÁRVORE HEAP:");
        console.log("Representação de árvore binária como array:");
        console.log("============================================================");
        
        const n = array.length;
        
        for (let i = 0; i < n; i++) {
            const pai = i === 0 ? "raiz" : Math.floor((i - 1) / 2);
            const esquerda = 2 * i + 1 < n ? array[2 * i + 1] : "null";
            const direita = 2 * i + 2 < n ? array[2 * i + 2] : "null";
            
            console.log(`Índice ${i}: valor ${array[i]}`);
            if (i > 0) console.log(`  👆 Pai: índice ${pai} (valor ${array[pai as number]})`);
            console.log(`  👇 Filhos: esquerda=${esquerda}, direita=${direita}`);
            console.log("");
        }
    }
}

/**
 * EXERCÍCIO EXTRA 8: ALGORITMO DE BUSCA AVANÇADA
 * Busca ternária e busca interpolada
 */
class BuscaAvancada {
    
    /**
     * Busca Ternária - divide em 3 partes ao invés de 2
     * Melhor que busca binária para alguns casos específicos
     */
    static buscaTernaria(array: number[], elemento: number): number {
        console.log(`🔀 BUSCA TERNÁRIA: Procurando ${elemento}`);
        console.log(`Array: [${array.join(', ')}]`);
        console.log("💡 CONCEITO: Divide em 3 partes ao invés de 2");
        
        let esquerda = 0;
        let direita = array.length - 1;
        let tentativas = 0;
        
        while (esquerda <= direita) {
            tentativas++;
            
            // Dois pontos de divisão
            const meio1 = esquerda + Math.floor((direita - esquerda) / 3);
            const meio2 = direita - Math.floor((direita - esquerda) / 3);
            
            console.log(`\n🎯 Tentativa ${tentativas}:`);
            console.log(`   Intervalo: [${esquerda}, ${direita}]`);
            console.log(`   Meio1: índice ${meio1}, valor ${array[meio1]}`);
            console.log(`   Meio2: índice ${meio2}, valor ${array[meio2]}`);
            
            if (array[meio1] === elemento) {
                console.log(`   🎉 Encontrado no meio1! Posição: ${meio1}`);
                return meio1;
            }
            
            if (array[meio2] === elemento) {
                console.log(`   🎉 Encontrado no meio2! Posição: ${meio2}`);
                return meio2;
            }
            
            // Elemento está no primeiro terço
            if (elemento < array[meio1]) {
                console.log(`   ⬅️  ${elemento} < ${array[meio1]}, buscando no primeiro terço`);
                direita = meio1 - 1;
            }
            // Elemento está no último terço
            else if (elemento > array[meio2]) {
                console.log(`   ➡️  ${elemento} > ${array[meio2]}, buscando no último terço`);
                esquerda = meio2 + 1;
            }
            // Elemento está no terço do meio
            else {
                console.log(`   🎯 ${array[meio1]} < ${elemento} < ${array[meio2]}, buscando no terço do meio`);
                esquerda = meio1 + 1;
                direita = meio2 - 1;
            }
        }
        
        console.log(`\n❌ Elemento ${elemento} não encontrado após ${tentativas} tentativas`);
        return -1;
    }
    
    /**
     * Busca Interpolada - "adivinha" a posição baseada no valor
     * Excelente para dados uniformemente distribuídos
     */
    static buscaInterpolada(array: number[], elemento: number): number {
        console.log(`🎯 BUSCA INTERPOLADA: Procurando ${elemento}`);
        console.log(`Array: [${array.join(', ')}]`);
        console.log("💡 CONCEITO: 'Adivinha' a posição baseada na proporção do valor");
        
        let esquerda = 0;
        let direita = array.length - 1;
        let tentativas = 0;
        
        while (esquerda <= direita && elemento >= array[esquerda] && elemento <= array[direita]) {
            tentativas++;
            
            // Se só há um elemento
            if (esquerda === direita) {
                if (array[esquerda] === elemento) {
                    console.log(`\n🎉 Encontrado! Posição: ${esquerda}`);
                    return esquerda;
                }
                break;
            }
            
            // Fórmula da interpolação - estima a posição
            const proporcao = (elemento - array[esquerda]) / (array[direita] - array[esquerda]);
            const posicao = esquerda + Math.floor(proporcao * (direita - esquerda));
            
            console.log(`\n🧮 Tentativa ${tentativas}:`);
            console.log(`   Intervalo: [${esquerda}, ${direita}] = valores [${array[esquerda]}, ${array[direita]}]`);
            console.log(`   Proporção: (${elemento} - ${array[esquerda]}) / (${array[direita]} - ${array[esquerda]}) = ${proporcao.toFixed(3)}`);
            console.log(`   Posição estimada: ${posicao}, valor: ${array[posicao]}`);
            
            if (array[posicao] === elemento) {
                console.log(`   🎉 Encontrado! Posição: ${posicao}`);
                return posicao;
            }
            
            if (array[posicao] < elemento) {
                console.log(`   ➡️  ${array[posicao]} < ${elemento}, buscando na parte direita`);
                esquerda = posicao + 1;
            } else {
                console.log(`   ⬅️  ${array[posicao]} > ${elemento}, buscando na parte esquerda`);
                direita = posicao - 1;
            }
        }
        
        console.log(`\n❌ Elemento ${elemento} não encontrado após ${tentativas} tentativas`);
        return -1;
    }
    
    /**
     * Compara eficiência de diferentes algoritmos de busca
     */
    static compararAlgoritmosBusca(array: number[], elemento: number): void {
        console.log("\n⚡ COMPARAÇÃO DE ALGORITMOS DE BUSCA");
        console.log("============================================================");
        
        // Simular contadores para cada algoritmo
        const tamanho = array.length;
        const maxComparacoesBinaria = Math.ceil(Math.log2(tamanho));
        const maxComparacoesTernaria = Math.ceil(Math.log(tamanho) / Math.log(3));
        const maxComparacoesInterpolada = Math.ceil(Math.log2(Math.log2(tamanho))); // Para distribuição uniforme
        
        console.log(`\n📏 Para array de ${tamanho} elementos:`);
        console.log(`   🔍 Busca Linear: até ${tamanho} comparações`);
        console.log(`   ⚡ Busca Binária: até ${maxComparacoesBinaria} comparações`);
        console.log(`   🔀 Busca Ternária: até ${maxComparacoesTernaria} comparações`);
        console.log(`   🎯 Busca Interpolada: até ${maxComparacoesInterpolada} comparações (distribuição uniforme)`);
        
        console.log(`\n📊 QUANDO USAR CADA ALGORITMO:`);
        console.log(`   🔍 Linear: Array pequeno ou não ordenado`);
        console.log(`   ⚡ Binária: Array ordenado, uso geral`);
        console.log(`   🔀 Ternária: Arrays muito grandes, acesso custoso`);
        console.log(`   🎯 Interpolada: Dados uniformemente distribuídos`);
    }
}

/**
 * EXERCÍCIO EXTRA 9: ALGORITMOS HÍBRIDOS
 * Combine diferentes algoritmos para máxima eficiência
 */
class AlgoritmosHibridos {
    
    /**
     * Tim Sort (inspirado no algoritmo do Python)
     * Combina Merge Sort e Insertion Sort de forma inteligente
     */
    static timSortSimplificado(array: number[]): number[] {
        const arr = [...array];
        const minMerge = 32;
        
        console.log("🚀 TIM SORT SIMPLIFICADO (inspirado no Python)");
        console.log(`Array inicial: [${arr.join(', ')}]`);
        console.log(`💡 CONCEITO: Insertion Sort para pequenos, Merge Sort para grandes`);
        
        // Insertion sort para arrays pequenos
        if (arr.length < minMerge) {
            console.log(`\n📏 Array pequeno (${arr.length} < ${minMerge}), usando Insertion Sort`);
            return this.insertionSortOtimizado(arr);
        }
        
        console.log(`\n📏 Array grande, usando estratégia híbrida`);
        
        // Para arrays grandes, divide em "runs" e usa insertion sort em cada um
        const tamanhoRun = this.calcularTamanhoRun(arr.length);
        console.log(`📊 Tamanho do run calculado: ${tamanhoRun}`);
        
        // Ordena runs individuais com insertion sort
        for (let i = 0; i < arr.length; i += tamanhoRun) {
            const fim = Math.min(i + tamanhoRun - 1, arr.length - 1);
            console.log(`\n🔧 Ordenando run ${Math.floor(i/tamanhoRun) + 1}: posições ${i} a ${fim}`);
            this.insertionSortOtimizadoRange(arr, i, fim);
        }
        
        // Merge dos runs ordenados
        let tamanho = tamanhoRun;
        while (tamanho < arr.length) {
            for (let inicio = 0; inicio < arr.length; inicio += tamanho * 2) {
                const meio = inicio + tamanho - 1;
                const fim = Math.min(inicio + tamanho * 2 - 1, arr.length - 1);
                
                if (meio < fim) {
                    console.log(`\n🔗 Mesclando: [${inicio}..${meio}] com [${meio+1}..${fim}]`);
                    this.merge(arr, inicio, meio, fim);
                }
            }
            tamanho *= 2;
        }
        
        console.log(`\n🎉 RESULTADO FINAL: [${arr.join(', ')}]`);
        return arr;
    }
    
    /**
     * Calcula tamanho ótimo do run para Tim Sort
     */
    private static calcularTamanhoRun(n: number): number {
        let r = 0;
        while (n >= 32) {
            r |= n & 1;
            n >>= 1;
        }
        return n + r;
    }
    
    /**
     * Insertion sort otimizado para pequenos arrays
     */
    private static insertionSortOtimizado(array: number[]): number[] {
        console.log("  🔧 Executando Insertion Sort otimizado...");
        
        for (let i = 1; i < array.length; i++) {
            const chave = array[i];
            let j = i - 1;
            
            // Move elementos maiores uma posição à frente
            while (j >= 0 && array[j] > chave) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = chave;
        }
        
        console.log(`  ✅ Insertion Sort concluído: [${array.join(', ')}]`);
        return array;
    }
    
    /**
     * Insertion sort para uma faixa específica do array
     */
    private static insertionSortOtimizadoRange(array: number[], inicio: number, fim: number): void {
        for (let i = inicio + 1; i <= fim; i++) {
            const chave = array[i];
            let j = i - 1;
            
            while (j >= inicio && array[j] > chave) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = chave;
        }
        
        console.log(`    ✅ Range [${inicio}..${fim}] ordenado: [${array.slice(inicio, fim + 1).join(', ')}]`);
    }
    
    /**
     * Merge function para Tim Sort
     */
    private static merge(array: number[], inicio: number, meio: number, fim: number): void {
        const esquerda = array.slice(inicio, meio + 1);
        const direita = array.slice(meio + 1, fim + 1);
        
        let i = 0, j = 0, k = inicio;
        
        while (i < esquerda.length && j < direita.length) {
            if (esquerda[i] <= direita[j]) {
                array[k] = esquerda[i];
                i++;
            } else {
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
    }
    
    /**
     * Intro Sort - Quick Sort com fallback para Heap Sort
     * Usado na biblioteca padrão do C++
     */
    static introSort(array: number[]): number[] {
        const arr = [...array];
        const maxDepth = 2 * Math.floor(Math.log2(arr.length));
        
        console.log("🔀 INTRO SORT (usado no C++)");
        console.log(`Array inicial: [${arr.join(', ')}]`);
        console.log(`💡 CONCEITO: Quick Sort com fallback para Heap Sort se muito recursivo`);
        console.log(`📊 Profundidade máxima permitida: ${maxDepth}`);
        
        this.introSortRecursivo(arr, 0, arr.length - 1, maxDepth);
        
        console.log(`\n🎉 RESULTADO FINAL: [${arr.join(', ')}]`);
        return arr;
    }
    
    private static introSortRecursivo(array: number[], inicio: number, fim: number, profundidadeMax: number): void {
        if (inicio < fim) {
            // Se muito profundo, usa Heap Sort
            if (profundidadeMax === 0) {
                console.log(`\n⚠️  Profundidade máxima atingida, mudando para Heap Sort no range [${inicio}..${fim}]`);
                this.heapSortRange(array, inicio, fim);
                return;
            }
            
            // Caso contrário, usa Quick Sort
            const pivo = this.particionarIntro(array, inicio, fim);
            
            this.introSortRecursivo(array, inicio, pivo - 1, profundidadeMax - 1);
            this.introSortRecursivo(array, pivo + 1, fim, profundidadeMax - 1);
        }
    }
    
    private static particionarIntro(array: number[], inicio: number, fim: number): number {
        const pivo = array[fim];
        let i = inicio - 1;
        
        for (let j = inicio; j < fim; j++) {
            if (array[j] <= pivo) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        [array[i + 1], array[fim]] = [array[fim], array[i + 1]];
        return i + 1;
    }
    
    private static heapSortRange(array: number[], inicio: number, fim: number): void {
        // Implementação simplificada para o range
        const temp = array.slice(inicio, fim + 1);
        HeapSortCompleto.ordenar(temp);
        
        for (let i = 0; i < temp.length; i++) {
            array[inicio + i] = temp[i];
        }
    }
}

// Execução dos exercícios avançados
console.log("🔴 EXERCÍCIOS EXTRAS - NÍVEL AVANÇADO");
console.log("============================================================");

console.log("\n📚 EXERCÍCIO 7: HEAP SORT COMPLETO\n");

const arrayHeap = [12, 11, 13, 5, 6, 7];
console.log("🏗️  DEMONSTRAÇÃO DO HEAP SORT:");
HeapSortCompleto.visualizarHeap(arrayHeap);
const resultadoHeap = HeapSortCompleto.ordenar(arrayHeap);

console.log("\n============================================================");
console.log("📚 EXERCÍCIO 8: ALGORITMOS DE BUSCA AVANÇADA\n");

const arrayBuscaAvancada = [2, 5, 8, 12, 16, 23, 38, 45, 67, 78, 88, 99, 101, 105, 110];

console.log("🔀 DEMONSTRAÇÃO DA BUSCA TERNÁRIA:");
BuscaAvancada.buscaTernaria(arrayBuscaAvancada, 67);

console.log("\n🎯 DEMONSTRAÇÃO DA BUSCA INTERPOLADA:");
BuscaAvancada.buscaInterpolada(arrayBuscaAvancada, 45);

BuscaAvancada.compararAlgoritmosBusca(arrayBuscaAvancada, 67);

console.log("\n============================================================");
console.log("📚 EXERCÍCIO 9: ALGORITMOS HÍBRIDOS\n");

const arrayHibrido = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42];

console.log("🚀 DEMONSTRAÇÃO DO TIM SORT:");
AlgoritmosHibridos.timSortSimplificado(arrayHibrido);

console.log("\n🔀 DEMONSTRAÇÃO DO INTRO SORT:");
AlgoritmosHibridos.introSort([...arrayHibrido]);
