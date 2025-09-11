/**
 * EXERCÍCIOS EXTRAS - NÍVEL INTERMEDIÁRIO 🟡
 * Algoritmos mais eficientes e técnicas avançadas de busca e ordenação
 */
/**
 * EXERCÍCIO EXTRA 4: MERGE SORT EDUCATIVO
 * Algoritmo "Dividir para Conquistar" - O(n log n)
 * Um dos algoritmos mais importantes da computação!
 */
class MergeSortEducativo {
    /**
     * Merge Sort principal com visualização completa
     * CONCEITO: Divide o array ao meio até ter elementos únicos, depois mescla ordenadamente
     * COMPLEXIDADE: O(n log n) - muito melhor que O(n²)!
     */
    static ordenar(array, nivel = 0) {
        const indentacao = "  ".repeat(nivel);
        console.log(`${indentacao}🔸 DIVISÃO nível ${nivel}: [${array.join(', ')}]`);
        // CASO BASE: Se o array tem 1 ou 0 elementos, já está ordenado
        if (array.length <= 1) {
            console.log(`${indentacao}   ✅ Caso base: array com ${array.length} elemento(s)`);
            return array;
        }
        // DIVISÃO: Divide o array ao meio
        const meio = Math.floor(array.length / 2);
        const esquerda = array.slice(0, meio);
        const direita = array.slice(meio);
        console.log(`${indentacao}   ↙️  Esquerda: [${esquerda.join(', ')}]`);
        console.log(`${indentacao}   ↘️  Direita: [${direita.join(', ')}]`);
        // CONQUISTA: Ordena recursivamente cada metade
        const esquerdaOrdenada = this.ordenar(esquerda, nivel + 1);
        const direitaOrdenada = this.ordenar(direita, nivel + 1);
        // COMBINAÇÃO: Mescla as duas metades ordenadas
        const resultado = this.mesclar(esquerdaOrdenada, direitaOrdenada, nivel);
        console.log(`${indentacao}🔹 RESULTADO nível ${nivel}: [${resultado.join(', ')}]`);
        return resultado;
    }
    /**
     * Mescla duas arrays ordenadas em uma array ordenada
     * ESTA É A PARTE MÁGICA DO MERGE SORT!
     */
    static mesclar(esquerda, direita, nivel) {
        const indentacao = "  ".repeat(nivel);
        const resultado = [];
        let i = 0, j = 0;
        console.log(`${indentacao}   🔀 MESCLANDO: [${esquerda.join(', ')}] + [${direita.join(', ')}]`);
        // Compara elemento por elemento e pega o menor
        while (i < esquerda.length && j < direita.length) {
            if (esquerda[i] <= direita[j]) {
                resultado.push(esquerda[i]);
                console.log(`${indentacao}      ${esquerda[i]} ≤ ${direita[j]} → pegando ${esquerda[i]}`);
                i++;
            }
            else {
                resultado.push(direita[j]);
                console.log(`${indentacao}      ${esquerda[i]} > ${direita[j]} → pegando ${direita[j]}`);
                j++;
            }
        }
        // Adiciona elementos restantes (se houver)
        while (i < esquerda.length) {
            resultado.push(esquerda[i]);
            console.log(`${indentacao}      Restante da esquerda: ${esquerda[i]}`);
            i++;
        }
        while (j < direita.length) {
            resultado.push(direita[j]);
            console.log(`${indentacao}      Restante da direita: ${direita[j]}`);
            j++;
        }
        console.log(`${indentacao}   ✅ Mesclagem concluída: [${resultado.join(', ')}]`);
        return resultado;
    }
    /**
     * Análise de complexidade do Merge Sort
     */
    static analisarComplexidade(tamanhos) {
        console.log("\n📊 ANÁLISE DE COMPLEXIDADE DO MERGE SORT");
        console.log("Comparando com outros algoritmos O(n²)");
        console.log("============================================================");
        tamanhos.forEach(n => {
            const operacoesMerge = n * Math.log2(n);
            const operacoesBubble = n * n;
            const melhoria = operacoesBubble / operacoesMerge;
            console.log(`\n📏 Array de tamanho ${n}:`);
            console.log(`   Merge Sort (n log n): ~${Math.round(operacoesMerge)} operações`);
            console.log(`   Bubble Sort (n²): ~${operacoesBubble} operações`);
            console.log(`   🚀 Merge Sort é ${melhoria.toFixed(1)}x mais rápido!`);
        });
    }
}
/**
 * EXERCÍCIO EXTRA 5: BUSCA BINÁRIA INTERATIVA
 * Algoritmo O(log n) - muito eficiente para arrays ordenados!
 */
