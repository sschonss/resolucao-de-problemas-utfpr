// Luiz Schons && João Paulo
class Solo {
    private n: number;
    private scale: string[] = ["E", "F#", "G", "A", "B", "C", "D"];

    constructor(n: number) {
        this.n = n;
    }

    private getPrimes(quantity: number): number[] {
        let primes: number[] = [];
        let num = 2;
        while (primes.length < quantity) {
            let isPrime = true;
            for (let i = 2; i * i <= num; i++) {
                if (num % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.push(num);
            }
            num++;
        }
        return primes;
    }

    public getNotes(): string[] {
        let notes: string[] = [];
        let primes = this.getPrimes(this.n - 1);
        let pos = 0;
        let scaleLength = this.scale.length;
        let firstNote = this.scale[pos];
        notes.push(firstNote);
        for (let i = 0; i < primes.length; i++) {
            pos = pos + primes[i];
            let index = pos % scaleLength;
            let note = this.scale[index];
            notes.push(note);
        }
        return notes;
    }
}

let solo = new Solo(6);
console.log(solo.getNotes());