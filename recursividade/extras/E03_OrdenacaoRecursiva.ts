/**
 * EXERCÍCIO EXTRA 3: ALGORITMOS DE ORDENAÇÃO RECURSIVOS
 * Implementa vários algoritmos de ordenação usando recursão
 */

class OrdenacaoRecursiva {
    
    /**
     * QUICKSORT - Divisão e conquista
     */
    static quicksort(arr: number[]): number[] {
        // Caso base
        if (arr.length <= 1) {
            return arr;
        }
        
        const pivot = arr[Math.floor(arr.length / 2)];
        const menores = arr.filter(x => x < pivot);
        const iguais = arr.filter(x => x === pivot);
        const maiores = arr.filter(x => x > pivot);
        
        return [
            ...this.quicksort(menores),
            ...iguais,
            ...this.quicksort(maiores)
        ];
    }
    
    /**
     * MERGESORT - Divisão e conquista
     */
    static mergesort(arr: number[]): number[] {
        // Caso base
        if (arr.length <= 1) {
            return arr;
        }
        
        const meio = Math.floor(arr.length / 2);
        const esquerda = arr.slice(0, meio);
        const direita = arr.slice(meio);
        
        return this.merge(
            this.mergesort(esquerda),
            this.mergesort(direita)
        );
    }
    
    /**
     * Combina dois arrays ordenados
     */
    private static merge(esquerda: number[], direita: number[]): number[] {
        const resultado: number[] = [];
        let i = 0, j = 0;
        
        while (i < esquerda.length && j < direita.length) {
            if (esquerda[i] <= direita[j]) {
                resultado.push(esquerda[i]);
                i++;
            } else {
                resultado.push(direita[j]);
                j++;
            }
        }
        
        return resultado.concat(esquerda.slice(i)).concat(direita.slice(j));
    }
    
    /**
     * HEAPSORT usando recursão para construir heap
     */
    static heapsort(arr: number[]): number[] {
        const resultado = [...arr];
        const n = resultado.length;
        
        // Constrói max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(resultado, n, i);
        }
        
        // Extrai elementos do heap
        for (let i = n - 1; i > 0; i--) {
            [resultado[0], resultado[i]] = [resultado[i], resultado[0]];
            this.heapify(resultado, i, 0);
        }
        
        return resultado;
    }
    
    /**
     * Mantém propriedade do heap recursivamente
     */
    private static heapify(arr: number[], n: number, i: number): void {
        let maior = i;
        const esquerda = 2 * i + 1;
        const direita = 2 * i + 2;
        
        if (esquerda < n && arr[esquerda] > arr[maior]) {
            maior = esquerda;
        }
        
        if (direita < n && arr[direita] > arr[maior]) {
            maior = direita;
        }
        
        if (maior !== i) {
            [arr[i], arr[maior]] = [arr[maior], arr[i]];
            this.heapify(arr, n, maior);
        }
    }
    
    /**
     * INSERTION SORT recursivo
     */
    static insertionSortRecursivo(arr: number[], n: number = arr.length): number[] {
        // Caso base
        if (n <= 1) {
            return arr.slice(0, n);
        }
        
        // Ordena os primeiros n-1 elementos
        const parcial = this.insertionSortRecursivo(arr, n - 1);
        
        // Insere o último elemento na posição correta
        const ultimo = arr[n - 1];
        this.inserirRecursivo(parcial, ultimo, parcial.length - 1);
        
        return parcial;
    }
    
    /**
     * Insere elemento na posição correta recursivamente
     */
    private static inserirRecursivo(arr: number[], valor: number, pos: number): void {
        // Caso base: início do array ou posição correta encontrada
        if (pos < 0 || arr[pos] <= valor) {
            arr[pos + 1] = valor;
            return;
        }
        
        // Move elemento para direita e continua
        arr[pos + 1] = arr[pos];
        this.inserirRecursivo(arr, valor, pos - 1);
    }
    
    /**
     * Testa performance dos algoritmos
     */
    static testarPerformance(algoritmos: string[], tamanho: number = 1000): void {
        const arrayTeste = Array.from({length: tamanho}, () => Math.floor(Math.random() * 1000));
        
        console.log(`\nTeste de performance com ${tamanho} elementos:\n`);
        
        algoritmos.forEach(algoritmo => {
            const arrayCopia = [...arrayTeste];
            const inicio = Date.now();
            
            switch (algoritmo) {
                case 'quicksort':
                    this.quicksort(arrayCopia);
                    break;
                case 'mergesort':
                    this.mergesort(arrayCopia);
                    break;
                case 'heapsort':
                    this.heapsort(arrayCopia);
                    break;
                case 'insertion':
                    this.insertionSortRecursivo(arrayCopia);
                    break;
            }
            
            const tempo = Date.now() - inicio;
            console.log(`${algoritmo.padEnd(12)}: ${tempo}ms`);
        });
    }
}

// Testes
console.log("=== EXERCÍCIO EXTRA 3: ALGORITMOS DE ORDENAÇÃO ===\n");

const arrayTeste = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30];
console.log("Array original:", arrayTeste);

console.log("\n1. Quicksort:");
console.log("Resultado:", OrdenacaoRecursiva.quicksort([...arrayTeste]));

console.log("\n2. Mergesort:");
console.log("Resultado:", OrdenacaoRecursiva.mergesort([...arrayTeste]));

console.log("\n3. Heapsort:");
console.log("Resultado:", OrdenacaoRecursiva.heapsort([...arrayTeste]));

console.log("\n4. Insertion Sort Recursivo:");
console.log("Resultado:", OrdenacaoRecursiva.insertionSortRecursivo([...arrayTeste]));

// Teste de performance
OrdenacaoRecursiva.testarPerformance(['quicksort', 'mergesort', 'heapsort'], 100);
