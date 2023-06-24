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

// Generate a unique random integer ID
$id = generateUniqueRandomID($conn);

// Prepare and bind the INSERT statement
$stmt = $conn->prepare("INSERT INTO profiles (id, age, dob, contact) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iiss", $id, $age, $dob, $contact);

// Set the values from the submitted form data
$age = $_POST['age'];
$dob = $_POST['dob'];
$contact = $_POST['contact'];

// Execute the INSERT statement
if ($stmt->execute()) {
    // Redirect to the profile page with the user's details
    $url = "../profile.html?name=" . urlencode($_POST['name']) . "&age=" . urlencode($_POST['age']) . "&dob=" . urlencode($_POST['dob']) . "&contact=" . urlencode($_POST['contact']);
    header("Location: $url");
    exit();
} else {
    // Display an error message if the INSERT statement fails
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();

// Function to generate a unique random integer ID
function generateUniqueRandomID($conn) {
    $id = mt_rand(100000, 999999); // Generate a random integer ID between 100000 and 999999

    // Check if the ID already exists in the database
    $stmt = $conn->prepare("SELECT id FROM profiles WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->store_result();

    // If the ID already exists, generate a new one recursively
    if ($stmt->num_rows > 0) {
        $id = generateUniqueRandomID($conn);
    }

    $stmt->close();

    return $id;
}
?>
