# Exercícios Extras de Recursividade 🚀

Esta pasta contém exercícios adicionais e avançados de recursividade para complementar seu aprendizado.

## 📚 Conteúdo Adicional

### 📖 Guia Teórico
- **README_Recursividade.md** - Explicação completa sobre recursividade com exemplos de diferentes níveis

## 🎯 Exercícios por Categoria

### 🟢 **ALGORITMOS DE BUSCA**
- **E01_BuscaBinaria.ts** - Busca binária recursiva
  - Busca simples e com debug
  - Primeira ocorrência em arrays com duplicatas
  - Análise de complexidade

### 🔵 **PROBLEMAS CLÁSSICOS**
- **E02_TorresHanoi.ts** - Torres de Hanói
  - Solução recursiva clássica
  - Visualização do estado das torres
  - Cálculo de movimentos

### 🟡 **ALGORITMOS DE ORDENAÇÃO**
- **E03_OrdenacaoRecursiva.ts** - Algoritmos de ordenação
  - Quicksort, Mergesort, Heapsort
  - Insertion Sort recursivo
  - Testes de performance

### 🟠 **PROBLEMAS COMBINATÓRIOS**
- **E04_Combinatorics.ts** - Combinatória e permutações
  - Permutações e combinações
  - Conjunto das partes (power set)
  - N-rainhas, partições de números
  - Coeficiente binomial com memoização

### 🟣 **ESTRUTURAS DE DADOS**
- **E05_ProcessamentoArvores.ts** - Árvores binárias
  - Percursos (pré, em, pós-ordem)
  - Propriedades da árvore (altura, nós, folhas)
  - Busca, espelhamento, comparação
  - Visualização da árvore

### 🔴 **BACKTRACKING**
- **E06_Backtracking.ts** - Algoritmos de backtracking
  - Labirinto, Sudoku
  - Problema do cavalo
  - Coloração de grafos

### ⚫ **ALGORITMOS EM GRAFOS**
- **E07_AlgoritmosGrafos.ts** - Processamento de grafos
  - DFS (Busca em Profundidade)
  - Detecção de ciclos
  - Caminhos entre vértices
  - Ordenação topológica
  - Caixeiro viajante (TSP)

### 🔷 **PROGRAMAÇÃO DINÂMICA**
- **E08_ProgramacaoDinamica.ts** - Otimização com memoização
  - Problema da mochila 0/1
  - Corte de hastes
  - Subsequência comum mais longa (LCS)
  - Problema do troco
  - Fibonacci otimizado

## 🎯 Níveis de Dificuldade

### 🟢 **INICIANTE**
- Busca binária básica
- Torres de Hanói (pequeno número de discos)
- Percursos em árvores
- Fibonacci com memoização

### 🟡 **INTERMEDIÁRIO**
- Algoritmos de ordenação
- Problemas combinatórios
- Backtracking simples
- DFS em grafos

### 🔴 **AVANÇADO**
- N-rainhas para N > 8
- Caixeiro viajante
- Algoritmos de programação dinâmica
- Sudoku e problemas complexos de backtracking

## 🚀 Como Executar

```bash
# Executar um exercício específico
npx ts-node E01_BuscaBinaria.ts

# Executar com Node.js (após compilar)
tsc E01_BuscaBinaria.ts && node E01_BuscaBinaria.js
```

## 📊 Complexidade dos Algoritmos

| Algoritmo | Complexidade de Tempo | Complexidade de Espaço |
|-----------|----------------------|----------------------|
| Busca Binária | O(log n) | O(log n) |
| Torres de Hanói | O(2^n) | O(n) |
| Quicksort | O(n log n) | O(log n) |
| Mergesort | O(n log n) | O(n) |
| N-Rainhas | O(n!) | O(n) |
| DFS | O(V + E) | O(V) |
| Mochila 0/1 | O(nW) | O(nW) |

## 🎓 Conceitos Abordados

- **Recursão simples** e **recursão com múltiplas chamadas**
- **Caso base** e **caso recursivo**
- **Backtracking** e **poda**
- **Memoização** e **programação dinâmica**
- **Divisão e conquista**
- **Tail recursion** e otimizações
- **Complexidade de algoritmos recursivos**

## 💡 Dicas de Estudo

1. **Comece pelos exercícios mais simples** (E01, E02)
2. **Entenda bem o caso base** antes de implementar
3. **Use debug e visualização** para acompanhar a recursão
4. **Compare diferentes abordagens** para o mesmo problema
5. **Meça a performance** e entenda a complexidade
6. **Pratique memoização** para otimizar algoritmos

## 🔗 Recursos Adicionais

- [Visualização de Algoritmos](https://visualgo.net/)
- [Análise de Complexidade](https://www.bigocheatsheet.com/)
- [Recursão vs Iteração](https://stackoverflow.com/questions/15688019/recursive-vs-iterative-functions)

---

**Lembre-se**: A recursão é uma ferramenta poderosa, mas nem sempre é a melhor solução. Pratique identificar quando usar recursão e quando preferir iteração! 🎯
