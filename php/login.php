<?php
$servername = "localhost";
$username = "ayuttam";
$password = "root";
$dbname = "user_accounts";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

if (empty($email) || empty($password)) {
    echo "<script>alert('Please enter both email and password!'); window.history.go(-1);</script>";
} else {
    // Prepare and bind the statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User logged in successfully
        echo "success";
    } else {
        // Incorrect email/password
        echo "failure";
    }

    $stmt->close();
    $conn->close();
}
?>
