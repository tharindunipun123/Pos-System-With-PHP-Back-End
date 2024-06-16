document.addEventListener('DOMContentLoaded', function() {
    // Customer Growth Chart
    var ctxCustomerGrowth = document.getElementById('customerGrowthChart').getContext('2d');
    var customerGrowthChart = new Chart(ctxCustomerGrowth, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'New Customers',
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Customer Demographics Chart
    var ctxCustomerDemographics = document.getElementById('customerDemographicsChart').getContext('2d');
    var customerDemographicsChart = new Chart(ctxCustomerDemographics, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female', 'Other'],
            datasets: [{
                label: 'Customer Demographics',
                data: [60, 35, 5],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
