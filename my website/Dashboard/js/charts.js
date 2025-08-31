// Chart configuration
document.addEventListener('DOMContentLoaded', () => {
    // Website Views Chart
    const websiteViewsChartEl = document.getElementById('websiteViewsChart');
    if (websiteViewsChartEl) {
        const websiteViewsChart = new Chart(websiteViewsChartEl, {
            type: 'bar',
            data: {
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Website Views',
                    data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                    backgroundColor: '#cb0c9f',
                    borderRadius: 4,
                    barThickness: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#344767',
                        bodyColor: '#344767',
                        borderColor: '#e9ecef',
                        borderWidth: 1,
                        usePointStyle: true,
                        boxPadding: 6
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false,
                            borderDash: [2],
                            borderDashOffset: [2],
                            color: '#e9ecef'
                        },
                        ticks: {
                            color: '#67748e',
                            padding: 10
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false
                        },
                        ticks: {
                            color: '#67748e',
                            padding: 10
                        }
                    }
                }
            }
        });
    }

    // Daily Sales Chart
    const dailySalesChartEl = document.getElementById('dailySalesChart');
    if (dailySalesChartEl) {
        const dailySalesChart = new Chart(dailySalesChartEl, {
            type: 'line',
            data: {
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Daily Sales',
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    fill: true,
                    backgroundColor: 'rgba(23, 193, 232, 0.2)',
                    borderColor: '#17c1e8',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointBackgroundColor: '#17c1e8',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#17c1e8',
                    pointHoverBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#344767',
                        bodyColor: '#344767',
                        borderColor: '#e9ecef',
                        borderWidth: 1,
                        usePointStyle: true,
                        boxPadding: 6
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false,
                            borderDash: [2],
                            borderDashOffset: [2],
                            color: '#e9ecef'
                        },
                        ticks: {
                            color: '#67748e',
                            padding: 10
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false
                        },
                        ticks: {
                            color: '#67748e',
                            padding: 10
                        }
                    }
                }
            }
        });
    }

    // Add more charts as needed
    
    // Function to update charts on window resize
    const updateCharts = () => {
        if (websiteViewsChart) websiteViewsChart.update();
        if (dailySalesChart) dailySalesChart.update();
    };

    // Update charts when window is resized
    window.addEventListener('resize', updateCharts);
});

// Function to generate random data for charts (for demo purposes)
function generateRandomData(min, max, count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
}

// Function to update chart data (could be used with real-time data)
function updateChartData(chart, newData) {
    chart.data.datasets[0].data = newData;
    chart.update();
}