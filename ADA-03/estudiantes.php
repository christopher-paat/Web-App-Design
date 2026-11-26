<?php
require 'includes/sesion.php'; // solo se abre con sesión iniciada
$usuario = htmlspecialchars($_SESSION['usuario']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Estudiantes</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-light">
    <div class="container site-container bg-white border border-2 border-secondary rounded-3 p-0 my-3">
        <!-- Menú -->
        <nav class="navbar navbar-expand navbar-dark bg-dark px-3 rounded-top">
            <div class="dropdown">
                <a class="navbar-brand dropdown-toggle mb-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Menú</a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" id="btnNuevo">Nuevo</a></li>
                </ul>
            </div>
            <span class="navbar-text text-white ms-auto" id="usuarioSesion"><?= $usuario ?></span>
        </nav>

        <main class="p-3">
            <h1 class="h4 text-center mb-3">Gestión de Estudiantes</h1>

            <div id="alerta" class="alert d-none" role="alert"></div>

            <div class="table-responsive">
                <table class="table table-bordered align-middle mb-0">
                    <thead class="table-light">
                        <tr><th colspan="3">Lista de estudiantes</th></tr>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nombre completo</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tablaEstudiantes">
                        <tr><td colspan="3" class="text-center text-muted">Cargando...</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="text-end mt-3">
                <a href="logout.php" class="btn btn-outline-dark">Regresar</a>
            </div>
        </main>
    </div>

    <!-- Modal Nuevo / Modificar -->
    <div class="modal fade" id="modalEstudiante" tabindex="-1" aria-labelledby="tituloModal" aria-hidden="true">
        <div class="modal-dialog">
            <form class="modal-content" id="formEstudiante" autocomplete="off">
                <div class="modal-header">
                    <h2 class="modal-title h5" id="tituloModal">Nuevo estudiante</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="accion" id="accion" value="crear">
                    <div class="mb-2">
                        <label for="matricula" class="form-label">Matrícula</label>
                        <input type="text" class="form-control" id="matricula" name="matricula" maxlength="10" required>
                    </div>
                    <div class="mb-2">
                        <label for="nombre" class="form-label">Nombre(s)</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" maxlength="60" required>
                    </div>
                    <div class="mb-2">
                        <label for="apellidoPaterno" class="form-label">Apellido paterno</label>
                        <input type="text" class="form-control" id="apellidoPaterno" name="apellidoPaterno" maxlength="60" required>
                    </div>
                    <div class="mb-2">
                        <label for="apellidoMaterno" class="form-label">Apellido materno</label>
                        <input type="text" class="form-control" id="apellidoMaterno" name="apellidoMaterno" maxlength="60" required>
                    </div>
                    <div class="mb-2">
                        <label for="edad" class="form-label">Edad</label>
                        <input type="number" class="form-control" id="edad" name="edad" min="1" max="120" required>
                    </div>
                    <div id="errorModal" class="alert alert-danger d-none mt-2 mb-0"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-dark">Guardar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Confirmación de borrado -->
    <div id="dialogBorrar" title="¿Eliminar estudiante?" style="display:none">
        <p>Se eliminará al estudiante <strong id="nombreBorrar"></strong>. Esta acción no se puede deshacer.</p>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/estudiantes.js"></script>
</body>
</html>
