let xdata = ["Entertainment", "Health", "Shopping", "Travel", "Education", "Other"];
let ydata = [15, 40, 42, 24, 35, 30];
new Chart("expense-chart", {
    type: "bar",
    data: {
        labels: xdata,
        datasets: [{
            backgroundColor: "rgba(255,0,0,0.5)",
            data: ydata
        }]
    },
    options: {
        legend: { display: false },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});