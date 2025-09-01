# Exercícios de Recursividade - UTFPR

Este repositório contém a resolução de exercícios de recursividade da disciplina **Resolução de Problemas** do curso de **Sistemas para Internet** da **Universidade Tecnológica Federal do Paraná (UTFPR)** - Campus Guarapuava.

**Professor:** Eleandro Maschio

## Estrutura do Projeto

```
recursividade/
├── extras/          # Exercícios adicionais de recursividade
│   ├── 01.ts       # Fatorial (múltiplas implementações)
│   ├── 02.ts       # Fibonacci (múltiplas implementações)
│   ├── 03.ts       # Soma de array
│   ├── 04.ts       # Potência
│   ├── 05.ts       # Inverter string
│   ├── 06.ts       # Verificar palíndromo
│   └── 07.ts       # Busca binária
├── 01.ts           # Mensagem
├── 02.ts           # Contagem progressiva
├── 03.ts           # Contagem de A até B
├── 04.ts           # Soma do intervalo (exercícios 4 e 5)
├── 06.ts           # Fatorial
├── 07.ts           # Potência, Fibonacci, Tribonacci, Tetranacci (exercícios 7-10)
├── 08.ts           # Fibonacci (individual)
├── 09.ts           # Tribonacci (individual)
├── 10.ts           # Tetranacci (individual)
├── 11.ts           # Primeira ocorrência (exercícios 11 e 12)
├── 12.ts           # Primeira ocorrência ordenado (individual)
├── 13.ts           # Operações com matriz (exercícios 13-16)
├── 14.ts           # Soma dos elementos (individual)
├── 15.ts           # Número de ocorrências (individual)
├── 16.ts           # Está ordenado (individual)
└── README.md       # Este arquivo
```

## Exercícios do PDF

### Exercício 1 - MENSAGEM
**Descrição:** Implemente um método que exiba n vezes uma mensagem na tela.

**Soluções implementadas:**
- Recursão simples
- Recursão com contador crescente
- Recursão que retorna array de mensagens

### Exercício 2 - CONTAGEM PROGRESSIVA
**Descrição:** Dado um inteiro positivo n, realize a contagem progressiva de 1 até n.

**Soluções implementadas:**
- Recursão simples
- Recursão reversa
- Recursão que retorna array
- Recursão com acumulador

### Exercício 3 - CONTAGEM DE A ATÉ B
**Descrição:** Dados os inteiros a e b, realize a contagem progressiva de a até b.

**Soluções implementadas:**
- Recursão simples
- Recursão flexível (crescente e decrescente)
- Recursão que retorna array
- Recursão com validação

### Exercício 4 - SOMA DO INTERVALO
**Descrição:** Dados dois números, os limites superior e inferior de um intervalo, retorne a soma dos inteiros neste intervalo fechado.

**Soluções implementadas:**
- Recursão simples
- Recursão com divisão e conquista
- Recursão com acumulador
- Verificação com fórmula matemática

### Exercício 5 - SOMA DO INTERVALO APRIMORADA
**Descrição:** Aprimore a resolução anterior para que os limites sejam invertidos no caso do limite inferior ser maior do que o superior.

**Soluções implementadas:**
- Recursão com inversão automática
- Recursão direta com verificação

### Exercício 6 - FATORIAL
**Descrição:** Dado um inteiro n, retorne n!.

**Soluções implementadas:**
- Recursão clássica
- Recursão com validação
- Tail recursion (recursão de cauda)
- Recursão com memoização

### Exercício 7 - POTÊNCIA
**Descrição:** Dados a base e um expoente positivo, retorne base^expoente.

**Soluções implementadas:**
- Recursão simples
- Exponenciação rápida (binária)

### Exercício 8 - FIBONACCI
**Descrição:** Dado um inteiro positivo n, retorne o n-ésimo termo da série de Fibonacci.
**Sequência:** 1, 1, 2, 3, 5, 8, 13, 21...

**Soluções implementadas:**
- Recursão simples
- Recursão com memoização

### Exercício 9 - TRIBONACCI
**Descrição:** Dado um inteiro positivo n, retorne o n-ésimo termo da série de Tribonacci.
**Sequência:** 1, 1, 2, 4, 7, 13, 24, 44...

