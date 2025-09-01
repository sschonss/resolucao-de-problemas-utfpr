// Luiz Schons && João Paulo
var Solo = /** @class */ (function () {
    function Solo(n) {
        this.scale = ["E", "F#", "G", "A", "B", "C", "D"];
        this.n = n;
    }
    Solo.prototype.getPrimes = function (quantity) {
        var primes = [];
        var num = 2;
        while (primes.length < quantity) {
            var isPrime = true;
            for (var i = 2; i * i <= num; i++) {
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
    };
    Solo.prototype.getNotes = function () {
        var notes = [];
        var primes = this.getPrimes(this.n - 1);
        var pos = 0;
        var scaleLength = this.scale.length;
        var firstNote = this.scale[pos];
        notes.push(firstNote);
        for (var i = 0; i < primes.length; i++) {
            pos = pos + primes[i];
            var index = pos % scaleLength;
            var note = this.scale[index];
            notes.push(note);
        }
        return notes;
    };
    return Solo;
}());
var solo = new Solo(6);
console.log(solo.getNotes());
