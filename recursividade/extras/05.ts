// Exercício 5: Inverter uma string

// Solução 1: Recursão simples
function inverterStringRecursiva(str: string): string {
    // Caso base: string vazia ou com um caractere
    if (str.length <= 1) {
        return str;
    }
    
    // Pega o último caractere + recursão com o resto da string
    return str[str.length - 1] + inverterStringRecursiva(str.slice(0, -1));
}

// Solução 2: Recursão usando substring
function inverterStringSubstring(str: string): string {
    // Caso base
    if (str === "") {
        return "";
    }
    
    // Pega o primeiro caractere e o coloca no final
    return inverterStringSubstring(str.substring(1)) + str[0];
}

// Solução 3: Recursão com índices
function inverterStringIndices(str: string, inicio: number = 0, fim: number = str.length - 1): string {
    // Caso base: quando os índices se cruzam
    if (inicio >= fim) {
        return str;
    }
    
    // Converte string em array para poder modificar
    const chars = str.split('');
    
    // Troca os caracteres
    [chars[inicio], chars[fim]] = [chars[fim], chars[inicio]];
    
    // Chamada recursiva
    return inverterStringIndices(chars.join(''), inicio + 1, fim - 1);
}

// Solução 4: Recursão com helper function
function inverterStringHelper(str: string): string {
    function helper(index: number): string {
        // Caso base
        if (index >= str.length) {
            return "";
        }
        
        // Recursão: processa do final para o início
        return helper(index + 1) + str[index];
    }
    
    return helper(0);
}

// Testes
console.log("=== Exercício 5: Inverter String ===");
const texto1 = "hello";
const texto2 = "recursividade";
const texto3 = "a";
const texto4 = "";
const texto5 = "12345";

console.log(`"${texto1}" invertida (recursiva):`, inverterStringRecursiva(texto1));
console.log(`"${texto1}" invertida (substring):`, inverterStringSubstring(texto1));
console.log(`"${texto1}" invertida (helper):`, inverterStringHelper(texto1));

console.log(`\n"${texto2}" invertida:`, inverterStringRecursiva(texto2));
console.log(`"${texto3}" invertida:`, inverterStringRecursiva(texto3));
console.log(`"${texto4}" invertida:`, inverterStringRecursiva(texto4));
console.log(`"${texto5}" invertida:`, inverterStringRecursiva(texto5));

// Teste com string longa
const textoLongo = "abcdefghijklmnopqrstuvwxyz";
console.log(`\nTexto longo invertido: ${inverterStringRecursiva(textoLongo)}`);

// Teste palíndromo
const palindromo = "arara";
console.log(`\nPalíndromo "${palindromo}" invertido:`, inverterStringRecursiva(palindromo));
console.log("É igual ao original?", palindromo === inverterStringRecursiva(palindromo));
