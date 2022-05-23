const score = document.getElementById('score')
const a = document.getElementById('a')
const b = document.getElementById('b')
const result = document.getElementById('result')
const operation = document.getElementById('operations')
const line = document.getElementById('line')
const refresh = document.getElementById('refresh')

const getRandomNumber = (start = 1, limit = 100) => Math.floor(Math.random() * limit) + start;

let aRandom, bRandom, operationRandom, trueAnswer, isTrue, wrongAnswer, answer, count = 0, chance = 5;
const maxChance = 5;

const next = () => {
    aRandom = getRandomNumber();
    bRandom = getRandomNumber();
    operationRandom = getRandomNumber(1, 4);

    let operationString = ""

    switch (operationRandom) {
        case 1:
            operationString = '+';
            break;
        case 2:
            operationString = '-';
            if (aRandom < bRandom) {
                [aRandom, bRandom] = [bRandom, aRandom]
            }
            break;
        case 3:
            operationString = '/';
            if (aRandom < bRandom) {
                [aRandom, bRandom] = [bRandom, aRandom]
            }
            let qoldiq = aRandom % bRandom;
            aRandom -= qoldiq;
            break;
        case 4:
            operationString = 'x';
            aRandom %= 30;
            bRandom %= 14;
            break;
    }

    operation.innerHTML = operationString

    a.innerHTML = aRandom;
    b.innerHTML = bRandom;


    trueAnswer = eval(`${aRandom}${operationString}${bRandom}`.replace('x', '*'))
    isTrue = getRandomNumber(-1, 2) % 2
    wrongAnswer = getRandomNumber(1, 30)
    answer = isTrue * wrongAnswer + trueAnswer


    result.innerHTML = Math.abs(answer)


}
next()

const check = (selectedAnswer) => {

    if (!(selectedAnswer ^ !isTrue)) {
        count++;
        score.innerHTML = count
    } else {
        chance--;
        let w = (100 / maxChance) * chance;
        line.style.width = `${w}%`

        if (chance <= 0) {
            refresh.classList.remove("d-none")
            return;
        }
    }
    next()
}

const reload = () => {
    window.location.reload(true)
}