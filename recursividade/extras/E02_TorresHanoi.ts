/**
 * EXERCÍCIO EXTRA 2: TORRES DE HANÓI
 * Clássico problema de recursão
 */

class TorresHanoi {
    private static movimentos: string[] = [];
    
    /**
     * Resolve o problema das Torres de Hanói
     */
    static resolver(n: number, origem: string = 'A', destino: string = 'C', auxiliar: string = 'B'): void {
        this.movimentos = [];
        this.moverDiscos(n, origem, destino, auxiliar);
    }
    
    /**
     * Move n discos da torre origem para a torre destino
     */
    private static moverDiscos(n: number, origem: string, destino: string, auxiliar: string): void {
        // Caso base: apenas 1 disco
        if (n === 1) {
            const movimento = `Mover disco 1 de ${origem} para ${destino}`;
            this.movimentos.push(movimento);
            console.log(movimento);
            return;
        }
        
        // Passo 1: Mover n-1 discos para torre auxiliar
        this.moverDiscos(n - 1, origem, auxiliar, destino);
        
        // Passo 2: Mover o disco maior para o destino
        const movimento = `Mover disco ${n} de ${origem} para ${destino}`;
        this.movimentos.push(movimento);
        console.log(movimento);
        
        // Passo 3: Mover n-1 discos da auxiliar para o destino
        this.moverDiscos(n - 1, auxiliar, destino, origem);
    }
    
    /**
     * Conta quantos movimentos são necessários
     */
    static contarMovimentos(n: number): number {
        if (n === 1) return 1;
        return 2 * this.contarMovimentos(n - 1) + 1;
    }
    
    /**
     * Fórmula direta: 2^n - 1
     */
    static contarMovimentosDireto(n: number): number {
        return Math.pow(2, n) - 1;
    }
    
    /**
     * Versão com visualização do estado das torres
     */
    static resolverComVisualizacao(n: number): void {
        const torres = {
            A: Array.from({length: n}, (_, i) => n - i),
            B: [] as number[],
            C: [] as number[]
        };
        
        console.log("\nEstado inicial:");
        this.mostrarTorres(torres);
        
        this.moverComVisualizacao(n, 'A', 'C', 'B', torres);
        
        console.log("\nEstado final:");
        this.mostrarTorres(torres);
    }
    
    private static moverComVisualizacao(n: number, origem: string, destino: string, auxiliar: string, torres: any): void {
        if (n === 1) {
            const disco = torres[origem].pop();
            torres[destino].push(disco);
            console.log(`\nMover disco ${disco} de ${origem} para ${destino}`);
            this.mostrarTorres(torres);
            return;
        }
        
        this.moverComVisualizacao(n - 1, origem, auxiliar, destino, torres);
        
        const disco = torres[origem].pop();
        torres[destino].push(disco);
        console.log(`\nMover disco ${disco} de ${origem} para ${destino}`);
        this.mostrarTorres(torres);
        
        this.moverComVisualizacao(n - 1, auxiliar, destino, origem, torres);
    }
    
    private static mostrarTorres(torres: any): void {
        const maxAltura = Math.max(torres.A.length, torres.B.length, torres.C.length);
        
        for (let i = maxAltura - 1; i >= 0; i--) {
            const discosA = torres.A[i] || ' ';
            const discosB = torres.B[i] || ' ';
            const discosC = torres.C[i] || ' ';
            console.log(`A: [${discosA}]  B: [${discosB}]  C: [${discosC}]`);
        }
        console.log("A: ---  B: ---  C: ---");
    }
    
    static obterMovimentos(): string[] {
        return [...this.movimentos];
    }
}

// Testes
console.log("=== EXERCÍCIO EXTRA 2: TORRES DE HANÓI ===\n");

console.log("1. Resolver com 3 discos:");
TorresHanoi.resolver(3);

console.log(`\nTotal de movimentos: ${TorresHanoi.obterMovimentos().length}`);
console.log(`Movimentos calculados: ${TorresHanoi.contarMovimentos(3)}`);
console.log(`Fórmula direta (2^n-1): ${TorresHanoi.contarMovimentosDireto(3)}`);

console.log("\n" + "=".repeat(50));
console.log("2. Visualização com 3 discos:");
TorresHanoi.resolverComVisualizacao(3);