**Soluções implementadas:**
- Recursão simples
- Recursão com memoização

### Exercício 10 - TETRANACCI
**Descrição:** Dado um inteiro positivo n, retorne o n-ésimo termo da série de Tetranacci.
**Sequência:** 1, 1, 2, 4, 8, 15, 29, 56...

**Soluções implementadas:**
- Recursão simples
- Recursão com memoização

### Exercício 11 - PRIMEIRA OCORRÊNCIA
**Descrição:** Dado um inteiro e uma matriz unidimensional de 20 inteiros não ordenados, retorne a posição da primeira ocorrência do inteiro na matriz.

**Soluções implementadas:**
- Recursão com índice
- Recursão dividindo a matriz

### Exercício 12 - PRIMEIRA OCORRÊNCIA ORDENADO
**Descrição:** Idem ao anterior, mas suponha que a matriz unidimensional esteja ordenada. (Busca binária)

**Soluções implementadas:**
- Busca binária recursiva
- Busca binária com contador de comparações

### Exercício 13 - MAIOR ELEMENTO
**Descrição:** Considere a mesma matriz unidimensional, não ordenada. Retorne recursivamente o maior elemento.

**Soluções implementadas:**
- Recursão simples
- Recursão com divisão e conquista

### Exercício 14 - SOMA DOS ELEMENTOS
**Descrição:** Considere a mesma matriz unidimensional, não ordenada. Retorne recursivamente a soma dos elementos.

**Soluções implementadas:**
- Recursão simples
- Recursão com acumulador

### Exercício 15 - NÚMERO DE OCORRÊNCIAS
**Descrição:** Considere a mesma matriz unidimensional, não ordenada. Dado um inteiro, retorne recursivamente quantas ocorrências deste há na matriz.

**Soluções implementadas:**
- Recursão simples
- Recursão com contador acumulador

### Exercício 16 - ESTÁ ORDENADO
**Descrição:** Considere a mesma matriz unidimensional, não ordenada. Retorne se a matriz unidimensional está em ordem crescente.

**Soluções implementadas:**
- Recursão simples
- Recursão flexível (crescente ou decrescente)

## Como Executar

Para executar qualquer exercício, use o comando:

```bash
npx ts-node recursividade/XX.ts
```

Onde `XX` é o número do exercício (01, 02, 03, etc.).

Exemplo:
```bash
npx ts-node recursividade/01.ts
npx ts-node recursividade/07.ts
```

## Conceitos de Recursividade Aplicados

### Técnicas Utilizadas:

1. **Recursão Simples**: Implementação direta do conceito recursivo
2. **Tail Recursion**: Otimização onde a chamada recursiva é a última operação
3. **Memoização**: Cache de resultados para evitar recálculos
4. **Divisão e Conquista**: Divisão do problema em subproblemas menores
5. **Recursão com Acumulador**: Uso de parâmetros adicionais para manter estado
6. **Busca Binária**: Aplicação de recursividade em algoritmos de busca eficientes

### Pontos Importantes:

- **Caso Base**: Sempre definido para evitar recursão infinita
- **Validação de Entrada**: Tratamento de casos especiais e entradas inválidas
- **Eficiência**: Comparação entre diferentes abordagens recursivas
- **Complexidade**: Análise de complexidade temporal e espacial

## Pasta Extras

A pasta `extras/` contém exercícios adicionais de recursividade com implementações mais avançadas e múltiplas soluções para cada problema, incluindo:

- Implementações otimizadas
- Casos de teste extensivos
- Comparações de performance
- Análise de complexidade

## Citação

Todos os exercícios desta lista são autorais.

**MASCHIO, Eleandro.** *Recursividade: Exercícios de Revisão.* Guarapuava: Universidade Tecnológica Federal do Paraná, 2024. 2 p. Material didático da disciplina de Resolução de Problemas.

---

**Desenvolvido por:** Luiz Schons  
**Disciplina:** Resolução de Problemas  
**Curso:** Sistemas para Internet  
**Instituição:** UTFPR - Campus Guarapuava  
**Professor:** Eleandro Maschio
