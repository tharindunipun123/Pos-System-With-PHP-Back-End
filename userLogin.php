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

    $username = isset($data['username']) ? $data['username'] : '';
    $password = isset($data['password']) ? $data['password'] : '';
     
    if (empty($username) || empty($password)) {
        $response['success'] = false;
        $response['message'] = 'All fields are required.';
    } else {
        $connection = new mysqli("localhost", "root", "", "possys");
        if ($connection->connect_error) {
            $response['success'] = false;
            $response['message'] = 'Database connection failed: ' . $connection->connect_error;
        } else {
            $stmt = $connection->prepare('SELECT * FROM user WHERE Username = ? AND Password = ?');
            if ($stmt === false) {
                $response['success'] = false;
                $response['message'] = 'Failed to prepare SQL statement: ' . $connection->error;
            } else {
                $stmt->bind_param('ss', $username, $password);
                $stmt->execute();
                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    $response['success'] = true;
                    $response['message'] = 'User validated and data received successfully.';
                } else {
                    $response['success'] = false;
                    $response['message'] = 'Invalid username or password.';
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
