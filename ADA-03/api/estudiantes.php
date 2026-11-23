<?php
// Operaciones CRUD de estudiantes. Responde siempre JSON.
// GET  ?accion=listar | ?accion=obtener&matricula=X
// POST accion=crear | actualizar | eliminar
chdir(__DIR__ . '/..');
require 'includes/sesion.php';
require 'includes/conexion.php';
header('Content-Type: application/json; charset=utf-8');

function responder(array $datos): void {
    echo json_encode($datos);
    exit;
}

function leerEstudiante(): array {
    $e = [
        'matricula'       => trim($_POST['matricula'] ?? ''),
        'nombre'          => trim($_POST['nombre'] ?? ''),
        'apellidoPaterno' => trim($_POST['apellidoPaterno'] ?? ''),
        'apellidoMaterno' => trim($_POST['apellidoMaterno'] ?? ''),
        'edad'            => filter_var($_POST['edad'] ?? '', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 120]]),
    ];
    foreach ($e as $campo => $valor) {
        if ($valor === '' || $valor === false) {
            responder(['ok' => false, 'mensaje' => "El campo $campo es inválido"]);
        }
    }
    return $e;
}

$accion = $_REQUEST['accion'] ?? 'listar';

try {
    switch ($accion) {
        case 'listar':
            $filas = $pdo->query(
                "SELECT matricula,
                        CONCAT_WS(' ', nombre, apellidoPaterno, apellidoMaterno) AS nombreCompleto
                 FROM estudiantes ORDER BY apellidoPaterno, apellidoMaterno, nombre"
            )->fetchAll();
            responder(['ok' => true, 'estudiantes' => $filas]);

        case 'obtener':
            $stmt = $pdo->prepare('SELECT * FROM estudiantes WHERE matricula = ?');
            $stmt->execute([$_GET['matricula'] ?? '']);
            $est = $stmt->fetch();
            responder($est ? ['ok' => true, 'estudiante' => $est]
                           : ['ok' => false, 'mensaje' => 'Estudiante no encontrado']);

        case 'crear':
            $e = leerEstudiante();
            $stmt = $pdo->prepare('INSERT INTO estudiantes (matricula, nombre, apellidoPaterno, apellidoMaterno, edad)
                                   VALUES (:matricula, :nombre, :apellidoPaterno, :apellidoMaterno, :edad)');
            $stmt->execute($e);
            responder(['ok' => true, 'mensaje' => 'Estudiante agregado']);

        case 'actualizar':
            $e = leerEstudiante();
            $stmt = $pdo->prepare('UPDATE estudiantes SET nombre = :nombre, apellidoPaterno = :apellidoPaterno,
                                   apellidoMaterno = :apellidoMaterno, edad = :edad WHERE matricula = :matricula');
            $stmt->execute($e);
            responder(['ok' => true, 'mensaje' => 'Estudiante actualizado']);

        case 'eliminar':
            $stmt = $pdo->prepare('DELETE FROM estudiantes WHERE matricula = ?');
            $stmt->execute([$_POST['matricula'] ?? '']);
            responder($stmt->rowCount() > 0 ? ['ok' => true, 'mensaje' => 'Estudiante eliminado']
                                            : ['ok' => false, 'mensaje' => 'Estudiante no encontrado']);

        default:
            responder(['ok' => false, 'mensaje' => 'Acción no válida']);
    }
} catch (PDOException $ex) {
    if ($ex->getCode() === '23000') {
        responder(['ok' => false, 'mensaje' => 'Ya existe un estudiante con esa matrícula']);
    }
    http_response_code(500);
    responder(['ok' => false, 'mensaje' => 'Error en la base de datos']);
}
