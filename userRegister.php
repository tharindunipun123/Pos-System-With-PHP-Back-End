<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = isset($data['name']) ? $data['name'] : '';
    $username = isset($data['username']) ? $data['username'] : '';
    $password = isset($data['password']) ? $data['password'] : '';
    $role = isset($data['role']) ? $data['role'] : '';

    if (empty($username) || empty($password) || empty($name) || empty($role)) {
        $response['success'] = false;
        $response['message'] = 'All fields are required.';
    } else {
        $connection = new mysqli("localhost", "root", "", "possys");
        if ($connection->connect_error) {
            $response['success'] = false;
            $response['message'] = 'Database connection failed: ' . $connection->connect_error;
        } else {
            $stmt = $connection->prepare('INSERT INTO user (Name, Username, Password, Role) VALUES (?, ?, ?, ?)');
            if ($stmt === false) {
                $response['success'] = false;
                $response['message'] = 'Failed to prepare SQL statement: ' . $connection->error;
            } else {
                $stmt->bind_param('ssss', $name, $username, $password, $role);
                if ($stmt->execute()) {
                    $response['success'] = true;
                    $response['message'] = 'User Registered and Data Received Successfully.';
                } else {
                    $response['success'] = false;
                    $response['message'] = 'Failed to register user: ' . $stmt->error;
                }
                $stmt->close();
            }
            $connection->close();
        }
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);
?>