class BuscaBinariaInterativa {
    /**
     * Busca binária com explicação detalhada
     * CONCEITO: "Chute inteligente" - sempre elimina metade das possibilidades
     * PRÉ-REQUISITO: Array deve estar ordenado!
     */
    static buscar(array, elemento) {
        console.log(`🎯 BUSCA BINÁRIA: Procurando ${elemento} em [${array.join(', ')}]`);
        console.log(`💡 CONCEITO: Eliminar metade das possibilidades a cada comparação`);
        console.log(`⚠️  PRÉ-REQUISITO: Array deve estar ordenado!`);
        let inicio = 0;
        let fim = array.length - 1;
        let tentativas = 0;
        while (inicio <= fim) {
            tentativas++;
            const meio = Math.floor((inicio + fim) / 2);
            const valorMeio = array[meio];
            console.log(`\n🔍 TENTATIVA ${tentativas}:`);
            console.log(`   Intervalo: posições ${inicio} a ${fim}`);
            console.log(`   Meio: posição ${meio}, valor ${valorMeio}`);
            console.log(`   Comparando: ${valorMeio} com ${elemento}`);
            if (valorMeio === elemento) {
                console.log(`   🎉 ENCONTRADO! Elemento ${elemento} está na posição ${meio}`);
                console.log(`   📊 Total de tentativas: ${tentativas}`);
                console.log(`   🚀 Eficiência: O(log n) = ${Math.ceil(Math.log2(array.length))} tentativas máximas`);
                return meio;
            }
            else if (valorMeio < elemento) {
                console.log(`   ➡️  ${valorMeio} < ${elemento}, procurando na metade direita`);
                inicio = meio + 1;
            }
            else {
                console.log(`   ⬅️  ${valorMeio} > ${elemento}, procurando na metade esquerda`);
                fim = meio - 1;
            }
            console.log(`   Novo intervalo: posições ${inicio} a ${fim}`);
        }
        console.log(`\n❌ Elemento ${elemento} não encontrado após ${tentativas} tentativas`);
        return -1;
    }
    /**
     * Compara busca binária com busca linear
     */
    static compararComBuscaLinear(array, elemento) {
        console.log(`\n⚡ COMPARAÇÃO: BUSCA BINÁRIA vs BUSCA LINEAR`);
        console.log(`Array de ${array.length} elementos, buscando ${elemento}`);
        console.log("============================================================");
        // Busca Linear
        console.log(`\n📍 BUSCA LINEAR:`);
        let comparacoesLinear = 0;
        let indiceLinear = -1;
        for (let i = 0; i < array.length; i++) {
            comparacoesLinear++;
            if (array[i] === elemento) {
                indiceLinear = i;
                break;
            }
        }
        console.log(`   Comparações: ${comparacoesLinear}`);
        console.log(`   Resultado: ${indiceLinear >= 0 ? `encontrado na posição ${indiceLinear}` : 'não encontrado'}`);
        // Busca Binária
        console.log(`\n🎯 BUSCA BINÁRIA:`);
        let inicio = 0, fim = array.length - 1, comparacoesBinaria = 0, indiceBinario = -1;
        while (inicio <= fim) {
            comparacoesBinaria++;
            const meio = Math.floor((inicio + fim) / 2);
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
        console.log(`   Comparações: ${comparacoesBinaria}`);
        console.log(`   Resultado: ${indiceBinario >= 0 ? `encontrado na posição ${indiceBinario}` : 'não encontrado'}`);
        // Resumo
        const eficiencia = comparacoesLinear / comparacoesBinaria;
        console.log(`\n📊 RESUMO:`);
        console.log(`   Busca binária é ${eficiencia.toFixed(1)}x mais eficiente!`);
        console.log(`   Para array de ${array.length} elementos:`);
        console.log(`   - Linear: até ${array.length} comparações`);
        console.log(`   - Binária: até ${Math.ceil(Math.log2(array.length))} comparações`);
    }
}
/**
 * EXERCÍCIO EXTRA 6: QUICK SORT EXPLICADO
 * Algoritmo muito eficiente na prática - O(n log n) em média
 */
class QuickSortExplicado {
    /**
     * Quick Sort com visualização completa
     * CONCEITO: Escolhe um "pivô" e organiza elementos menores à esquerda, maiores à direita
     */
    static ordenar(array, inicio = 0, fim = array.length - 1, nivel = 0) {
        const indentacao = "  ".repeat(nivel);
        if (inicio < fim) {
            console.log(`${indentacao}🎯 QUICK SORT nível ${nivel}: array[${inicio}..${fim}] = [${array.slice(inicio, fim + 1).join(', ')}]`);
            // PARTICIONAMENTO: Organiza o array em torno do pivô
            const indicePivo = this.particionar(array, inicio, fim, nivel);
            console.log(`${indentacao}📍 Pivô ${array[indicePivo]} na posição ${indicePivo}, array: [${array.join(', ')}]`);
            // RECURSÃO: Ordena as duas partes
            console.log(`${indentacao}⬅️  Ordenando parte esquerda: [${array.slice(inicio, indicePivo).join(', ')}]`);
            this.ordenar(array, inicio, indicePivo - 1, nivel + 1);
            console.log(`${indentacao}➡️  Ordenando parte direita: [${array.slice(indicePivo + 1, fim + 1).join(', ')}]`);
            this.ordenar(array, indicePivo + 1, fim, nivel + 1);
            console.log(`${indentacao}✅ Concluído nível ${nivel}: [${array.slice(inicio, fim + 1).join(', ')}]`);
        }
        return array;
    }
    /**
     * Particionamento - a parte mais importante do Quick Sort
     * Organiza elementos menores que o pivô à esquerda, maiores à direita
     */
    static particionar(array, inicio, fim, nivel) {
        const indentacao = "  ".repeat(nivel);
        const pivo = array[fim]; // Escolhemos o último elemento como pivô
        console.log(`${indentacao}  🎲 Pivô escolhido: ${pivo} (posição ${fim})`);
        let i = inicio - 1; // Índice do menor elemento
        for (let j = inicio; j < fim; j++) {
            console.log(`${indentacao}  🔍 Comparando ${array[j]} com pivô ${pivo}`);
            // Se elemento atual é menor ou igual ao pivô
            if (array[j] <= pivo) {
                i++;
                [array[i], array[j]] = [array[j], array[i]]; // Troca
                console.log(`${indentacao}    ↔️ ${array[j]} ≤ ${pivo}, trocando posições ${i} e ${j}: [${array.join(', ')}]`);
            }
            else {
                console.log(`${indentacao}    ➡️ ${array[j]} > ${pivo}, mantendo à direita`);
            }
        }
        // Coloca o pivô na posição correta
        [array[i + 1], array[fim]] = [array[fim], array[i + 1]];
        console.log(`${indentacao}  🎯 Colocando pivô ${pivo} na posição correta ${i + 1}: [${array.join(', ')}]`);
        return i + 1; // Retorna a posição do pivô
    }
    /**
     * Demonstra diferentes estratégias de escolha de pivô
     */
    static demonstrarEstrategiasPivo() {
        console.log("\n🎲 ESTRATÉGIAS DE ESCOLHA DE PIVÔ NO QUICK SORT");
        console.log("============================================================");
        const arrayTeste = [3, 6, 8, 10, 1, 2, 1];
        console.log(`Array teste: [${arrayTeste.join(', ')}]`);
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
    }
}
// Execução dos exercícios intermediários
console.log("🟡 EXERCÍCIOS EXTRAS - NÍVEL INTERMEDIÁRIO");
console.log("============================================================");
console.log("\n📚 EXERCÍCIO 4: MERGE SORT EDUCATIVO\n");
console.log("🔥 DEMONSTRAÇÃO DO MERGE SORT:");
const arrayMerge = [38, 27, 43, 3, 9, 82, 10];
console.log(`Array inicial: [${arrayMerge.join(', ')}]\n`);
const resultadoMerge = MergeSortEducativo.ordenar([...arrayMerge]);
console.log(`\n🎉 RESULTADO FINAL: [${resultadoMerge.join(', ')}]`);
MergeSortEducativo.analisarComplexidade([10, 100, 1000, 10000]);
console.log("\n============================================================");
console.log("📚 EXERCÍCIO 5: BUSCA BINÁRIA INTERATIVA\n");
const arrayBinariaDemo = [2, 5, 8, 12, 16, 23, 38, 45, 67, 78, 88, 99];
console.log("🔍 DEMONSTRAÇÃO DA BUSCA BINÁRIA:");
BuscaBinariaInterativa.buscar(arrayBinariaDemo, 23);
BuscaBinariaInterativa.compararComBuscaLinear(arrayBinariaDemo, 67);
console.log("\n============================================================");
console.log("📚 EXERCÍCIO 6: QUICK SORT EXPLICADO\n");
const arrayQuick = [10, 7, 8, 9, 1, 5];
console.log("⚡ DEMONSTRAÇÃO DO QUICK SORT:");
console.log(`Array inicial: [${arrayQuick.join(', ')}]\n`);
const resultadoQuick = QuickSortExplicado.ordenar([...arrayQuick]);
console.log(`\n🎉 RESULTADO FINAL: [${resultadoQuick.join(', ')}]`);
QuickSortExplicado.demonstrarEstrategiasPivo();
