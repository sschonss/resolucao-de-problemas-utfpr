// Exercício 6: Verificar se uma string é palíndromo

// Solução 1: Recursão com comparação de extremos
function ehPalindromoRecursivo(str: string, inicio: number = 0, fim: number = str.length - 1): boolean {
    // Remove espaços e converte para minúsculas
    const strLimpa = str.replace(/\s+/g, '').toLowerCase();
    
    // Ajusta os índices para a string limpa
    if (inicio === 0 && fim === str.length - 1) {
        return ehPalindromoRecursivo(strLimpa, 0, strLimpa.length - 1);
    }
    
    // Caso base: quando os índices se encontram ou se cruzam
    if (inicio >= fim) {
        return true;
    }
    
    // Se os caracteres não são iguais, não é palíndromo
    if (strLimpa[inicio] !== strLimpa[fim]) {
        return false;
    }
    
    // Chamada recursiva com os próximos caracteres
    return ehPalindromoRecursivo(strLimpa, inicio + 1, fim - 1);
}

// Solução 2: Recursão comparando com string invertida
function ehPalindromoInvertido(str: string): boolean {
    // Função auxiliar para inverter string recursivamente
    function inverterString(s: string): string {
        if (s.length <= 1) {
            return s;
        }
        return s[s.length - 1] + inverterString(s.slice(0, -1));
    }
    
    // Limpa a string
    const strLimpa = str.replace(/\s+/g, '').toLowerCase();
    
    // Compara com a versão invertida
    return strLimpa === inverterString(strLimpa);
}

// Solução 3: Recursão removendo primeiro e último caractere
function ehPalindromoRemocao(str: string): boolean {
    // Limpa a string na primeira chamada
    const strLimpa = str.replace(/\s+/g, '').toLowerCase();
    
    // Função recursiva interna
    function verificar(s: string): boolean {
        // Caso base: string vazia ou com um caractere
        if (s.length <= 1) {
            return true;
        }
        
        // Se primeiro e último caracteres são diferentes
        if (s[0] !== s[s.length - 1]) {
            return false;
        }
        
        // Remove primeiro e último caractere e verifica recursivamente
        return verificar(s.slice(1, -1));
    }
    
    return verificar(strLimpa);
}

// Solução 4: Recursão com caracteres especiais e acentos
function ehPalindromoCompleto(str: string): boolean {
    // Remove todos os caracteres não alfanuméricos e converte para minúsculas
    const strLimpa = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    function verificar(s: string, inicio: number, fim: number): boolean {
        if (inicio >= fim) {
            return true;
        }
        
        if (s[inicio] !== s[fim]) {
            return false;
        }
        
        return verificar(s, inicio + 1, fim - 1);
    }
    
    return verificar(strLimpa, 0, strLimpa.length - 1);
}

// Testes
console.log("=== Exercício 6: Palíndromo ===");

const testes = [
    "arara",
    "hello",
    "A man a plan a canal Panama",
    "race a car",
    "was it a rat i saw",
    "Madam",
    "12321",
    "12345",
    "A Santa at NASA",
    ""
];

console.log("=== Teste com diferentes soluções ===");
testes.forEach(teste => {
    console.log(`\n"${teste}":`);
    console.log("  Recursivo:", ehPalindromoRecursivo(teste));
    console.log("  Invertido:", ehPalindromoInvertido(teste));
    console.log("  Remoção:", ehPalindromoRemocao(teste));
    console.log("  Completo:", ehPalindromoCompleto(teste));
});

// Testes especiais
console.log("\n=== Testes especiais ===");
console.log('Palíndromo com números: "12321":', ehPalindromoRecursivo("12321"));
console.log('Palíndromo com pontuação: "A man, a plan, a canal: Panama":', 
    ehPalindromoCompleto("A man, a plan, a canal: Panama"));
console.log('String vazia:', ehPalindromoRecursivo(""));
console.log('Um caractere: "a":', ehPalindromoRecursivo("a"));
