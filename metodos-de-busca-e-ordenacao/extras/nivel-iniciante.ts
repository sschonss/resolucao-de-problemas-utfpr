/**
 * EXERCÍCIOS EXTRAS - NÍVEL INICIANTE 🟢
 * Algoritmos fundamentais de busca e ordenação com explicações detalhadas
 */

/**
 * EXERCÍCIO EXTRA 1: BUSCA LINEAR COM VARIAÇÕES
 * Implementa diferentes versões da busca linear para ensinar conceitos básicos
 */
class BuscaLinear {
    
    /**
     * Busca linear básica - encontra primeira ocorrência
     * COMPLEXIDADE: O(n) - no pior caso, percorre todo o array
     * 
     * @param array - Array onde buscar
     * @param elemento - Elemento a ser encontrado
     * @returns Índice do elemento ou -1 se não encontrado
     */
    static buscarPrimeiraOcorrencia(array: number[], elemento: number): number {
        console.log(`🔍 Buscando primeira ocorrência de ${elemento} em [${array.join(', ')}]`);
        
        // Percorre o array do início ao fim
        for (let i = 0; i < array.length; i++) {
            console.log(`   Verificando posição ${i}: ${array[i]}`);
            
            // Se encontrou o elemento, retorna o índice
            if (array[i] === elemento) {
                console.log(`   ✅ Encontrado na posição ${i}!`);
                return i;
            }
        }
        
        console.log(`   ❌ Elemento ${elemento} não encontrado`);
        return -1; // Não encontrado
    }
    
    /**
     * Busca linear - encontra todas as ocorrências
     * Útil quando um elemento pode aparecer múltiplas vezes
     * 
     * @param array - Array onde buscar
     * @param elemento - Elemento a ser encontrado
     * @returns Array com todos os índices onde o elemento aparece
     */
    static buscarTodasOcorrencias(array: number[], elemento: number): number[] {
        console.log(`🔍 Buscando todas as ocorrências de ${elemento}`);
        const indices: number[] = [];
        
        for (let i = 0; i < array.length; i++) {
            if (array[i] === elemento) {
                indices.push(i);
                console.log(`   ✅ Encontrado na posição ${i}`);
            }
        }
        
        console.log(`   📊 Total de ocorrências: ${indices.length}`);
        return indices;
    }
    
    /**
     * Busca linear com contador de comparações
     * Demonstra como medir a eficiência de algoritmos
     */
    static buscarComContador(array: number[], elemento: number): { indice: number, comparacoes: number } {
        console.log(`🔍 Busca com contador de comparações`);
        let comparacoes = 0;
        
        for (let i = 0; i < array.length; i++) {
            comparacoes++; // Conta cada comparação
            console.log(`   Comparação ${comparacoes}: array[${i}] = ${array[i]} == ${elemento}?`);
            
            if (array[i] === elemento) {
                console.log(`   ✅ Encontrado após ${comparacoes} comparações`);
                return { indice: i, comparacoes };
            }
        }
        
        console.log(`   ❌ Não encontrado após ${comparacoes} comparações`);
        return { indice: -1, comparacoes };
    }
}

/**
 * EXERCÍCIO EXTRA 2: BUBBLE SORT EDUCATIVO
 * Implementação didática do Bubble Sort com visualização completa
 */
class BubbleSortEducativo {
    
