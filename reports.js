document.addEventListener('DOMContentLoaded', function() {
    // Sales Report Chart
    var ctxSalesReport = document.getElementById('salesReportChart').getContext('2d');
    var salesReportChart = new Chart(ctxSalesReport, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales',
                data: [30, 20, 50, 40, 60, 70, 90, 80, 100, 110, 120, 130],
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

    // Revenue Report Chart
    var ctxRevenueReport = document.getElementById('revenueReportChart').getContext('2d');
    var revenueReportChart = new Chart(ctxRevenueReport, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [3000, 2000, 5000, 4000, 6000, 7000, 9000, 8000, 10000, 11000, 12000, 13000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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

    // Customer Report Chart
    var ctxCustomerReport = document.getElementById('customerReportChart').getContext('2d');
    var customerReportChart = new Chart(ctxCustomerReport, {
        type: 'pie',
        data: {
            labels: ['New Customers', 'Returning Customers'],
            datasets: [{
                label: 'Customers',
                data: [200, 300],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
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

    // Inventory Report Chart
    var ctxInventoryReport = document.getElementById('inventoryReportChart').getContext('2d');
    var inventoryReportChart = new Chart(ctxInventoryReport, {
        type: 'bar',
        data: {
            labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
            datasets: [{
                label: 'Inventory',
                data: [100, 50, 20, 30, 10],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
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
