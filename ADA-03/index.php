<?php
session_start();
// Si ya hay sesión, ir directo a la gestión de estudiantes
if (isset($_SESSION['usuario'])) {
    header('Location: estudiantes.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control Escolar - Login</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-light d-flex align-items-center min-vh-100">
    <div class="container">
        <div class="card login-card mx-auto border border-2 border-secondary">
            <div class="card-body p-4">
                <h1 class="h4 text-center mb-4">Control Escolar</h1>

                <div id="mensaje" class="alert alert-danger d-none" role="alert"></div>

                <form id="formLogin" autocomplete="off">
                    <div class="row mb-3 align-items-center">
                        <label for="usuario" class="col-sm-4 col-form-label">Usuario:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="usuario" name="usuario" required>
                        </div>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <label for="contrasena" class="col-sm-4 col-form-label">Contraseña:</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="contrasena" name="contrasena" required>
                        </div>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-outline-dark" id="btnEnviar">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="js/login.js"></script>
</body>
</html>
