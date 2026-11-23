<?php
// Valida usuario y contraseña contra la tabla "usuarios" (llamado con $.post desde index.php)
session_start();
header('Content-Type: application/json; charset=utf-8');
require 'includes/conexion.php';

$usuario    = trim($_POST['usuario'] ?? '');
$contrasena = $_POST['contrasena'] ?? '';

if ($usuario === '' || $contrasena === '') {
    echo json_encode(['ok' => false, 'mensaje' => 'Ingresa usuario y contraseña']);
    exit;
}

$stmt = $pdo->prepare('SELECT usuario FROM usuarios WHERE usuario = ? AND contrasena = ?');
$stmt->execute([$usuario, $contrasena]);
$fila = $stmt->fetch();

if ($fila) {
    session_regenerate_id(true);
    $_SESSION['usuario'] = $fila['usuario'];
    echo json_encode(['ok' => true]);
} else {
    echo json_encode(['ok' => false, 'mensaje' => 'Usuario o contraseña incorrectos']);
}
