/**
 * EXERCÍCIO EXTRA 6: BACKTRACKING E PROBLEMAS DE BUSCA
 * Algoritmos que exploram todas as possibilidades usando backtracking
 */

class Backtracking {
    
    /**
     * PROBLEMA DO LABIRINTO
     * Encontra caminho da entrada até a saída
     */
    static resolverLabirinto(labirinto: number[][]): boolean {
        const linhas = labirinto.length;
        const colunas = labirinto[0].length;
        const solucao: number[][] = Array.from({length: linhas}, () => Array(colunas).fill(0));
        
        if (this.labirintoUtil(labirinto, 0, 0, solucao)) {
            console.log("Caminho encontrado:");
            this.imprimirMatriz(solucao);
            return true;
        } else {
            console.log("Nenhum caminho encontrado!");
            return false;
        }
    }
    
    private static labirintoUtil(labirinto: number[][], x: number, y: number, solucao: number[][]): boolean {
        const linhas = labirinto.length;
        const colunas = labirinto[0].length;
        
        // Chegou ao destino
        if (x === linhas - 1 && y === colunas - 1 && labirinto[x][y] === 1) {
            solucao[x][y] = 1;
            return true;
        }
        
        // Verifica se a posição é válida
        if (this.posicaoValidaLabirinto(labirinto, x, y)) {
            // Marca como parte da solução
            solucao[x][y] = 1;
            
            // Move para direita
            if (this.labirintoUtil(labirinto, x, y + 1, solucao)) {
                return true;
            }
            
            // Move para baixo
            if (this.labirintoUtil(labirinto, x + 1, y, solucao)) {
                return true;
            }
            
            // Move para esquerda
            if (this.labirintoUtil(labirinto, x, y - 1, solucao)) {
                return true;
            }
            
            // Move para cima
            if (this.labirintoUtil(labirinto, x - 1, y, solucao)) {
                return true;
            }
            
            // BACKTRACK: desfaz a marcação
            solucao[x][y] = 0;
            return false;
        }
        
        return false;
    }
    
    private static posicaoValidaLabirinto(labirinto: number[][], x: number, y: number): boolean {
        const linhas = labirinto.length;
        const colunas = labirinto[0].length;
        
        return x >= 0 && x < linhas && y >= 0 && y < colunas && labirinto[x][y] === 1;
    }
    
    /**
     * PROBLEMA DO SUDOKU
     * Resolve um puzzle de Sudoku 9x9
     */
    static resolverSudoku(grade: number[][]): boolean {
        const posicaoVazia = this.encontrarPosicaoVazia(grade);
        
        if (!posicaoVazia) {
            return true; // Sudoku resolvido
        }
        
        const [linha, coluna] = posicaoVazia;
        
        for (let num = 1; num <= 9; num++) {
            if (this.numeroValidoSudoku(grade, linha, coluna, num)) {
                grade[linha][coluna] = num;
                
                if (this.resolverSudoku(grade)) {
                    return true;
                }
                
                // BACKTRACK
                grade[linha][coluna] = 0;
            }
        }
        
        return false;
    }
    
    private static encontrarPosicaoVazia(grade: number[][]): [number, number] | null {
        for (let linha = 0; linha < 9; linha++) {
            for (let coluna = 0; coluna < 9; coluna++) {
                if (grade[linha][coluna] === 0) {
                    return [linha, coluna];
                }
            }
        }
        return null;
    }
    
    private static numeroValidoSudoku(grade: number[][], linha: number, coluna: number, num: number): boolean {
        // Verifica linha
        for (let y = 0; y < 9; y++) {
            if (grade[linha][y] === num) {
                return false;
            }
        }
        
        // Verifica coluna
        for (let x = 0; x < 9; x++) {
            if (grade[x][coluna] === num) {
                return false;
            }
        }
        
        // Verifica quadrante 3x3
        const startLinha = Math.floor(linha / 3) * 3;
        const startColuna = Math.floor(coluna / 3) * 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grade[startLinha + i][startColuna + j] === num) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    /**
     * PROBLEMA DO CAVALO NO TABULEIRO
     * Encontra um caminho onde o cavalo visita todas as casas do tabuleiro
     */
    static cavaleiro(tamanho: number = 8): boolean {
        const tabuleiro: number[][] = Array.from({length: tamanho}, () => Array(tamanho).fill(-1));
        
        // Movimentos possíveis do cavalo
        const movX = [2, 1, -1, -2, -2, -1, 1, 2];
        const movY = [1, 2, 2, 1, -1, -2, -2, -1];
        
        tabuleiro[0][0] = 0;
        
        if (this.cavaleitoUtil(0, 0, 1, tabuleiro, movX, movY, tamanho)) {
            console.log("Solução do Cavalo encontrada:");
            this.imprimirMatriz(tabuleiro);
            return true;
        } else {
            console.log("Nenhuma solução encontrada para o Cavalo!");
            return false;
        }
    }
    
