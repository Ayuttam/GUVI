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

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

// Create a new user document
$user = array(
    "name" => $name,
    "email" => $email,
    "password" => $password
);

// Insert the user document into the users collection
$result = $db->users->insertOne($user);

if ($result->getInsertedCount() > 0) {
    echo "<script>alert('User registered successfully!'); window.history.go(-1);</script>";
} else {
    echo "Error: User registration failed.";
}
?>
