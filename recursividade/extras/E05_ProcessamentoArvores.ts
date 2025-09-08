/**
 * EXERCÍCIO EXTRA 5: PROCESSAMENTO DE ÁRVORES E ESTRUTURAS RECURSIVAS
 * Operações em árvores binárias e outras estruturas recursivas
 */

// Definição da estrutura de nó da árvore binária
class NoArvore {
    valor: number;
    esquerda: NoArvore | null = null;
    direita: NoArvore | null = null;
    
    constructor(valor: number) {
        this.valor = valor;
    }
}

class ProcessamentoArvores {
    
    /**
     * Cria uma árvore de exemplo para testes
     */
    static criarArvoreExemplo(): NoArvore {
        //        1
        //      /   \
        //     2     3
        //   /  \   /
        //  4    5 6
        const raiz = new NoArvore(1);
        raiz.esquerda = new NoArvore(2);
        raiz.direita = new NoArvore(3);
        raiz.esquerda.esquerda = new NoArvore(4);
        raiz.esquerda.direita = new NoArvore(5);
        raiz.direita.esquerda = new NoArvore(6);
        
        return raiz;
    }
    
    /**
     * Percurso em pré-ordem (raiz → esquerda → direita)
     */
    static preOrdem(no: NoArvore | null): number[] {
        if (no === null) {
            return [];
        }
        
        return [
            no.valor,
            ...this.preOrdem(no.esquerda),
            ...this.preOrdem(no.direita)
        ];
    }
    
    /**
     * Percurso em ordem (esquerda → raiz → direita)
     */
    static emOrdem(no: NoArvore | null): number[] {
        if (no === null) {
            return [];
        }
        
        return [
            ...this.emOrdem(no.esquerda),
            no.valor,
            ...this.emOrdem(no.direita)
        ];
    }
    
    /**
     * Percurso em pós-ordem (esquerda → direita → raiz)
     */
    static posOrdem(no: NoArvore | null): number[] {
        if (no === null) {
            return [];
        }
        
        return [
            ...this.posOrdem(no.esquerda),
            ...this.posOrdem(no.direita),
            no.valor
        ];
    }
    
    /**
     * Calcula a altura da árvore
     */
    static altura(no: NoArvore | null): number {
        if (no === null) {
            return 0;
        }
        
        const alturaEsquerda = this.altura(no.esquerda);
        const alturaDireita = this.altura(no.direita);
        
        return 1 + Math.max(alturaEsquerda, alturaDireita);
    }
    
    /**
     * Conta o número total de nós
     */
    static contarNos(no: NoArvore | null): number {
        if (no === null) {
            return 0;
        }
        
        return 1 + this.contarNos(no.esquerda) + this.contarNos(no.direita);
    }
    
    /**
     * Conta o número de folhas
     */
    static contarFolhas(no: NoArvore | null): number {
        if (no === null) {
            return 0;
        }
        
        // É folha se não tem filhos
        if (no.esquerda === null && no.direita === null) {
            return 1;
        }
        
        return this.contarFolhas(no.esquerda) + this.contarFolhas(no.direita);
    }
    
    /**
     * Busca um valor na árvore
     */
    static buscar(no: NoArvore | null, valor: number): boolean {
        if (no === null) {
            return false;
        }
        
        if (no.valor === valor) {
            return true;
        }
        
        return this.buscar(no.esquerda, valor) || this.buscar(no.direita, valor);
    }
    
    /**
     * Encontra o valor máximo na árvore
     */
    static valorMaximo(no: NoArvore | null): number | null {
        if (no === null) {
            return null;
        }
        
        let max = no.valor;
        
        const maxEsquerda = this.valorMaximo(no.esquerda);
        const maxDireita = this.valorMaximo(no.direita);
        
        if (maxEsquerda !== null && maxEsquerda > max) {
            max = maxEsquerda;
        }
        
        if (maxDireita !== null && maxDireita > max) {
            max = maxDireita;
        }
        
        return max;
    }
    
    /**
     * Calcula a soma de todos os valores
     */
    static somaValores(no: NoArvore | null): number {
        if (no === null) {
            return 0;
        }
        
        return no.valor + this.somaValores(no.esquerda) + this.somaValores(no.direita);
    }
    
