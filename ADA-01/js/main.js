function getNumbers() {
    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    return { num1: n1, num2: n2 };
}

function showResult(value) {
    document.getElementById("result").value = value;
}

function add() {
    let values = getNumbers();
    if (isNaN(values.num1) || isNaN(values.num2)) {
        alert("Error: Ingresa valores numericos validos en ambos campos.");
        return;
    }
    showResult(values.num1 + values.num2);
}

function subtract() {
    let values = getNumbers();
    if (isNaN(values.num1) || isNaN(values.num2)) {
        alert("Error: Ingresa valores numericos válidos en ambos campos.");
        return;
    }
    showResult(values.num1 - values.num2);
}

function multiply() {
    let values = getNumbers();
    if (isNaN(values.num1) || isNaN(values.num2)) {
        alert("Error: Ingresa valores numericos válidos en ambos campos.");
        return;
    }
    showResult(values.num1 * values.num2);
}

function divide() {
    let values = getNumbers();
    if (isNaN(values.num1) || isNaN(values.num2)) {
        alert("Error: Ingresa valores numericos validos en ambos campos.");
        return;
    }
    if (values.num2 === 0) {
        alert("Error: No es posible dividir entre cero.");
        return;
    }
    showResult(values.num1 / values.num2);
}

function squareRoot() {
    let num1 = parseFloat(document.getElementById("num1").value);
    if (isNaN(num1)) {
        alert("Error: Ingresa un valor numerico valido en el 'Numero 1.'");
        return;
    }
    if (num1 < 0) {
        alert("Error: No se puede calcular la raiz cuadrada de un numero negativo.");
        return;
    }
    showResult(Math.sqrt(num1));
}

function inverse() {
    let num1 = parseFloat(document.getElementById("num1").value);
    if (isNaN(num1)) {
        alert("Error: Ingresa un valor numerico valido en el 'Numero 1.'");
        return;
    }
    if (num1 === 0) {
        alert("Error: No es posible dividir 1 entre cero.");
        return;
    }
    showResult(1 / num1);
}