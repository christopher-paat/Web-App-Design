function validateSearch(event) {
    const $searchInput = $('#searchInput');
    if (!$searchInput.val() || $searchInput.val().trim() === '') {
        alert('El espacio de captura para la busqueda es vacio.');
        $searchInput.trigger('focus');
        event.preventDefault();
        return false;
    }
    return true;
}

function getNum(selector) {
    const val = $(selector).val();
    if ($.trim(val) === '') return null;
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
}

function getNum1() {
    return getNum('#num1');
}

function getNum2() {
    return getNum('#num2');
}

function setResult(val) {
    $('#resultado').val(val);
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
        $('#num1').trigger('focus');
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
        $('#num1').trigger('focus');
        return;
    }
    if (n1 === 0) {
        alert("Error: Division entre cero no permitida.");
        return;
    }
    setResult(1 / n1);
}

const operaciones = {
    suma: suma,
    resta: resta,
    multiplicacion: multiplicacion,
    division: division,
    raizCuadrada: raizCuadrada,
    inversa: inversa
};

$(function () {
    $('#searchForm').on('submit', validateSearch);

    $('[data-op]').on('click', function () {
        const op = operaciones[$(this).data('op')];
        if (op) op();
    });
});