    private static cavaleitoUtil(x: number, y: number, movNum: number, tabuleiro: number[][], 
                                movX: number[], movY: number[], tamanho: number): boolean {
        
        if (movNum === tamanho * tamanho) {
            return true;
        }
        
        for (let i = 0; i < 8; i++) {
            const proxX = x + movX[i];
            const proxY = y + movY[i];
            
            if (this.posicaoValidaCavalo(proxX, proxY, tabuleiro, tamanho)) {
                tabuleiro[proxX][proxY] = movNum;
                
                if (this.cavaleitoUtil(proxX, proxY, movNum + 1, tabuleiro, movX, movY, tamanho)) {
                    return true;
                }
                
                // BACKTRACK
                tabuleiro[proxX][proxY] = -1;
            }
        }
        
        return false;
    }
    
    private static posicaoValidaCavalo(x: number, y: number, tabuleiro: number[][], tamanho: number): boolean {
        return x >= 0 && x < tamanho && y >= 0 && y < tamanho && tabuleiro[x][y] === -1;
    }
    
    /**
     * COLORAÇÃO DE GRAFOS
     * Determina se um grafo pode ser colorido com m cores
     */
    static colorirGrafo(grafo: number[][], m: number): boolean {
        const numVertices = grafo.length;
        const cores: number[] = Array(numVertices).fill(0);
        
        if (this.colorirGrafoUtil(grafo, m, cores, 0)) {
            console.log("Coloração encontrada:");
            cores.forEach((cor, vertice) => {
                console.log(`Vértice ${vertice}: Cor ${cor}`);
            });
            return true;
        } else {
            console.log(`Não é possível colorir com ${m} cores!`);
            return false;
        }
    }
    
    private static colorirGrafoUtil(grafo: number[][], m: number, cores: number[], vertice: number): boolean {
        const numVertices = grafo.length;
        
        if (vertice === numVertices) {
            return true;
        }
        
        for (let cor = 1; cor <= m; cor++) {
            if (this.corSegura(grafo, vertice, cores, cor)) {
                cores[vertice] = cor;
                
                if (this.colorirGrafoUtil(grafo, m, cores, vertice + 1)) {
                    return true;
                }
                
                // BACKTRACK
                cores[vertice] = 0;
            }
        }
        
        return false;
    }
    
    private static corSegura(grafo: number[][], vertice: number, cores: number[], cor: number): boolean {
        for (let i = 0; i < grafo.length; i++) {
            if (grafo[vertice][i] === 1 && cores[i] === cor) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Utilitário para imprimir matrizes
     */
    static imprimirMatriz(matriz: number[][]): void {
        matriz.forEach(linha => {
            console.log(linha.map(val => val.toString().padStart(3)).join(' '));
        });
    }
}

// Testes
console.log("=== EXERCÍCIO EXTRA 6: BACKTRACKING ===\n");

console.log("1. PROBLEMA DO LABIRINTO:");
const labirinto = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
];
console.log("Labirinto (1 = caminho livre, 0 = parede):");
Backtracking.imprimirMatriz(labirinto);
Backtracking.resolverLabirinto(labirinto);

console.log("\n" + "=".repeat(50));
console.log("2. PROBLEMA DO SUDOKU (exemplo simples):");
const sudoku = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

if (Backtracking.resolverSudoku(sudoku)) {
    console.log("Sudoku resolvido:");
    Backtracking.imprimirMatriz(sudoku);
}

console.log("\n" + "=".repeat(50));
console.log("3. PROBLEMA DO CAVALO (5x5):");
Backtracking.cavaleiro(5);

console.log("\n" + "=".repeat(50));
console.log("4. COLORAÇÃO DE GRAFOS:");
const grafo = [
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0]
];
console.log("Tentando colorir grafo com 3 cores:");
Backtracking.colorirGrafo(grafo, 3);
