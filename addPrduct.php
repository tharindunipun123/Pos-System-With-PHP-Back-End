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

    $productId = isset($data['productId']) ? $data['productId'] : '';
    $productName = isset($data['productName']) ? $data['productName'] : '';
    $productPrice = isset($data['productPrice']) ? $data['productPrice'] : '';
    $productCat = isset($data['productCat']) ? $data['productCat'] : '';

    if (empty($productId) || empty($productName) || empty($productPrice) || empty($productCat)) {
        $response['success'] = false;
        $response['message'] = 'All fields are required.';
    } else {
        $connection = new mysqli("localhost", "root", "", "possys");
        if ($connection->connect_error) {
            $response['success'] = false;
            $response['message'] = 'Database connection failed: ' . $connection->connect_error;
        } else {
            $stmt = $connection->prepare('INSERT INTO product (product_id, product_name, product_price, product_category) VALUES (?, ?, ?, ?)');
           
                $stmt->bind_param('ssds', $productId, $productName, $productPrice, $productCat);
                if ($stmt->execute()) {
                    $response['success'] = true;
                    $response['message'] = 'Product Added and Data Received Successfully.';
                } else {
                    $response['success'] = false;
                    $response['message'] = 'Failed to Add Product: ' . $stmt->error;
                }
                $stmt->close();
            
            $connection->close();
        }
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);
?>
