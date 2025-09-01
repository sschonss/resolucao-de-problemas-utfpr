# Explicação linha a linha do código Solo

**1. class Solo {**
- Define a classe Solo.

**2. private n: number;**
- Armazena a quantidade de notas que será gerada.

**3. private scale: string[] = ["E", "F#", "G", "A", "B", "C", "D"];**
- Define a escala de Mi Menor.

**4. constructor(n: number) {**
- Construtor recebe o número de notas.

**5. this.n = n;**
- Salva o valor em um atributo.

**6. }**
- Fecha o construtor.

**7. private getPrimes(quantity: number): number[] {**
- Função para gerar os primeiros números primos.

**8. let primes: number[] = [];**
- Array para guardar os primos.

**9. let num = 2;**
- Começa a busca pelo número 2.

**10. while (primes.length < quantity) {**
- Repete até ter a quantidade desejada.

**11. let isPrime = true;**
- Assume que o número é primo.

**12. for (let i = 2; i * i <= num; i++) {**
- Testa divisores de 2 até a raiz quadrada de num (sem usar Math).

**13. if (num % i === 0) {**
- Se dividir exato, não é primo.

**14. isPrime = false; break; } }**
- Marca como não primo e sai do laço.

**15. if (isPrime) { primes.push(num); }**
- Se for primo, adiciona ao array.

**16. num++;**
- Vai para o próximo número.

**17. }**
- Fecha o while.

**18. return primes;**
- Retorna o array de primos.

**19. }**
- Fecha a função getPrimes.

**20. public getNotes(): string[] {**
- Função principal para gerar as notas.

**21. let notes: string[] = [];**
- Array para guardar as notas.

**22. let primes = this.getPrimes(this.n - 1);**
- Gera os deslocamentos usando primos.

**23. let pos = 0;**
- Começa na primeira posição.

**24. let scaleLength = this.scale.length;**
- Guarda o tamanho da escala.

**25. let firstNote = this.scale[pos];**
- Pega a primeira nota.

**26. notes.push(firstNote);**
- Adiciona ao array de notas.

**27. for (let i = 0; i < primes.length; i++) {**
- Para cada deslocamento primo.

**28. pos = pos + primes[i];**
- Soma o deslocamento.

**29. let index = pos % scaleLength;**
- Garante que o índice fique dentro da escala.

**30. let note = this.scale[index];**
- Pega a nota correspondente.

**31. notes.push(note);**
- Adiciona ao array de notas.

**32. }**
- Fecha o for.

**33. return notes;**
- Retorna o array final de notas.

**34. }**
- Fecha a função getNotes.

**35. }**
- Fecha a classe Solo.

**36. let solo = new Solo(6);**
- Cria uma instância da classe com 6 notas.

**37. console.log(solo.getNotes());**
- Exibe as notas geradas no console.
