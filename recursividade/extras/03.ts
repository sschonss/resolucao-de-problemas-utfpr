// Exercício 3: Somar todos os elementos de um array

// Solução 1: Recursão simples
function somaArrayRecursivo(arr: number[], index: number = 0): number {
    // Caso base: se chegamos ao final do array
    if (index >= arr.length) {
        return 0;
    }
    
    // Soma o elemento atual com a soma do resto do array
    return arr[index] + somaArrayRecursivo(arr, index + 1);
}

// Solução 2: Recursão usando slice (mais elegante)
function somaArraySlice(arr: number[]): number {
    // Caso base: array vazio
    if (arr.length === 0) {
        return 0;
    }
    
    // Caso base: array com um elemento
    if (arr.length === 1) {
        return arr[0];
    }
    
    // Soma o primeiro elemento com a soma do resto
    return arr[0] + somaArraySlice(arr.slice(1));
}

// Solução 3: Recursão com divisão e conquista
function somaArrayDivisaoConquista(arr: number[], inicio: number = 0, fim: number = arr.length - 1): number {
    // Caso base: array vazio
    if (inicio > fim) {
        return 0;
    }
    
    // Caso base: um elemento
    if (inicio === fim) {
        return arr[inicio];
    }
    
    // Divide o array ao meio
    const meio = Math.floor((inicio + fim) / 2);
    
    // Soma recursivamente as duas metades
    return somaArrayDivisaoConquista(arr, inicio, meio) + 
           somaArrayDivisaoConquista(arr, meio + 1, fim);
}

// Testes
console.log("=== Exercício 3: Soma de Array ===");
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrayVazio: number[] = [];
const arrayUnico = [42];

console.log("Array:", numeros);
console.log("Soma recursiva (índice):", somaArrayRecursivo(numeros));
console.log("Soma recursiva (slice):", somaArraySlice(numeros));
console.log("Soma divisão e conquista:", somaArrayDivisaoConquista(numeros));

console.log("\nArray vazio:", arrayVazio);
console.log("Soma array vazio:", somaArrayRecursivo(arrayVazio));

console.log("\nArray único:", arrayUnico);
console.log("Soma array único:", somaArrayRecursivo(arrayUnico));

// Teste com números negativos
const numerosNegativos = [-1, -2, 3, -4, 5];
console.log("\nArray com negativos:", numerosNegativos);
console.log("Soma:", somaArrayRecursivo(numerosNegativos));
