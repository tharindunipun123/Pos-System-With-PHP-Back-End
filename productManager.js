async function addProduct() {
    var productId = document.getElementById('addProductId').value;
    var productName = document.getElementById('addProductName').value;
    var productPrice = document.getElementById('addProductPrice').value;
    var productCat = document.getElementById('addProductCat').value;

    const product = {
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        productCat: productCat
    };
    console.log(product);

    try {
        const response = await fetch('http://localhost/posnova/addPrduct.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                showAlert("Congratulations", "Successfully Product Added", "success", "ok", function() {
                });

            } else {
                showAlert("Failed", data.message, "error", "Try Again", function(){});
            }
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert("Failed", data.message, "error", "Try Again", function(){});
    }
}

document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addProduct();
});

function editProduct() {
    var productId = document.getElementById('editProductId').value;
    var productName = document.getElementById('editProductName').value;
    var productPrice = document.getElementById('editProductPrice').value;
    var productCat = document.getElementById('editProductCat').value;

    const product = {
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        productCat: productCat
    };

    fetch('http://localhost:8080/api/v1/editproduct', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.text().then(text => {
            console.log('Response text:', text);
            if (!response.ok) {
                throw new Error(text);
            }
            return text;
        });
    })
    .then(data => {
        if (data === 'successful') {
            swal("Congratulations", "Product Edited Successfully", "success").then(() => {
                // Refresh or clear form
            });
            console.log(data); 
        } else {
            swal("Failed", "Error While Editing Product! Please Try Again", "error");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        swal("Error", "Error editing product: " + error.message, "error");
    });
}

document.getElementById('editProductId').addEventListener('click', function() {
    fetch('http://localhost:8080/api/v1/products')
        .then(response => response.json())
        .then(products => {
            populateProductIdField(products, 'editProductId');
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('editProductId').addEventListener('change', function() {
    const productId = this.value;
    if (productId) {
        fetch(`http://localhost:8080/api/v1/product/${productId}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('editProductId').value = product.productId;
                document.getElementById('editProductName').value = product.productName;
                document.getElementById('editProductPrice').value = product.productPrice;
                document.getElementById('editProductCat').value = product.productCategory;
            })
            .catch(error => console.error('Error:', error));
    }
});


function showAlert(title, text, icon, button, callback) {
    swal({
        title: title,
        text: text,
        icon: icon,
        button: button,
    }).then(() => {
        if (callback) {
            callback();
        }
    });
}

function deleteProduct() {
    var productId = document.getElementById('deleteProductId').value;

    fetch(`http://localhost:8080/api/v1/deleteproduct/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.text().then(text => {
            console.log('Response text:', text);
            if (!response.ok) {
                throw new Error(text);
            }
            return text;
        });
    })
    .then(data => {
        if (data === 'successful') {
            swal("Congratulations", "Product Deleted Successfully", "success").then(() => {
                // Refresh or clear form
            });
            console.log(data); 
        } else {
            swal("Failed", "Error While Deleting Product! Please Try Again", "error");
        }
    })
    
}

document.getElementById('deleteProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    deleteProduct();
});

document.getElementById('deleteProductId').addEventListener('click', function() {
    fetch('http://localhost:8080/api/v1/products')
        .then(response => response.json())
        .then(products => {
            populateProductIdField(products, 'deleteProductId');
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('deleteProductId').addEventListener('change', function() {
    const productId = this.value;
    if (productId) {
        fetch(`http://localhost:8080/api/v1/product/${productId}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('deleteProductId').value = product.productId;
                document.getElementById('deleteProductName').value = product.productName;
                document.getElementById('deleteProductPrice').value = product.productPrice;
                document.getElementById('deleteProductCat').value = product.productCategory;
            })
            .catch(error => console.error('Error:', error));
    }
});

function populateProductIdField(products, elementId) {
    const productIdField = document.getElementById(elementId);
    productIdField.innerHTML = '<option value="">Select a Product ID</option>'; // Clear existing options

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.productId;
        option.text = product.productId;
        productIdField.appendChild(option);
    });
}
