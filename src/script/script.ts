import { add, subtract, multiply, divide } from "../modules/calculations"

const sunImg = document.createElement('img');
document.body.append(sunImg);

const imgUrl = new URL('../media/sun.jpg', import.meta.url);
sunImg.src = imgUrl.href; 



const numberDisplay = document.querySelector('.number-display') as HTMLHeadingElement
const operatorDisplay = document.querySelector('.operator-display') as HTMLHeadingElement

let calcArray: any = []

let numberClickCount: number = 0
let operatorClickCount: number = 0

const numberBtns = document.querySelectorAll(".number-buttons")
numberBtns.forEach(button => button.addEventListener("click", function (event) {
    const eventTarget = event.target as HTMLButtonElement
    operatorDisplay.innerHTML = ''
    operatorClickCount = 0

    if (numberClickCount == 0) {
        numberDisplay.innerHTML = ''

        numberDisplay.innerHTML += eventTarget.innerHTML
        numberClickCount++
    }

    else {
        numberDisplay.innerHTML += eventTarget.innerHTML
        numberClickCount++
    }


}))


const operatorBtns = document.querySelectorAll(".operator-buttons")
operatorBtns.forEach(button => button.addEventListener("click", function (event) {

    numberClickCount = 0
    operatorClickCount++
    const eventTarget = event.target as HTMLButtonElement

    if (operatorClickCount > 1) {
        calcArray[1] = eventTarget.innerHTML
    }

    else {

        if (calcArray.length == 2) {
            calcArray.push(numberDisplay.innerHTML)
            calculate()
            calcArray.push(numberDisplay.innerHTML)
            calcArray.push(eventTarget.innerHTML)
        }

        else {
            calcArray.push(numberDisplay.innerHTML)
            calcArray.push(eventTarget.innerHTML)
        }
    }

    operatorDisplay.innerHTML = eventTarget.innerHTML

}))

const equalBtn = document.querySelector(".equal-button") as HTMLButtonElement
equalBtn.addEventListener("click", calculate)

function calculate() {
    if (calcArray.length == 0) { return }

    numberClickCount = 0
    calcArray.push((numberDisplay.innerHTML))
    let result: any

    if (calcArray[1] == '+') {
        result = add(calcArray[0], calcArray[2])
    }

    if (calcArray[1] == '-') {
        result = subtract(calcArray[0], calcArray[2])
    }

    if (calcArray[1] == '*') {
        result = multiply(calcArray[0], calcArray[2])
    }

    if (calcArray[1] == '/') {
        result = divide(calcArray[0], calcArray[2])
    }

    calcArray = []
    numberDisplay.innerHTML = result
    operatorDisplay.innerHTML = '='

}

const clearBtn = document.querySelector(".clear-button") as HTMLButtonElement
clearBtn.addEventListener("click", clear)

function clear() {
    numberDisplay.innerHTML = '0'
    operatorDisplay.innerHTML = ''
    calcArray = []

}