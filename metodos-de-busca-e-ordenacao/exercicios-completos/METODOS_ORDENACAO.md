# Métodos de Busca e Ordenação

## Índice
1. [Algoritmos de Busca](#algoritmos-de-busca)
2. [Algoritmos de Ordenação](#algoritmos-de-ordenação)
3. [Complexidade Temporal e Espacial](#complexidade-temporal-e-espacial)
4. [Quando Usar Cada Algoritmo](#quando-usar-cada-algoritmo)

## Algoritmos de Busca

### 1. Busca Linear (Sequential Search)
- **Conceito**: Percorre a lista elemento por elemento até encontrar o valor desejado
- **Complexidade**: O(n)
- **Uso**: Listas não ordenadas, pequenas quantidades de dados
- **Vantagem**: Simples de implementar, funciona em qualquer lista
- **Desvantagem**: Lenta para grandes volumes de dados

### 2. Busca Binária (Binary Search)
- **Conceito**: Divide a lista pela metade e compara com o elemento do meio
- **Complexidade**: O(log n)
- **Uso**: Listas ordenadas
- **Vantagem**: Muito eficiente para grandes volumes
- **Desvantagem**: Requer lista previamente ordenada

### 3. Busca por Hash
- **Conceito**: Usa função hash para mapear chaves para posições
- **Complexidade**: O(1) no melhor caso, O(n) no pior
- **Uso**: Quando se precisa de acesso rápido frequente
- **Vantagem**: Acesso muito rápido
- **Desvantagem**: Uso de memória adicional, colisões

## Algoritmos de Ordenação

### 1. Bubble Sort (Ordenação por Bolhas)
- **Conceito**: Compara elementos adjacentes e os troca se estiverem fora de ordem
- **Complexidade**: O(n²)
- **Estabilidade**: Estável
- **Uso**: Didático, listas muito pequenas
- **Como funciona**:
  1. Compara cada par de elementos adjacentes
  2. Troca se estiverem fora de ordem
  3. Repete até que nenhuma troca seja necessária

### 2. Selection Sort (Ordenação por Seleção)
- **Conceito**: Seleciona o menor elemento e o coloca na primeira posição, depois repete para o resto
- **Complexidade**: O(n²)
- **Estabilidade**: Não estável
- **Uso**: Listas pequenas, quando o número de trocas deve ser minimizado
- **Como funciona**:
  1. Encontra o menor elemento do array
  2. Troca com o primeiro elemento
  3. Repete para o subarray restante

### 3. Insertion Sort (Ordenação por Inserção)
- **Conceito**: Constrói a sequência ordenada elemento por elemento
- **Complexidade**: O(n²) no pior caso, O(n) no melhor
- **Estabilidade**: Estável
- **Uso**: Listas pequenas, dados quase ordenados
- **Como funciona**:
  1. Assume que o primeiro elemento está ordenado
  2. Pega o próximo elemento e o insere na posição correta
  3. Repete até o fim do array

### 4. Merge Sort (Ordenação por Intercalação)
- **Conceito**: Divide o array pela metade, ordena cada metade e depois as combina
- **Complexidade**: O(n log n)
- **Estabilidade**: Estável
- **Uso**: Grandes volumes de dados, quando estabilidade é importante
- **Como funciona**:
  1. Divide o array em duas metades
  2. Ordena recursivamente cada metade
  3. Combina as metades ordenadas

### 5. Quick Sort (Ordenação Rápida)
- **Conceito**: Escolhe um pivô e particiona o array em elementos menores e maiores que o pivô
- **Complexidade**: O(n log n) em média, O(n²) no pior caso
- **Estabilidade**: Não estável
- **Uso**: Uso geral, muito eficiente na prática
- **Como funciona**:
  1. Escolhe um elemento como pivô
  2. Particiona o array: elementos ≤ pivô à esquerda, > pivô à direita
  3. Ordena recursivamente as partições

### 6. Heap Sort (Ordenação por Heap)
- **Conceito**: Usa uma estrutura de heap para ordenar
- **Complexidade**: O(n log n)
- **Estabilidade**: Não estável
- **Uso**: Quando se precisa de O(n log n) garantido
- **Como funciona**:
  1. Constrói um max-heap com todos os elementos
  2. Remove o máximo (raiz) e o coloca no final
  3. Reconstrói o heap e repete

### 7. Counting Sort (Ordenação por Contagem)
- **Conceito**: Conta a frequência de cada elemento
- **Complexidade**: O(n + k), onde k é o range dos valores
- **Estabilidade**: Estável
- **Uso**: Quando o range de valores é pequeno
- **Como funciona**:
  1. Conta quantas vezes cada valor aparece
  2. Calcula posições baseadas nas contagens
  3. Coloca elementos nas posições corretas

### 8. Radix Sort (Ordenação por Base)
- **Conceito**: Ordena dígito por dígito, do menos significativo ao mais significativo
- **Complexidade**: O(d × (n + k)), onde d é o número de dígitos
- **Estabilidade**: Estável
- **Uso**: Números inteiros, strings de tamanho fixo
- **Como funciona**:
  1. Ordena por cada dígito, começando pelo menos significativo
  2. Usa counting sort como algoritmo estável para cada dígito

### 9. Shell Sort
- **Conceito**: Generalização do insertion sort com gaps que diminuem
- **Complexidade**: Depende da sequência de gaps, tipicamente O(n^1.5)
- **Estabilidade**: Não estável
- **Uso**: Alternativa ao insertion sort para listas médias
- **Como funciona**:
  1. Define uma sequência de gaps
  2. Aplica insertion sort para elementos separados pelo gap
  3. Diminui o gap e repete até gap = 1

### 10. Gnome Sort
- **Conceito**: Similar ao bubble sort, mas move elementos para trás uma posição por vez
- **Complexidade**: O(n²)
- **Estabilidade**: Estável
- **Uso**: Didático, implementação simples
- **Como funciona**:
  1. Se o elemento atual é maior que o anterior, avança
  2. Senão, troca e volta uma posição
  3. Repete até chegar ao final

## Complexidade Temporal e Espacial

| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Espaço | Estável |
|-----------|-------------|------------|-----------|---------|---------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | Não |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | Não |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | Não |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(k) | Sim |
| Radix Sort | O(d(n + k)) | O(d(n + k)) | O(d(n + k)) | O(n + k) | Sim |
| Shell Sort | O(n log n) | O(n^1.5) | O(n²) | O(1) | Não |
| Gnome Sort | O(n) | O(n²) | O(n²) | O(1) | Sim |

## Quando Usar Cada Algoritmo

### Para Pequenos Conjuntos de Dados (n < 50)
- **Insertion Sort**: Eficiente e simples
- **Selection Sort**: Quando o número de trocas deve ser minimizado
- **Bubble Sort**: Apenas para fins didáticos

### Para Conjuntos Médios (50 < n < 1000)
- **Shell Sort**: Boa performance prática
- **Quick Sort**: Excelente performance média
- **Heap Sort**: Quando se precisa de O(n log n) garantido

### Para Grandes Conjuntos (n > 1000)
- **Merge Sort**: Quando estabilidade é importante
- **Quick Sort**: Melhor performance prática geral
- **Heap Sort**: Performance garantida

### Casos Especiais
- **Counting Sort**: Quando o range de valores é pequeno
- **Radix Sort**: Para números inteiros ou strings
- **Busca Binária**: Apenas em arrays já ordenados
- **Hash Search**: Para acesso frequente aos mesmos elementos

### Considerações de Memória
- **In-place** (O(1) espaço extra): Bubble, Selection, Insertion, Shell, Heap, Quick Sort
- **Requer espaço extra**: Merge Sort, Counting Sort, Radix Sort

### Estabilidade
Algoritmos **estáveis** mantêm a ordem relativa de elementos iguais:
- Bubble Sort, Insertion Sort, Merge Sort, Counting Sort, Radix Sort

Algoritmos **não estáveis**:
- Selection Sort, Quick Sort, Heap Sort, Shell Sort
