<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "franco07";
$dbname = "formulario_contacto";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión a la base de datos fallida: " . $conn->connect_error);
}

// Recibir datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

// Insertar datos en la base de datos
$sql = "INSERT INTO datos_contacto (nombre, apellido, email, mensaje) VALUES ('$nombre', '$apellido', '$email', '$mensaje')";

if ($conn->query($sql) === TRUE) {
    echo "Datos almacenados en la base de datos correctamente";
} else {
    echo "Error al almacenar los datos: " . $conn->error;
}

$conn->close();

// Puedes enviar una respuesta a otro programa aquí
// Por ejemplo, puedes usar una solicitud HTTP (cURL) para enviar los datos a otro servicio o programa
?>