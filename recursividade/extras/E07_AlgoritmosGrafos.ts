/**
 * EXERCÍCIO EXTRA 7: ALGORITMOS EM GRAFOS
 * Busca em profundidade (DFS) e outros algoritmos recursivos em grafos
 */

class Grafo {
    private adjacencias: Map<string, string[]>;
    
    constructor() {
        this.adjacencias = new Map();
    }
    
    /**
     * Adiciona um vértice ao grafo
     */
    adicionarVertice(vertice: string): void {
        if (!this.adjacencias.has(vertice)) {
            this.adjacencias.set(vertice, []);
        }
    }
    
    /**
     * Adiciona uma aresta entre dois vértices
     */
    adicionarAresta(origem: string, destino: string, bidirecional: boolean = true): void {
        this.adicionarVertice(origem);
        this.adicionarVertice(destino);
        
        this.adjacencias.get(origem)!.push(destino);
        
        if (bidirecional) {
            this.adjacencias.get(destino)!.push(origem);
        }
    }
    
    /**
     * Busca em profundidade (DFS) recursiva
     */
    dfs(inicio: string, visitados: Set<string> = new Set(), caminho: string[] = []): string[] {
        visitados.add(inicio);
        caminho.push(inicio);
        
        const vizinhos = this.adjacencias.get(inicio) || [];
        
        for (const vizinho of vizinhos) {
            if (!visitados.has(vizinho)) {
                this.dfs(vizinho, visitados, caminho);
            }
        }
        
        return caminho;
    }
    
