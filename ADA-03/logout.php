<?php
// Cierra la sesión y regresa al login
session_start();
$_SESSION = [];
session_destroy();
header('Location: index.php');
exit;
