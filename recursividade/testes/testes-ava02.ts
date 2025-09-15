import Palindrome from "./Palindrome.ts";

let p1, p2, p3, p4: Palindrome;

p1 = new Palindrome("esse");
console.log("Teste 1");
console.log(p1.isPalindrome());
console.log("> true\n");

p2 = new Palindrome("anilina");
console.log("Teste 2");
console.log(p2.isPalindrome());
console.log("> true\n");

p3 = new Palindrome("este");
console.log("Teste 3");
console.log(p3.isPalindrome());
console.log("> false\n");

p4 = new Palindrome("abcdecba");
console.log("Teste 4");
console.log(p4.isPalindrome());
console.log("> false\n");