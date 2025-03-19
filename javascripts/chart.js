function loadChart(statsName, stats, color) {

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: statsName,
            datasets: [{
                label: '# of Votes',
                data: stats,
                backgroundColor: color,
            }]
        },
        options: {
            scales: {
                x: {
                    display: false,
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            aspectRatio: 0,
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'POKEMON STATS',
                },
                legend: {
                    display: false
                },
            }

        },
        plugins: [ChartDataLabels]
    });
}