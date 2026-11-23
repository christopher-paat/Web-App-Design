$(function () {
    $('#formLogin').on('submit', function (e) {
        e.preventDefault();
        $('#mensaje').addClass('d-none');
        $('#btnEnviar').prop('disabled', true);

        // jQuery.post() requerido por la ADA
        $.post('login.php', $(this).serialize(), function (resp) {
            if (resp.ok) {
                window.location.href = 'estudiantes.php';
            } else {
                $('#mensaje').text(resp.mensaje).removeClass('d-none');
            }
        }, 'json')
        .fail(function () {
            $('#mensaje').text('No se pudo conectar con el servidor').removeClass('d-none');
        })
        .always(function () {
            $('#btnEnviar').prop('disabled', false);
        });
    });
});
