let numberA = document.getElementById('a'),
    numberB = document.getElementById('b'),
    sign = document.getElementById('sign'),
    input = document.getElementById('result');

let aRandom = numberA.innerHTML = getRandomNumber(1, 100),
    bRandom = numberB.innerHTML = getRandomNumber(1, 100),
    signRandom = sign.innerHTML = getRandomSign(),
    plusSign = '+';

function checkResult() {
    let temp;
    if (signRandom === '-') {
        temp = aRandom - bRandom;
    } else if (signRandom === '+') {
        temp = aRandom + bRandom;
    }
    if (temp === parseInt(input.value)) {
        input.value = '';
        aRandom = numberA.innerHTML = getRandomNumber(1, 100);
        bRandom = numberB.innerHTML = getRandomNumber(1, 100);
        signRandom = sign.innerHTML = getRandomSign();
    } else {
        alert(`Correct answer is ${temp}, your answer ${input.value}.`);
        input.value = '';
    }

}

function getRandomSign() {
    let signs = ['-', '+'];
    return signs[Math.floor(Math.random()*signs.length)];
}

function getRandomNumber(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
