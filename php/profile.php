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
    die("MongoDB connection failed.");
}

// Generate a unique random integer ID
$id = generateUniqueRandomID($conn);

// Prepare and bind the UPDATE statement
$stmt = $conn->prepare("UPDATE profiles SET age = ?, dob = ?, contact = ? WHERE id = ?");
$stmt->bind_param("issi", $age, $dob, $contact, $id);

// Set the values from the submitted form data
$age = $_POST['age'];
$dob = $_POST['dob'];
$contact = $_POST['contact'];

// Execute the UPDATE statement
if ($stmt->execute()) {
    // Redirect to the profile page with the updated details
    $url = "../profile.html?name=" . urlencode($_POST['name']) . "&age=" . urlencode($_POST['age']) . "&dob=" . urlencode($_POST['dob']) . "&contact=" . urlencode($_POST['contact']);
    header("Location: $url");
    exit();
} else {
    // Display an error message if the UPDATE statement fails
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
