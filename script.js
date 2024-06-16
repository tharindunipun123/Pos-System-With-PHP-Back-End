
async function run() {
    
    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    //var user = validateUser(username,password);
    
    
    var credentials = {
        username: username,
        password: password
    };
     
    try {
        const response = await fetch('http://localhost/posnova/userLogin.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                showAlert("Congratulations", "Successfully Logged In", "success", "Aww yiss!", function() {
                    window.location.href = 'dashboard.html';
                });
            } else {
                showAlert("Failed", data.message, "error", "Try Again", function(){});
            }
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert("Error", "Error logging in: " + error.message, "error", "Try Again", function(){});
    }
    
}

function validateUser(username,password){
    const usernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!usernamePattern.test(username)) {
        swal("Error!", "Invalid username. It should be 3-15 characters long and can only contain letters, numbers, and underscores.", "error");
        return false;
    }
    
    if (!passwordPattern.test(password)) {
        swal("Error!", "Invalid password. It should be at least 6 characters long, and contain at least one number, one uppercase letter, and one lowercase letter.", "error");
        return false;
    }

    return true;
}
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


document.addEventListener('DOMContentLoaded', function() {
    
    const salesToday = 39500;
    const totalCustomers = 4321;
    const newOrders = 21;
    const pendingIssues = 5;
    document.getElementById('sales-today').textContent = `Rs.${salesToday}`;
    document.getElementById('total-customers').textContent = totalCustomers;
    document.getElementById('new-orders').textContent = newOrders;
    document.getElementById('pending-issues').textContent = pendingIssues; 
    var menuToggle = document.getElementById("menu-toggle");
    var wrapper = document.getElementById("wrapper");

    menuToggle.addEventListener("click", function(e) {
        e.preventDefault();
        wrapper.classList.toggle("toggled");
    });
});

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add('was-validated');
        return;
    }

    const formData = new FormData(this);
    const formDataJson = Object.fromEntries(formData.entries());
    console.log(formDataJson);

    try {
        const response = await fetch('http://localhost/posnova/userRegister.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJson)
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                showAlert("Congratulations", "Successfully Registered", "success", "Ok", function() {
                    window.location.href = 'index.html';
                });
            } else {
                showAlert("Failed", data.message, "error", "Try Again", function(){});
            }
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert("Error", "Error Registering: " + error.message, "error", "Try Again", function(){});
    }
});