    /**
     * Verifica se existe caminho entre dois vértices
     */
    existeCaminho(origem: string, destino: string, visitados: Set<string> = new Set()): boolean {
        if (origem === destino) {
            return true;
        }
        
        visitados.add(origem);
        const vizinhos = this.adjacencias.get(origem) || [];
        
        for (const vizinho of vizinhos) {
            if (!visitados.has(vizinho)) {
                if (this.existeCaminho(vizinho, destino, visitados)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Encontra todos os caminhos entre dois vértices
     */
    encontrarTodosCaminhos(origem: string, destino: string, 
                          visitados: Set<string> = new Set(), 
                          caminhoAtual: string[] = []): string[][] {
        visitados.add(origem);
        caminhoAtual.push(origem);
        
        if (origem === destino) {
            // Encontrou um caminho completo
            const resultado = [[...caminhoAtual]];
            // Backtrack
            visitados.delete(origem);
            caminhoAtual.pop();
            return resultado;
        }
        
        const todosCaminhos: string[][] = [];
        const vizinhos = this.adjacencias.get(origem) || [];
        
        for (const vizinho of vizinhos) {
            if (!visitados.has(vizinho)) {
                const caminhos = this.encontrarTodosCaminhos(vizinho, destino, visitados, caminhoAtual);
                todosCaminhos.push(...caminhos);
            }
        }
        
        // Backtrack
        visitados.delete(origem);
        caminhoAtual.pop();
        
        return todosCaminhos;
    }
    
    /**
     * Detecta ciclos no grafo
     */
    temCiclo(): boolean {
        const visitados = new Set<string>();
        const pilhaRecursao = new Set<string>();
        
        for (const vertice of this.adjacencias.keys()) {
            if (!visitados.has(vertice)) {
                if (this.temCicloUtil(vertice, visitados, pilhaRecursao)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private temCicloUtil(vertice: string, visitados: Set<string>, pilhaRecursao: Set<string>): boolean {
        visitados.add(vertice);
        pilhaRecursao.add(vertice);
        
        const vizinhos = this.adjacencias.get(vertice) || [];
        
        for (const vizinho of vizinhos) {
            if (!visitados.has(vizinho)) {
                if (this.temCicloUtil(vizinho, visitados, pilhaRecursao)) {
                    return true;
                }
            } else if (pilhaRecursao.has(vizinho)) {
                return true; // Ciclo detectado
            }
        }
        
        pilhaRecursao.delete(vertice);
        return false;
    }
    
    /**
     * Ordenação topológica (apenas para grafos acíclicos direcionados)
     */
    ordenacaoTopologica(): string[] {
        const visitados = new Set<string>();
        const pilha: string[] = [];
        
        for (const vertice of this.adjacencias.keys()) {
            if (!visitados.has(vertice)) {
                this.ordenacaoTopologicaUtil(vertice, visitados, pilha);
            }
        }
        
        return pilha.reverse();
    }
    
    private ordenacaoTopologicaUtil(vertice: string, visitados: Set<string>, pilha: string[]): void {
        visitados.add(vertice);
        
        const vizinhos = this.adjacencias.get(vertice) || [];
        
        for (const vizinho of vizinhos) {
            if (!visitados.has(vizinho)) {
                this.ordenacaoTopologicaUtil(vizinho, visitados, pilha);
            }
        }
        
        pilha.push(vertice);
    }
    
    /**
     * Encontra componentes fortemente conectados
     */
    componentesFortementeConectados(): string[][] {
        const visitados = new Set<string>();
        const pilha: string[] = [];
        
        // Primeira DFS
        for (const vertice of this.adjacencias.keys()) {
            if (!visitados.has(vertice)) {
                this.dfsParaPilha(vertice, visitados, pilha);
            }
        }
        
        // Cria grafo transposto
        const grafoTransposto = this.transpor();
        
        // Segunda DFS no grafo transposto
        visitados.clear();
        const componentes: string[][] = [];
        
        while (pilha.length > 0) {
            const vertice = pilha.pop()!;
            if (!visitados.has(vertice)) {
                const componente = grafoTransposto.dfs(vertice, visitados);
                componentes.push(componente);
            }
        }
        
        return componentes;
    }
    
    private dfsParaPilha(vertice: string, visitados: Set<string>, pilha: string[]): void {
        visitados.add(vertice);
        
        const vizinhos = this.adjacencias.get(vertice) || [];
        
        for (const vizinho of vizinhos) {
            if (!visitados.has(vizinho)) {
                this.dfsParaPilha(vizinho, visitados, pilha);
            }
        }
        
        pilha.push(vertice);
    }
    
    private transpor(): Grafo {
        const grafoTransposto = new Grafo();
        
        for (const [vertice, vizinhos] of this.adjacencias) {
            grafoTransposto.adicionarVertice(vertice);
            
            for (const vizinho of vizinhos) {
                grafoTransposto.adicionarAresta(vizinho, vertice, false);
            }
        }
        
        return grafoTransposto;
    }
    
    /**
     * Imprime o grafo
     */
    imprimir(): void {
        for (const [vertice, vizinhos] of this.adjacencias) {
            console.log(`${vertice} → ${vizinhos.join(', ')}`);
        }
    }
    
    /**
     * Obtém todos os vértices
     */
    obterVertices(): string[] {
        return Array.from(this.adjacencias.keys());
    }
}

/**
 * Algoritmos de árvore geradora mínima e outros algoritmos avançados
 */
class AlgoritmosAvancados {
    
    /**
     * Problema do caixeiro viajante (TSP) usando backtracking
     */
    static caixeiroViajante(distancias: number[][]): { caminho: number[], distancia: number } {
        const n = distancias.length;
        const visitados = Array(n).fill(false);
        visitados[0] = true;
        
        const resultado = {
            caminho: [] as number[],
            distancia: Infinity
        };
        
        this.tspUtil(distancias, visitados, 0, 1, 0, [0], resultado);
        
        return resultado;
    }
    
    private static tspUtil(distancias: number[][], visitados: boolean[], 
                          cidadeAtual: number, contVisitadas: number, 
                          distanciaAtual: number, caminhoAtual: number[],
                          resultado: { caminho: number[], distancia: number }): void {
        
        const n = distancias.length;
        
        // Se visitou todas as cidades, volta para o início
        if (contVisitadas === n) {
            const distanciaTotal = distanciaAtual + distancias[cidadeAtual][0];
            if (distanciaTotal < resultado.distancia) {
                resultado.distancia = distanciaTotal;
                resultado.caminho = [...caminhoAtual, 0];
            }
            return;
        }
        
        // Tenta visitar cada cidade não visitada
        for (let cidade = 0; cidade < n; cidade++) {
            if (!visitados[cidade]) {
                visitados[cidade] = true;
                caminhoAtual.push(cidade);
                
                this.tspUtil(distancias, visitados, cidade, contVisitadas + 1,
                           distanciaAtual + distancias[cidadeAtual][cidade], 
                           caminhoAtual, resultado);
                
                // Backtrack
                visitados[cidade] = false;
                caminhoAtual.pop();
            }
        }
    }
}

// Testes
console.log("=== EXERCÍCIO EXTRA 7: ALGORITMOS EM GRAFOS ===\n");

console.log("1. CRIANDO E EXPLORANDO GRAFO:");
const grafoTeste = new Grafo();

// Adicionando vértices e arestas
grafoTeste.adicionarAresta('A', 'B');
grafoTeste.adicionarAresta('A', 'C');
grafoTeste.adicionarAresta('B', 'D');
grafoTeste.adicionarAresta('C', 'D');
grafoTeste.adicionarAresta('D', 'E');

console.log("Estrutura do grafo:");
grafoTeste.imprimir();

console.log("\nBusca em profundidade a partir de 'A':");
console.log(grafoTeste.dfs('A'));

console.log("\n2. VERIFICAÇÃO DE CAMINHOS:");
console.log(`Existe caminho A → E: ${grafoTeste.existeCaminho('A', 'E')}`);
console.log(`Existe caminho E → A: ${grafoTeste.existeCaminho('E', 'A')}`);

console.log("\n3. TODOS OS CAMINHOS DE A PARA E:");
const todosCaminhos = grafoTeste.encontrarTodosCaminhos('A', 'E');
todosCaminhos.forEach((caminho, i) => {
    console.log(`Caminho ${i + 1}: ${caminho.join(' → ')}`);
});

console.log("\n4. DETECÇÃO DE CICLOS:");
const grafoComCiclo = new Grafo();
grafoComCiclo.adicionarAresta('X', 'Y', false);
grafoComCiclo.adicionarAresta('Y', 'Z', false);
grafoComCiclo.adicionarAresta('Z', 'X', false);

console.log(`Grafo original tem ciclo: ${grafoTeste.temCiclo()}`);
console.log(`Grafo com ciclo tem ciclo: ${grafoComCiclo.temCiclo()}`);

console.log("\n5. ORDENAÇÃO TOPOLÓGICA:");
const grafoDAG = new Grafo();
grafoDAG.adicionarAresta('5', '2', false);
grafoDAG.adicionarAresta('5', '0', false);
grafoDAG.adicionarAresta('4', '0', false);
grafoDAG.adicionarAresta('4', '1', false);
grafoDAG.adicionarAresta('2', '3', false);
grafoDAG.adicionarAresta('3', '1', false);

console.log("Ordenação topológica:", grafoDAG.ordenacaoTopologica());

console.log("\n6. PROBLEMA DO CAIXEIRO VIAJANTE:");
const distancias = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
];

console.log("Matriz de distâncias:");
distancias.forEach((linha, i) => {
    console.log(`Cidade ${i}: [${linha.join(', ')}]`);
});

const resultadoTSP = AlgoritmosAvancados.caixeiroViajante(distancias);
console.log(`\nMelhor caminho: ${resultadoTSP.caminho.join(' → ')}`);
console.log(`Distância total: ${resultadoTSP.distancia}`);