    /**
     * Bubble Sort básico com explicação passo a passo
     * IDEIA: "Bolhas" (elementos maiores) "sobem" para o final do array
     * COMPLEXIDADE: O(n²) - dois loops aninhados
     */
    static ordenar(array: number[]): { arrayFinal: number[], passos: string[], estatisticas: any } {
        const arr = [...array]; // Cria cópia para não modificar o original
        const passos: string[] = [];
        let comparacoes = 0;
        let trocas = 0;
        
        passos.push(`🫧 BUBBLE SORT - Array inicial: [${arr.join(', ')}]`);
        passos.push(`💡 Conceito: Elementos maiores "sobem" como bolhas`);
        passos.push(`📏 Tamanho do array: ${arr.length} elementos`);
        passos.push(``);
        
        // Loop externo - determina quantas "passadas" fazer
        for (let i = 0; i < arr.length - 1; i++) {
            passos.push(`--- PASSADA ${i + 1} ---`);
            let trocouNestaPassada = false;
            
            // Loop interno - compara elementos adjacentes
            // Nota: arr.length - 1 - i porque os últimos i elementos já estão ordenados
            for (let j = 0; j < arr.length - 1 - i; j++) {
                comparacoes++;
                passos.push(`Comparando posições ${j} e ${j + 1}: ${arr[j]} vs ${arr[j + 1]}`);
                
                // Se elemento atual é maior que o próximo, troca
                if (arr[j] > arr[j + 1]) {
                    // Troca os elementos
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    trocas++;
                    trocouNestaPassada = true;
                    
                    passos.push(`   ↔️ TROCA! ${arr[j + 1]} e ${arr[j]} → [${arr.join(', ')}]`);
                } else {
                    passos.push(`   ✅ Já estão em ordem`);
                }
            }
            
            if (!trocouNestaPassada) {
                passos.push(`🎯 OTIMIZAÇÃO: Não houve trocas nesta passada - array já está ordenado!`);
                break;
            }
            
            passos.push(`Fim da passada ${i + 1}: [${arr.join(', ')}]`);
            passos.push(``);
        }
        
        const estatisticas = {
            comparacoes,
            trocas,
            complexidadeAtual: `O(${comparacoes})`,
            complexidadeTeorica: 'O(n²)'
        };
        
        passos.push(`📊 ESTATÍSTICAS FINAIS:`);
        passos.push(`   Comparações: ${comparacoes}`);
        passos.push(`   Trocas: ${trocas}`);
        passos.push(`   Array ordenado: [${arr.join(', ')}]`);
        
        return { arrayFinal: arr, passos, estatisticas };
    }
    
    /**
     * Demonstra o Bubble Sort em diferentes cenários
     */
    static demonstrarCenarios(): void {
        console.log("🎓 BUBBLE SORT - ANÁLISE DE DIFERENTES CENÁRIOS\n");
        
        // Cenário 1: Array em ordem decrescente (pior caso)
        console.log("📉 CENÁRIO 1: Pior caso (ordem decrescente)");
        const resultado1 = this.ordenar([5, 4, 3, 2, 1]);
        console.log(`Resultado: ${resultado1.estatisticas.comparacoes} comparações, ${resultado1.estatisticas.trocas} trocas\n`);
        
        // Cenário 2: Array já ordenado (melhor caso)
        console.log("📈 CENÁRIO 2: Melhor caso (já ordenado)");
        const resultado2 = this.ordenar([1, 2, 3, 4, 5]);
        console.log(`Resultado: ${resultado2.estatisticas.comparacoes} comparações, ${resultado2.estatisticas.trocas} trocas\n`);
        
        // Cenário 3: Array aleatório (caso médio)
        console.log("🎲 CENÁRIO 3: Caso médio (ordem aleatória)");
        const resultado3 = this.ordenar([3, 1, 4, 2, 5]);
        console.log(`Resultado: ${resultado3.estatisticas.comparacoes} comparações, ${resultado3.estatisticas.trocas} trocas\n`);
        
        // Comparação
        console.log("📊 COMPARAÇÃO DOS CENÁRIOS:");
        console.log("┌─────────────────┬─────────────┬─────────┐");
        console.log("│ Cenário         │ Comparações │ Trocas  │");
        console.log("├─────────────────┼─────────────┼─────────┤");
        console.log(`│ Pior caso       │ ${resultado1.estatisticas.comparacoes.toString().padStart(11)} │ ${resultado1.estatisticas.trocas.toString().padStart(7)} │`);
        console.log(`│ Melhor caso     │ ${resultado2.estatisticas.comparacoes.toString().padStart(11)} │ ${resultado2.estatisticas.trocas.toString().padStart(7)} │`);
        console.log(`│ Caso médio      │ ${resultado3.estatisticas.comparacoes.toString().padStart(11)} │ ${resultado3.estatisticas.trocas.toString().padStart(7)} │`);
        console.log("└─────────────────┴─────────────┴─────────┘");
    }
}

/**
 * EXERCÍCIO EXTRA 3: INSERTION SORT DETALHADO
 * Simula como uma pessoa ordenaria cartas na mão
 */
class InsertionSortEducativo {
    
