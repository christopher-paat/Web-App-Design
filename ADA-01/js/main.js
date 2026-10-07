function validateSearch(event) {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput.value || searchInput.value.trim() === '') {
        alert('El espacio de captura para la busqueda es vacio.');
        searchInput.focus();
        event.preventDefault();
        return false;
    }
    return true;
}

function getNum1() {
    const val = document.getElementById('num1').value;
    if (val.trim() === '') return null;
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
}

function getNum2() {
    const val = document.getElementById('num2').value;
    if (val.trim() === '') return null;
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
}

function setResult(val) {
    document.getElementById('resultado').value = val;
}

function suma() {
    const n1 = getNum1();
    const n2 = getNum2();
    if (n1 === null || n2 === null) {
        alert("Ingrese valores numericos validos.");
        return;
    }
    setResult(n1 + n2);
}

function resta() {
    const n1 = getNum1();
    const n2 = getNum2();
    if (n1 === null || n2 === null) {
        alert("Ingrese valores numericos validos.");
        return;
    }
    setResult(n1 - n2);
}

function multiplicacion() {
    const n1 = getNum1();
    const n2 = getNum2();
    if (n1 === null || n2 === null) {
        alert("Ingrese valores numericos validos.");
        return;
    }
    setResult(n1 * n2);
}

function division() {
    const n1 = getNum1();
    const n2 = getNum2();
    if (n1 === null || n2 === null) {
        alert("Ingrese valores numericos validos.");
        return;
    }
    if (n2 === 0) {
        alert("Error: Division entre cero no permitida.");
        return;
    }
    setResult(n1 / n2);
}

function raizCuadrada() {
    const n1 = getNum1();
    if (n1 === null) {
        alert("Ingrese un valor numerico valido en 'Numero 1.'");
        document.getElementById('num1').focus();
        return;
    }
    if (n1 < 0) {
        alert("Error: Raiz cuadrada de numero negativo no es real.");
        return;
    }
    setResult(Math.sqrt(n1));
}

function inversa() {
    const n1 = getNum1();
    if (n1 === null) {
        alert("Ingrese un valor numerico valido en 'Numero 1.'");
        document.getElementById('num1').focus();
        return;
    }
    if (n1 === 0) {
        alert("Error: Division entre cero no permitida.");
        return;
    }
    setResult(1 / n1);
}

