$(function () {
    const API = 'api/estudiantes.php';
    const modal = new bootstrap.Modal('#modalEstudiante');
    let matriculaBorrar = null;

    // Escapa texto antes de insertarlo como HTML
    const esc = (t) => $('<div>').text(t).html();

    function mostrarAlerta(texto, tipo) {
        $('#alerta').removeClass('d-none alert-success alert-danger')
            .addClass('alert-' + tipo).text(texto);
        setTimeout(() => $('#alerta').addClass('d-none'), 3000);
    }

    // Carga / actualiza la tabla de estudiantes
    function cargarTabla() {
        $.get(API, { accion: 'listar' }, function (resp) {
            const $tbody = $('#tablaEstudiantes').empty();
            if (!resp.estudiantes.length) {
                $tbody.append('<tr><td colspan="3" class="text-center text-muted">No hay estudiantes registrados</td></tr>');
                return;
            }
            resp.estudiantes.forEach(function (e) {
                $tbody.append(
                    `<tr>
                        <td>${esc(e.matricula)}</td>
                        <td>${esc(e.nombreCompleto)}</td>
                        <td class="text-center text-nowrap">
                            <button class="btn btn-dark btn-sm btn-modificar" data-matricula="${esc(e.matricula)}">Modificar</button>
                            <button class="btn btn-dark btn-sm btn-borrar" data-matricula="${esc(e.matricula)}" data-nombre="${esc(e.nombreCompleto)}">Borrar</button>
                        </td>
                    </tr>`
                );
            });
        }, 'json').fail(manejarError);
    }

    function manejarError(xhr) {
        if (xhr.status === 401) {
            window.location.href = 'index.php';
            return;
        }
        mostrarAlerta('Ocurrió un error al comunicarse con el servidor', 'danger');
    }

    // Menú -> Nuevo
    $('#btnNuevo').on('click', function (e) {
        e.preventDefault();
        $('#formEstudiante')[0].reset();
        $('#accion').val('crear');
        $('#matricula').prop('readonly', false);
        $('#tituloModal').text('Nuevo estudiante');
        $('#errorModal').addClass('d-none');
        modal.show();
    });

    // Modificar
    $('#tablaEstudiantes').on('click', '.btn-modificar', function () {
        $.get(API, { accion: 'obtener', matricula: $(this).data('matricula') }, function (resp) {
            if (!resp.ok) return mostrarAlerta(resp.mensaje, 'danger');
            const e = resp.estudiante;
            $('#accion').val('actualizar');
            $('#matricula').val(e.matricula).prop('readonly', true);
            $('#nombre').val(e.nombre);
            $('#apellidoPaterno').val(e.apellidoPaterno);
            $('#apellidoMaterno').val(e.apellidoMaterno);
            $('#edad').val(e.edad);
            $('#tituloModal').text('Modificar estudiante');
            $('#errorModal').addClass('d-none');
            modal.show();
        }, 'json').fail(manejarError);
    });

    // Guardar (nuevo o modificar)
    $('#formEstudiante').on('submit', function (e) {
        e.preventDefault();
        $.post(API, $(this).serialize(), function (resp) {
            if (resp.ok) {
                modal.hide();
                mostrarAlerta(resp.mensaje, 'success');
                cargarTabla();
            } else {
                $('#errorModal').text(resp.mensaje).removeClass('d-none');
            }
        }, 'json').fail(manejarError);
    });

    // Borrar: confirmación con jQuery UI dialog
    $('#dialogBorrar').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        buttons: {
            'Eliminar': function () {
                const $dlg = $(this);
                $.post(API, { accion: 'eliminar', matricula: matriculaBorrar }, function (resp) {
                    $dlg.dialog('close');
                    mostrarAlerta(resp.mensaje, resp.ok ? 'success' : 'danger');
                    cargarTabla();
                }, 'json').fail(manejarError);
            },
            'Cancelar': function () {
                $(this).dialog('close');
            }
        }
    });

    $('#tablaEstudiantes').on('click', '.btn-borrar', function () {
        matriculaBorrar = $(this).data('matricula');
        $('#nombreBorrar').text($(this).data('nombre'));
        $('#dialogBorrar').dialog('open');
    });

    cargarTabla();
});
