document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settings-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const companyName = document.getElementById('companyName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;


        swal({
            title: "Great !",
            text: "Settings Saved Successfully",
            icon: "success",
            button: "ok",
        }).then(() => {
            if (callback) {
                callback();
            }
        });

       
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }

    
        console.log({
            companyName,
            email,
            phone,
            address,
            currentPassword,
            newPassword,
        });
    });
});
