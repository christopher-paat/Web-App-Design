<?php
// Protege las páginas: solo se puede entrar con una sesión iniciada desde el login
session_start();

if (!isset($_SESSION['usuario'])) {
    // Si es una petición AJAX respondemos JSON, si no redirigimos al login
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        http_response_code(401);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => false, 'mensaje' => 'Sesión no iniciada']);
    } else {
        header('Location: index.php');
    }
    exit;
}