    /**
     * Insertion Sort com analogia das cartas
     * IDEIA: Pega cada carta e insere na posição correta entre as já ordenadas
     * COMPLEXIDADE: O(n²) no pior caso, O(n) no melhor caso
     */
    static ordenarComCartas(array: number[]): void {
        const arr = [...array];
        console.log(`🃏 INSERTION SORT - Simulando ordenação de cartas`);
        console.log(`Cartas iniciais: [${arr.join(', ')}]\n`);
        
        console.log(`💡 CONCEITO: Como ordenar cartas na sua mão`);
        console.log(`1. Começamos com a primeira carta (já está "ordenada")`);
        console.log(`2. Pegamos a próxima carta`);
        console.log(`3. Inserimos na posição correta entre as cartas já ordenadas`);
        console.log(`4. Repetimos até acabar as cartas\n`);
        
        // Começamos do segundo elemento (índice 1)
        for (let i = 1; i < arr.length; i++) {
            const cartaAtual = arr[i];
            console.log(`--- RODADA ${i} ---`);
            console.log(`🃏 Pegando carta: ${cartaAtual}`);
            console.log(`📋 Cartas já ordenadas: [${arr.slice(0, i).join(', ')}]`);
            
            // Encontra a posição correta para inserir
            let j = i - 1;
            console.log(`🔍 Procurando posição correta para ${cartaAtual}:`);
            
            // Move cartas maiores para a direita
            while (j >= 0 && arr[j] > cartaAtual) {
                console.log(`   ${arr[j]} > ${cartaAtual}, movendo ${arr[j]} para direita`);
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Insere a carta na posição correta
            arr[j + 1] = cartaAtual;
            console.log(`   ✅ Inserindo ${cartaAtual} na posição ${j + 1}`);
            console.log(`📋 Cartas após inserção: [${arr.join(', ')}]\n`);
        }
        
        console.log(`🎯 Todas as cartas ordenadas: [${arr.join(', ')}]`);
    }
    
    /**
     * Versão com métricas detalhadas
     */
    static ordenarComMetricas(array: number[]): any {
        const arr = [...array];
        let comparacoes = 0;
        let movimentacoes = 0;
        
        for (let i = 1; i < arr.length; i++) {
            const chave = arr[i];
            let j = i - 1;
            
            while (j >= 0) {
                comparacoes++;
                if (arr[j] > chave) {
                    arr[j + 1] = arr[j];
                    movimentacoes++;
                    j--;
                } else {
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
            comparacoes,
            movimentacoes,
            eficiencia: comparacoes + movimentacoes
        };
    }
}

// Execução dos exercícios iniciantes
console.log("🟢 EXERCÍCIOS EXTRAS - NÍVEL INICIANTE");
console.log("============================================================");

console.log("\n📚 EXERCÍCIO 1: BUSCA LINEAR COM VARIAÇÕES\n");

const arrayBuscaTeste = [3, 7, 2, 9, 7, 1, 7, 4];

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
const exemploArray = [4, 3, 2, 1];
const resultado = InsertionSortEducativo.ordenarComMetricas(exemploArray);
console.log(`Array [${exemploArray.join(', ')}] → [${resultado.arrayOrdenado.join(', ')}]`);
console.log(`Comparações: ${resultado.comparacoes}, Movimentações: ${resultado.movimentacoes}`);

/**
 * EXERCÍCIO EXTRA 7: MAIOR VALOR ÚNICO
 * Dado um array, encontre o maior valor que aparece apenas uma vez.
 * Exemplo: [1, 2, 2, 3, 3, 4] => 4
 */
function findLargestUnique(array: number[]): number | null {
    var counts: {[key: string]: number} = {};
    for (var i = 0; i < array.length; i++) {
        var n = array[i];
        var key = '' + n;
        if (!(key in counts)) counts[key] = 0;
        counts[key]++;
    }
    var max: number | null = null;
    for (var k in counts) {
        if (counts[k] === 1 && (max === null || Number(k) > max)) max = Number(k);
    }
    return max;
}
console.log("\n🟢 EXERCÍCIO EXTRA 7: MAIOR VALOR ÚNICO");
console.log(`findLargestUnique([1,2,2,3,3,4]) = ${findLargestUnique([1,2,2,3,3,4])}`);
console.log(`findLargestUnique([7,7,8,8,9]) = ${findLargestUnique([7,7,8,8,9])}`);

/**
 * EXERCÍCIO EXTRA 8: ELEMENTO QUE APARECE UMA VEZ
 * Todos os elementos aparecem duas vezes, exceto um. Encontre esse elemento.
 * Exemplo: [2,2,3,3,4] => 4
 * Dica: use XOR para O(n) e O(1) espaço.
 */
function findSingle(array: number[]): number {
    var result = 0;
    for (var i = 0; i < array.length; i++) {
        result = result ^ array[i];
    }
    return result;
}
console.log("\n🟢 EXERCÍCIO EXTRA 8: ELEMENTO QUE APARECE UMA VEZ");
console.log(`findSingle([2,2,3,3,4]) = ${findSingle([2,2,3,3,4])}`);
console.log(`findSingle([1,1,2,2,99]) = ${findSingle([1,1,2,2,99])}`);

/**
 * EXERCÍCIO EXTRA 4: ENCONTRAR O NÚMERO ÚNICO
 * Dado um array onde todos os números são iguais exceto um, encontre o diferente.
 * Exemplo: [1, 1, 1, 2, 1, 1] => 2
 * COMPLEXIDADE: O(n) no pior caso, mas otimizado para grandes arrays.
 */
function findUniq(array: number[]): number {
    // Estratégia: verifica os 3 primeiros para saber qual é o valor repetido
    let candidate = array[0] === array[1] ? array[0] : array[2] === array[0] ? array[2] : array[1];
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== candidate) return array[i];
    }
    return candidate; // fallback (teoricamente nunca ocorre)
}

console.log("\n🟢 EXERCÍCIO EXTRA 4: ENCONTRAR O NÚMERO ÚNICO");
console.log(`findUniq([ 1, 1, 1, 2, 1, 1 ]) = ${findUniq([ 1, 1, 1, 2, 1, 1 ])}`);
console.log(`findUniq([ 0, 0, 0.55, 0, 0 ]) = ${findUniq([ 0, 0, 0.55, 0, 0 ])}`);

/**
 * EXERCÍCIO EXTRA 5: ENCONTRAR A STRING ÚNICA
 * Dado um array de strings onde todas são iguais exceto uma, encontre a diferente.
 * Exemplo: ["abc", "abc", "xyz", "abc"] => "xyz"
 */
function findUniqueString(array: string[]): string {
    let candidate = array[0] === array[1] ? array[0] : array[2] === array[0] ? array[2] : array[1];
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== candidate) return array[i];
    }
    return candidate;
}

