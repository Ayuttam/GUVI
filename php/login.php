<?php
$servername = "localhost";
$username = "ayuttam";
$password = "root";
$dbname = "user_accounts";

// Create connection
$conn = new MongoClient("mongodb://$username:$password@$servername:27017");
$db = $conn->$dbname;

// Check connection
if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];
if (empty($email) || empty($password)) {
    echo "<script>alert('Please enter both email and password!'); window.history.go(-1);</script>";
} else {
    // Find the user document with matching email and password
    $query = array("email" => $email, "password" => $password);
    $user = $db->users->findOne($query);

    if ($user) {
        // User logged in successfully
        header("Location: ../register.html");
        exit();
    } else {
        // Incorrect email/password
        echo "<script>alert('Incorrect email or password!'); window.history.go(-1);</script>";
    }
}
?>
