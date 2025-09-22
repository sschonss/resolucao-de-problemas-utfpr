import {
    CartelaBingoOrdenada,
    CartelaBingoNaoOrdenada,
    CartelaBingoHibrida,
    JogoBingo,
    desafioBingo
} from './exercicios-dificeis';

// ==================== DEMONSTRAÇÃO DO DESAFIO BINGO ====================

function demonstracaoBingo(): void {
    console.log("🎯 DESAFIO ESPECIAL: BINGO ORDENADO vs NÃO ORDENADO\n");
    console.log("=====================================================\n");

    console.log("Este desafio demonstra como diferentes estratégias de ordenação");
    console.log("e busca afetam o desempenho em um jogo de bingo:\n");

    console.log("🔍 ESTRATÉGIAS COMPARADAS:");
    console.log("1. Cartela Ordenada: Mantém números ordenados, busca binária O(log n)");
    console.log("2. Cartela Não Ordenada: Usa Set JavaScript, busca O(1)");
    console.log("3. Cartela Híbrida: Busca linear para poucos elementos, binária para muitos\n");

    // Executar o desafio completo
    desafioBingo();

    console.log("\n" + "=".repeat(60));
    console.log("💡 CONCLUSÕES DO DESAFIO:");
    console.log("• Arrays ordenados são ideais para busca binária em dados grandes");
    console.log("• Sets oferecem busca O(1) mas consomem mais memória");
    console.log("• Estratégias híbridas se adaptam ao tamanho dos dados");
    console.log("• A escolha da estrutura de dados depende do caso de uso!");
    console.log("=".repeat(60));
}

export { demonstracaoBingo };