    /**
     * Verifica se duas árvores são idênticas
     */
    static saoIdenticas(no1: NoArvore | null, no2: NoArvore | null): boolean {
        // Ambas são nulas
        if (no1 === null && no2 === null) {
            return true;
        }
        
        // Uma é nula e outra não
        if (no1 === null || no2 === null) {
            return false;
        }
        
        // Valores diferentes
        if (no1.valor !== no2.valor) {
            return false;
        }
        
        // Recursivamente verifica as subárvores
        return this.saoIdenticas(no1.esquerda, no2.esquerda) && 
               this.saoIdenticas(no1.direita, no2.direita);
    }
    
    /**
     * Cria uma cópia espelhada da árvore
     */
    static espelhar(no: NoArvore | null): NoArvore | null {
        if (no === null) {
            return null;
        }
        
        const novoNo = new NoArvore(no.valor);
        novoNo.esquerda = this.espelhar(no.direita);
        novoNo.direita = this.espelhar(no.esquerda);
        
        return novoNo;
    }
    
    /**
     * Imprime a árvore de forma visual
     */
    static imprimirArvore(no: NoArvore | null, prefixo: string = "", ehUltimo: boolean = true): void {
        if (no === null) {
            return;
        }
        
        console.log(prefixo + (ehUltimo ? "└── " : "├── ") + no.valor);
        
        const novoPrefixo = prefixo + (ehUltimo ? "    " : "│   ");
        
        if (no.esquerda !== null || no.direita !== null) {
            this.imprimirArvore(no.direita, novoPrefixo, no.esquerda === null);
            this.imprimirArvore(no.esquerda, novoPrefixo, true);
        }
    }
    
    /**
     * Encontra o caminho até um valor específico
     */
    static encontrarCaminho(no: NoArvore | null, valor: number, caminho: string[] = []): string[] | null {
        if (no === null) {
            return null;
        }
        
        // Adiciona o nó atual ao caminho
        const novoCaminho = [...caminho, no.valor.toString()];
        
        if (no.valor === valor) {
            return novoCaminho;
        }
        
        // Busca na subárvore esquerda
        const caminhoEsquerda = this.encontrarCaminho(no.esquerda, valor, novoCaminho);
        if (caminhoEsquerda !== null) {
            return caminhoEsquerda;
        }
        
        // Busca na subárvore direita
        const caminhoDireita = this.encontrarCaminho(no.direita, valor, novoCaminho);
        return caminhoDireita;
    }
}

// Testes
console.log("=== EXERCÍCIO EXTRA 5: PROCESSAMENTO DE ÁRVORES ===\n");

const arvore = ProcessamentoArvores.criarArvoreExemplo();

console.log("1. Visualização da árvore:");
ProcessamentoArvores.imprimirArvore(arvore);

console.log("\n2. Percursos:");
console.log("Pré-ordem:", ProcessamentoArvores.preOrdem(arvore));
console.log("Em ordem:", ProcessamentoArvores.emOrdem(arvore));
console.log("Pós-ordem:", ProcessamentoArvores.posOrdem(arvore));

console.log("\n3. Propriedades da árvore:");
console.log("Altura:", ProcessamentoArvores.altura(arvore));
console.log("Total de nós:", ProcessamentoArvores.contarNos(arvore));
console.log("Número de folhas:", ProcessamentoArvores.contarFolhas(arvore));
console.log("Valor máximo:", ProcessamentoArvores.valorMaximo(arvore));
console.log("Soma dos valores:", ProcessamentoArvores.somaValores(arvore));

console.log("\n4. Buscas:");
console.log("Buscar 5:", ProcessamentoArvores.buscar(arvore, 5));
console.log("Buscar 7:", ProcessamentoArvores.buscar(arvore, 7));
console.log("Caminho até 5:", ProcessamentoArvores.encontrarCaminho(arvore, 5));

console.log("\n5. Árvore espelhada:");
const arvoreEspelhada = ProcessamentoArvores.espelhar(arvore);
ProcessamentoArvores.imprimirArvore(arvoreEspelhada);

console.log("\n6. Comparação:");
console.log("Árvores idênticas:", ProcessamentoArvores.saoIdenticas(arvore, arvore));
console.log("Árvore vs espelhada:", ProcessamentoArvores.saoIdenticas(arvore, arvoreEspelhada));