console.log("\n🟢 EXERCÍCIO EXTRA 5: ENCONTRAR A STRING ÚNICA");
console.log(`findUniqueString([ 'abc', 'abc', 'xyz', 'abc' ]) = ${findUniqueString([ 'abc', 'abc', 'xyz', 'abc' ])}`);
console.log(`findUniqueString([ 'foo', 'bar', 'foo', 'foo' ]) = ${findUniqueString([ 'foo', 'bar', 'foo', 'foo' ])}`);

/**
 * EXERCÍCIO EXTRA 6: ENCONTRAR O OBJETO ÚNICO (SIMPLIFICADO)
 * Dado um array de objetos simples (com propriedade 'id'), onde todos são iguais exceto um, encontre o diferente.
 * Exemplo: [{{id:1}},{{id:1}},{{id:2}},{{id:1}}] => {id:2}
 */
function findUniqueObject(array: {id: number}[]): {id: number} {
    let candidate = array[0].id === array[1].id ? array[0].id : array[2].id === array[0].id ? array[2].id : array[1].id;
    for (let i = 0; i < array.length; i++) {
        if (array[i].id !== candidate) return array[i];
    }
    return array[0];
}

console.log("\n🟢 EXERCÍCIO EXTRA 6: ENCONTRAR O OBJETO ÚNICO");
console.log(`findUniqueObject([{{id:1}},{{id:1}},{{id:2}},{{id:1}}]) =`, findUniqueObject([{id:1},{id:1},{id:2},{id:1}]));
console.log(`findUniqueObject([{{id:7}},{{id:7}},{{id:7}},{{id:3}},{{id:7}}]) =`, findUniqueObject([{id:7},{id:7},{id:7},{id:3},{id:7}]));
