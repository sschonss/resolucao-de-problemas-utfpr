# Métodos de Busca e Ordenação - UTFPR 📊

Este diretório contém a resolução completa dos exercícios de **Métodos de Busca e de Ordenação** da disciplina de Resolução de Problemas da UTFPR - Campus Guarapuava.

## 📋 Lista de Exercícios Resolvidos

### 🎯 **Exercícios 1 e 2** - `exercicio01-02.ts`
**Classe OrdenaTres** - Manipulação de três números inteiros

#### Exercício 1: ORDENA TRÊS
- **Objetivo**: Ordenar três valores inteiros usando apenas 3 estruturas condicionais
- **Método**: `ordenarTres()`
- **Características**: Sem uso de métodos pré-definidos, sem blocos else

#### Exercício 2: MAIOR DE TRÊS  
- **Objetivo**: Encontrar o maior dos três valores
- **Método**: `maiorDeTres()`
- **Características**: Apenas 2 estruturas condicionais, sem blocos else

---

### 🃏 **Exercício 3** - `exercicio03.ts`
**BARALHO** - Análise de algoritmos de ordenação clássicos

#### Algoritmos Implementados:
- **Selection Sort** (Ordenação por Seleção)
- **Bubble Sort** (Ordenação Bolha) 
- **Insertion Sort** (Ordenação por Inserção)

#### Arrays de Teste:
- **(a)** `[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]` - Ordem decrescente
- **(b)** `[10, 1, 9, 2, 8, 3, 7, 4, 6, 5]` - Ordem aleatória
- **(c)** `[4, 5, 6, 1, 2, 3, 7, 8, 9, 10]` - Parcialmente ordenado

#### Métricas Coletadas:
- ✅ Número de comparações
- ✅ Número de trocas
- ✅ Passos detalhados da execução

---

### 🔍 **Exercícios 4-7** - `exercicio04-07.ts`
**Classe ManipuladorArray** - Trabalha com array de 20 elementos

#### Exercício 4: CRESCENTE
- **Objetivo**: Verificar se array está em ordem crescente
- **Método**: `estaCrescente()`
- **Otimização**: Abandona verificação ao encontrar primeira inversão

#### Exercício 5: BUBBLE MELHORADO
- **Objetivo**: Bubble Sort otimizado que para quando não há trocas
- **Método**: `bubbleSortMelhorado()`
- **Vantagem**: Detecção precoce de ordenação completa

#### Exercício 6: EMBARALHAR
- **Objetivo**: Embaralhar array usando algoritmo Fisher-Yates
- **Método**: `embaralhar()`
- **Algoritmo**: Troca aleatória eficiente

#### Exercício 7: GNOME SORT
- **Objetivo**: Implementar algoritmo Gnome Sort
- **Método**: `gnomeSort()`
- **Conceito**: Baseado na lógica dos gnomos organizando vasos

---

### 🧙‍♂️ **Demonstração Especial** - `gnome-sort-demo.ts`
**Análise Completa do Gnome Sort**

#### Funcionalidades:
- 📖 **Explicação do conceito** dos gnomos e vasos
- 🎯 **Execução exata** do exemplo do exercício
- 🔍 **Análise detalhada** passo a passo  
- 📊 **Comparação** com Bubble Sort e Insertion Sort

---

## 🚀 Como Executar

### Executar um exercício específico:
```bash
# Exercícios 1 e 2
npx ts-node exercicio01-02.ts

# Exercício 3 (análise de algoritmos)
npx ts-node exercicio03.ts

# Exercícios 4-7 (manipulação de array)
npx ts-node exercicio04-07.ts

# Demonstração especial do Gnome Sort
npx ts-node gnome-sort-demo.ts
```

### Compilar e executar:
```bash
# Compilar todos os arquivos
tsc *.ts

# Executar arquivo específico
node exercicio01-02.js
```

---

## 📊 Algoritmos Implementados

### 🟢 **Algoritmos Simples**
| Algoritmo | Complexidade | Características |
|-----------|--------------|-----------------|
| **Selection Sort** | O(n²) | Sempre faz n-1 trocas |
| **Bubble Sort** | O(n²) | Pode parar cedo se ordenado |
| **Insertion Sort** | O(n²) | Eficiente para arrays pequenos |
| **Gnome Sort** | O(n²) | Mais simples que Bubble Sort |

### 🔵 **Técnicas de Otimização**
- ✅ **Detecção precoce** (Bubble Sort melhorado)
- ✅ **Verificação eficiente** (abandono de verificação crescente)
- ✅ **Embaralhamento** algoritmo Fisher-Yates
- ✅ **Análise comparativa** de desempenho

---

## 📈 Resultados dos Testes

### Exercício 3 - Análise Comparativa:

#### Array (a): [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
- **Selection Sort**: 45 comparações, 9 trocas
- **Bubble Sort**: 45 comparações, 45 trocas  
- **Insertion Sort**: 45 comparações, 44 trocas

#### Array (b): [10, 1, 9, 2, 8, 3, 7, 4, 6, 5]
- **Selection Sort**: 45 comparações, 9 trocas
- **Bubble Sort**: 45 comparações, 33 trocas
- **Insertion Sort**: 32 comparações, 31 trocas

#### Array (c): [4, 5, 6, 1, 2, 3, 7, 8, 9, 10]
- **Selection Sort**: 45 comparações, 3 trocas
- **Bubble Sort**: 19 comparações, 6 trocas
- **Insertion Sort**: 9 comparações, 6 trocas

---

## 💡 Conceitos Aprendidos

### 🎯 **Análise de Algoritmos**
- Contagem de **comparações** e **trocas**
- **Complexidade temporal** na prática
- **Casos melhores** e **piores** de cada algoritmo

### 🔧 **Técnicas de Implementação**
- Estruturas condicionais **sem else**
- **Otimizações** de algoritmos clássicos
- **Detecção precoce** de condições especiais

### 📊 **Comparação de Desempenho**
- **Selection Sort**: Consistente mas muitas trocas
- **Bubble Sort**: Pode ser otimizado, sensível a ordem inicial
- **Insertion Sort**: Melhor para dados parcialmente ordenados
- **Gnome Sort**: Mais simples, mas não necessariamente mais eficiente

---

## 🎓 Observações Pedagógicas

### ✅ **Pontos Fortes dos Exercícios**
1. **Progressão didática**: Do simples (3 elementos) ao complexo (arrays grandes)
2. **Análise prática**: Contagem de operações em casos reais
3. **Otimizações**: Como melhorar algoritmos básicos
4. **Conceitos únicos**: Gnome Sort como alternativa criativa

### 📚 **Aprendizados Importantes**
- A importância da **análise empírica** além da teórica
- Como **pequenas otimizações** podem ter grande impacto
- A diferença entre **complexidade teórica** e **performance prática**
- O valor de **algoritmos simples** para entender conceitos fundamentais

---

## 🔗 Recursos Adicionais

- [Visualização de Algoritmos de Ordenação](https://visualgo.net/en/sorting)
- [Análise de Complexidade](https://www.bigocheatsheet.com/)
- [Comparison Sorting Algorithms](https://en.wikipedia.org/wiki/Comparison_sort)

---

**Professor**: Dr. Eleandro Maschio  
**Curso**: Tecnologia em Sistemas para Internet  
**Instituição**: UTFPR - Campus Guarapuava  
**Disciplina**: Resolução de Problemas

---

*Implementação completa com análise detalhada, otimizações e comparações de performance.* 🎯
