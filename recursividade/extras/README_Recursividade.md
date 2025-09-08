# Recursividade - Guia Completo

## O que é Recursividade?

**Recursividade** é uma técnica de programação onde uma função chama a si mesma para resolver um problema. É uma forma elegante de resolver problemas que podem ser divididos em subproblemas menores e similares.

### Elementos Essenciais da Recursividade

1. **Caso Base**: Condição que para a recursão (evita loop infinito)
2. **Caso Recursivo**: A função chama a si mesma com parâmetros modificados
3. **Progresso**: Cada chamada deve se aproximar do caso base

### Estrutura Básica

```typescript
function funcaoRecursiva(parametros) {
    // Caso base - condição de parada
    if (condicaoBase) {
        return valorBase;
    }
    
    // Caso recursivo - chama a si mesma
    return funcaoRecursiva(parametrosModificados);
}
```

## Exemplos por Nível de Dificuldade

### 🟢 FÁCIL - Conceitos Básicos

#### 1. Contagem Regressiva
```typescript
function contagemRegressiva(n: number): void {
    // Caso base
    if (n <= 0) {
        console.log("Fim!");
        return;
    }
    
    console.log(n);
    contagemRegressiva(n - 1); // Caso recursivo
}
```

#### 2. Soma de Números de 1 a N
```typescript
function somaAteN(n: number): number {
    if (n <= 0) return 0;        // Caso base
    return n + somaAteN(n - 1);  // Caso recursivo
}
```

### 🟡 MÉDIO - Aplicações Práticas

#### 1. Máximo Divisor Comum (MDC)
```typescript
function mdc(a: number, b: number): number {
    if (b === 0) return a;       // Caso base
    return mdc(b, a % b);        // Algoritmo de Euclides
}
```

#### 2. Verificar se Número é Primo
```typescript
function ehPrimo(n: number, divisor: number = 2): boolean {
    if (n <= 1) return false;
    if (divisor * divisor > n) return true;
    if (n % divisor === 0) return false;
    return ehPrimo(n, divisor + 1);
}
```

### 🔴 DIFÍCIL - Algoritmos Avançados

#### 1. Torres de Hanói
```typescript
function torresHanoi(n: number, origem: string, destino: string, auxiliar: string): void {
    if (n === 1) {
        console.log(`Mover disco de ${origem} para ${destino}`);
        return;
    }
    
    torresHanoi(n - 1, origem, auxiliar, destino);
    console.log(`Mover disco de ${origem} para ${destino}`);
    torresHanoi(n - 1, auxiliar, destino, origem);
}
```

#### 2. Quicksort
```typescript
function quicksort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const menores = arr.filter(x => x < pivot);
    const iguais = arr.filter(x => x === pivot);
    const maiores = arr.filter(x => x > pivot);
    
    return [...quicksort(menores), ...iguais, ...quicksort(maiores)];
}
```

## Vantagens e Desvantagens

### ✅ Vantagens
- Código mais limpo e legível
- Solução natural para problemas recursivos
- Menos código para alguns algoritmos

### ❌ Desvantagens
- Pode ser menos eficiente em memória
- Risco de stack overflow
- Pode ser mais lenta que iteração

## Otimizações

### Memoização
Armazena resultados já calculados para evitar recálculos:

```typescript
const memo: {[key: number]: number} = {};

function fibonacciMemoizado(n: number): number {
    if (n in memo) return memo[n];
    if (n <= 2) return memo[n] = 1;
    
    memo[n] = fibonacciMemoizado(n - 1) + fibonacciMemoizado(n - 2);
    return memo[n];
}
```

### Tail Recursion
A chamada recursiva é a última operação:

```typescript
function fatorialTail(n: number, acc: number = 1): number {
    if (n <= 1) return acc;
    return fatorialTail(n - 1, n * acc);
}
```

## Quando Usar Recursividade?

- **Estruturas de dados recursivas** (árvores, listas ligadas)
- **Problemas matemáticos** (fatoriais, sequências)
- **Algoritmos de busca e ordenação**
- **Processamento de estruturas aninhadas**
- **Problemas de backtracking**

## Dicas Importantes

1. **Sempre defina o caso base** claramente
2. **Verifique se há progresso** em direção ao caso base
3. **Considere a complexidade** de tempo e espaço
4. **Use memoização** quando há sobreposição de subproblemas
5. **Teste com valores pequenos** primeiro

---

*Continue explorando os exercícios para praticar esses conceitos!*
