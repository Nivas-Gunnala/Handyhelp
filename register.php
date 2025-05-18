<?php
$host = "localhost";
$username = "root";   
$password = "";       
$dbname = "handy_help";

// Connect to database
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from JavaScript (sent via Fetch API)
$data = json_decode(file_get_contents("php://input"), true);
$name = htmlspecialchars($data['name']);
$email = htmlspecialchars($data['email']);
$pass = password_hash($data['password'], PASSWORD_BCRYPT);

// Prepare SQL statement
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $pass);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
