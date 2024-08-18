const ChartDataLabels = require('chartjs-plugin-datalabels');
const fs = require('fs');

const { createChart } = require("./utils")

function getUserChart(dataset, struct) {

    // Chart pixeling.
    const width = 2400
    const height = 1800

    // Extracting the dataset.
    const labels = dataset.map(row => row.month);
    const usersData = dataset.map(row => row.users);
    const cumulativeData = dataset.map(row => row.cumulative);

    // Chart.js configuration.
    const configuration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Users   ',
                    data: usersData,
                    backgroundColor: 'rgb(157, 184, 215)',
                    yAxisID: 'y',
                    order: 2
                },
                {
                    label: 'Cumulative Unique Monthly Users',
                    data: cumulativeData,
                    type: 'line',
                    borderColor: 'rgb(76, 100, 140)',
                    fill: false,
                    yAxisID: 'y1',
                    order: 1,
                    borderWidth: 8, 
                    pointRadius: 0 
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            family: 'Times New Roman',
                            size: 40
                        }
                    },
                    grid: {
                        color: 'rgba(128,128,128,0.5)',
                        borderDash: [15, 15],
                        drawBorder: true,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 15
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Users',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5

                    },
                    grid: {
                        drawBorder: true,
                        drawOnChartArea: true,
                        color: 'rgba(128,128,128,0.5)',
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...usersData) * 1.1

                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Cumulative Unique Monthly Users',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...usersData) * 1.1
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Polymarket Users',
                    font: {
                        family: 'Times New Roman',
                        size: 54,
                        weight: 'bold',
                    },
                    padding: {
                        top: 5,
                        bottom: 80
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            family: 'Times New Roman',
                            size: 36,
                            padding: 100
                        },
                        boxWidth: 85,
                        boxHeight: 30,
                        padding: 15,
                        lineWidth: 100,
                    },
                    reverse: true
                },
            },
            layout: {
                padding: {
                    top: 100,
                    left: 20,
                    right: 20,
                    bottom: 22,
                }
            }
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgb(252,242,227)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        },
        {
            id: 'sourceText',
            afterRender(chart, args, options) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = 'italic 30px "Times New Roman"';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Source: Dune Analytics', 23, height - 13);
                ctx.restore();
            }
        }]
    };

    createChart({
        width: width,
        height: height,
        config: configuration,
    }, struct)
}

function getTVLChart(dataset, struct) {

    // Chart pixeling.
    const width = 2400
    const height = 1800

    // Extracting the dataset.
    const labels = dataset.map(row => row.month);
    const delta = dataset.map(row => row.delta);
    const tvl = dataset.map(row => row.tvl);

    // Chart.js configuration
    const configuration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Delta   ',
                    data: delta,
                    backgroundColor: 'rgb(157, 184, 215)',
                    yAxisID: 'y',
                    order: 2
                },
                {
                    label: 'TVL',
                    data: tvl,
                    type: 'line',
                    borderColor: 'rgb(76, 100, 140)',
                    fill: false,
                    yAxisID: 'y1',
                    order: 1,  
                    borderWidth: 6,
                    pointRadius: 0
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            family: 'Times New Roman',
                            size: 40
                        }
                    },
                    grid: {
                        color: 'rgba(128,128,128,0.5)',
                        borderDash: [15, 15],
                        drawBorder: true,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 15
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Delta',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5

                    },
                    grid: {
                        drawBorder: true,
                        drawOnChartArea: true,
                        color: 'rgba(128,128,128,0.5)',
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...delta) * 1.1

                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'TVL',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...tvl) * 1.1
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Polymarket TVL',
                    font: {
                        family: 'Times New Roman',
                        size: 54,
                        weight: 'bold',
                    },
                    padding: {
                        top: 5,
                        bottom: 80
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            family: 'Times New Roman',
                            size: 36,
                            padding: 100
                        },
                        boxWidth: 85,
                        boxHeight: 30,
                        padding: 15,
                        lineWidth: 100,
                    },
                    reverse: true
                },
            },
            layout: {
                padding: {
                    top: 100,
                    left: 20,
                    right: 20,
                    bottom: 22,
                }
            }
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgb(252,242,227)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        },
        {
            id: 'sourceText',
            afterRender(chart, args, options) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = 'italic 30px "Times New Roman"';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Source: Dune Analytics', 23, height - 13);
                ctx.restore();
            }
        }]
    };

    createChart({
        width: width,
        height: height,
        config: configuration,
    }, struct)
}

function getLpFeesChart(dataset, struct) {

    // Chart pixeling.
    const width = 2400
    const height = 1800

    // Extracting the dataset.
    const labels = dataset.map(row => row.month);
    const fees = dataset.map(row => row.fees);
    const cumulative = dataset.map(row => row.cumulative);

    // Chart.js configuration
    const configuration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Fees   ',
                    data: fees,
                    backgroundColor: 'rgb(157, 184, 215)',
                    yAxisID: 'y',
                    order: 2
                },
                {
                    label: 'Cumulative Fees',
                    data: cumulative,
                    type: 'line',
                    borderColor: 'rgb(76, 100, 140)',
                    fill: false,
                    yAxisID: 'y1',
                    order: 1,
                    borderWidth: 6,
                    pointRadius: 0 
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            family: 'Times New Roman',
                            size: 40
                        }
                    },
                    grid: {
                        color: 'rgba(128,128,128,0.5)',
                        borderDash: [15, 15],
                        drawBorder: true,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 15
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Fees',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5

                    },
                    grid: {
                        drawBorder: true,
                        drawOnChartArea: true,
                        color: 'rgba(128,128,128,0.5)',
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...fees) * 1.1

                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Cumulative Fees',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...cumulative) * 1.1
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Polymarket LP Fees',
                    font: {
                        family: 'Times New Roman',
                        size: 54,
                        weight: 'bold',
                    },
                    padding: {
                        top: 5,
                        bottom: 80
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            family: 'Times New Roman',
                            size: 36,
                            padding: 100
                        },
                        boxWidth: 85,
                        boxHeight: 30,
                        padding: 15,
                        lineWidth: 100,
                    },
                    reverse: true
                },
            },
            layout: {
                padding: {
                    top: 100,
                    left: 20,
                    right: 20,
                    bottom: 22,
                }
            }
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgb(252,242,227)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        },
        {
            id: 'sourceText',
            afterRender(chart, args, options) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = 'italic 30px "Times New Roman"';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Source: Dune Analytics', 23, height - 13);
                ctx.restore();
            }
        }]
    };

    createChart({
        width: width,
        height: height,
        config: configuration,
    }, struct)
}

function getVolume1Chart(dataset, struct) {

    // Chart pixeling.
    const width = 2400
    const height = 1800

    // Extracting the dataset.
    const labels = dataset.map(row => row.month);
    const us_election_vol = dataset.map(row => row.us_election_vol);
    const other_vol = dataset.map(row => row.other_vol);
    const total_vol = dataset.map(row => row.total_vol)
    const cumulative_vol = dataset.map(row => row.cumulative_vol)

    // Chart.js configuration
    const configuration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Cumulative Volume  ',
                    data: cumulative_vol,
                    type: 'line',
                    borderColor: 'rgb(76, 100, 140)',
                    fill: false,
                    yAxisID: 'y1',
                    order: 1,
                    borderWidth: 6,
                    pointRadius: 0 
                },
                {
                    label: 'US Election   ',
                    data: us_election_vol,
                    backgroundColor: 'rgb(102, 133, 179)',
                    stack: 'Stack 0',
                    order: 2,
                },
                {
                    label: 'Others   ',
                    data: other_vol,
                    backgroundColor: 'rgb(157, 184, 215)',
                    stack: 'Stack 0',
                    order: 2,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            family: 'Times New Roman',
                            size: 40
                        }
                    },
                    grid: {
                        color: 'rgba(128,128,128,0.5)',
                        borderDash: [15, 15],
                        drawBorder: true,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 15
                    },
                    stacked: true,
                },
                y: {
                    title: {
                        display: true,
                        text: 'Volume',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5

                    },
                    grid: {
                        drawBorder: true,
                        drawOnChartArea: true,
                        color: 'rgba(128,128,128,0.5)',
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...total_vol) * 1.1,
                    stacked: true,
                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Cumulative Volume',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...cumulative_vol) * 1.1,
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Polymarket Volume',
                    font: {
                        family: 'Times New Roman',
                        size: 54,
                        weight: 'bold',
                    },
                    padding: {
                        top: 5,
                        bottom: 80
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            family: 'Times New Roman',
                            size: 36,
                            padding: 100
                        },
                        boxWidth: 85,
                        boxHeight: 30,
                        padding: 15,
                        lineWidth: 100,
                    },
                },
            },
            layout: {
                padding: {
                    top: 100,
                    left: 20,
                    right: 20,
                    bottom: 22,
                }
            }
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgb(252,242,227)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        },
        {
            id: 'sourceText',
            afterRender(chart, args, options) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = 'italic 30px "Times New Roman"';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Source: Dune Analytics', 23, height - 13);
                ctx.restore();
            }
        }]
    };

    createChart({
        width: width,
        height: height,
        config: configuration,
    }, struct)
}

function getVolume2Chart(dataset, struct) {

    // Chart pixeling.
    const width = 2400
    const height = 1800

    // Extracting the dataset.
    const labels = dataset.map(row => row.month);
    const us_election_share = dataset.map(row => row.us_election_share);
    const other_share = dataset.map(row => row.other_share);
    const spread = dataset.map(row => row.spread)
    const max_spread = Math.max(...spread.map(Math.abs))

    // Conditonal coloring.
    const getColor = value => {
        if (value > 0) return 'rgba(18, 230, 0, 0.23)';
        if (value < 0) return 'rgba(255, 16, 16, 0.23)';
        return 'rgba(201, 203, 207, 0.2)';
    };

    // Chart.js configuration
    const configuration = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'US Election  ',
                    data: us_election_share,
                    type: 'line',
                    borderColor: 'rgb(76, 100, 140)',
                    fill: false,
                    yAxisID: 'y',
                    order: 1,
                    borderWidth: 9,
                    pointRadius: 0 
                },
                {
                    label: 'Others   ',
                    data: other_share,
                    type: 'line',
                    borderColor: 'rgb(157, 184, 215)',
                    fill: false,
                    yAxisID: 'y',
                    order: 1, 
                    borderWidth: 9,
                    pointRadius: 0 
                },
                {
                    label: 'Spread   ',
                    data: spread,
                    type: 'bar',
                    backgroundColor: spread.map(getColor),
                    order: 3,
                    yAxisID: 'y1',
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            family: 'Times New Roman',
                            size: 40
                        }
                    },
                    grid: {
                        color: 'rgba(128,128,128,0.5)',
                        borderDash: [15, 15],
                        drawBorder: true,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 15
                    },
                    stacked: true,
                },
                y: {
                    title: {
                        display: true,
                        text: 'Volume Shares',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5

                    },
                    grid: {
                        drawBorder: true,
                        drawOnChartArea: true,
                        color: 'rgba(128,128,128,0.5)',
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10,
                        stepSize: 10,
                    },
                    min: 0,  
                    max: 100, 
                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Spread',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: max_spread * 2,
                    suggestedMin: -max_spread * 2,
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Polymarket Volume Shares',
                    font: {
                        family: 'Times New Roman',
                        size: 54,
                        weight: 'bold',
                    },
                    padding: {
                        top: 5,
                        bottom: 80
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            family: 'Times New Roman',
                            size: 36,
                            padding: 100
                        },
                        boxWidth: 85,
                        boxHeight: 30,
                        padding: 15,
                        lineWidth: 100,
                    },
                },
            },
            layout: {
                padding: {
                    top: 100,
                    left: 20,
                    right: 20,
                    bottom: 22,
                }
            }
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgb(252,242,227)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        },
        {
            id: 'sourceText',
            afterRender(chart, args, options) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = 'italic 30px "Times New Roman"';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Source: Dune Analytics', 23, height - 13);
                ctx.restore();
            }
        }]
    };

    createChart({
        width: width,
        height: height,
        config: configuration,
    }, struct)
}

function getFirstBetChart(dataset, struct) {

    // Chart pixeling.
    const width = 2400
    const height = 1800

    // Extracting the dataset.
    const labels = dataset.map(row => row.category + '   ')
    const share = dataset.map(row => parseFloat(row.share));
    const bet_count = dataset
        .map(row => row.count)
        .reduce((a, b) => a + b, 0).toLocaleString('en-US');


    // Chart.js configuration
    const configuration = {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [
                {
                    data: share,
                    backgroundColor: [
                        'rgba(76, 100, 140, 0.95)',
                        'rgba(102, 133, 179, 0.95)',
                        'rgba(157, 184, 215, 0.95)',

                    ],
                    borderColor: [
                        'rgb(252,242,227)',
                        'rgb(252,242,227)',
                        'rgb(252,242,227)'
                    ],
                    borderWidth: 4, 
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Polymarket First Bet Category',
                    font: {
                        family: 'Times New Roman',
                        size: 54,
                        weight: 'bold',
                    },
                    padding: {
                        top: 20,
                        bottom: 180,
                    }
                },
                legend: {
                    display: false,

                },
                datalabels: {
                    display: true,
                    formatter: (value, context) => {
                        const label = context.chart.data.labels[context.dataIndex];
                        const percentage = (value / context.chart._metasets[0].total * 100).toFixed(0) + '%';
                        return `${label.trim()}\n${percentage}`;
                    },
                    color: 'rgba(255, 255, 255, 1)',
                    font: {
                        size: 50,
                        weight: 'bold',
                        family: 'Times New Roman',
                        lineHeight: 1.4
                    },
                    anchor: 'center',
                    align: 'center',
                    padding: 0,
                    textAlign: "center"
                }
            },
            layout: {
                padding: {
                    top: 100,
                    left: 300,
                    right: 300,
                    bottom: 370,
                }
            }
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgb(252,242,227)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        },
        {
            id: 'sourceText',
            afterRender(chart, args, options) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = 'italic 30px "Times New Roman"';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Source: Dune Analytics', 23, height - 13);
                ctx.restore();
            }
        },
        {
            id: 'sourceText',
            afterRender(chart, args, options) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = '50px "Times New Roman"';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(`The set represented in this chart consists of ${bet_count} first bets.`, width / 2, height - 170);
                ctx.restore();
            }
        },
            ChartDataLabels
        ]
    };

    createChart({
        width: width,
        height: height,
        config: configuration,
    }, struct)

}

function getRetentionChart(dataset, struct) {

    // Chart pixeling.
    const width = 2400
    const height = 1800

    // Extracting the dataset.
    const labels = dataset.map(row => row.month);
    const new_users = dataset.map(row => row.new_users);
    const retention_m3 = dataset.map(row => parseFloat(row.m_3)).filter(i => i);
    const retention_m6 = dataset.map(row => parseFloat(row.m_6)).filter(i => i);

    // Chart.js configuration
    const configuration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'New Users   ',
                    data: new_users,
                    backgroundColor: 'rgb(157, 184, 215)',
                    yAxisID: 'y',
                    order: 2
                },
                {
                    label: 'M3 Retention   ',
                    data: retention_m3,
                    type: 'line',
                    borderColor: 'rgb(76, 100, 140)',
                    fill: false,
                    yAxisID: 'y1',
                    order: 1,
                    borderWidth: 6,
                    pointRadius: 0
                },
                {
                    label: 'M6 Retention   ',
                    data: retention_m6,
                    type: 'line',
                    borderColor: 'rgb(88, 145, 255)',
                    fill: false,
                    yAxisID: 'y1',
                    order: 1,  
                    borderWidth: 6, 
                    pointRadius: 0 
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            family: 'Times New Roman',
                            size: 40
                        }
                    },
                    grid: {
                        color: 'rgba(128,128,128,0.5)',
                        borderDash: [15, 15],
                        drawBorder: true,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 15
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'New Users',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5

                    },
                    grid: {
                        drawBorder: true,
                        drawOnChartArea: true,
                        color: 'rgba(128,128,128,0.5)',
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10
                    },
                    suggestedMax: Math.max(...new_users) * 1.1

                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Retention Rate (M3 & M6)',
                        font: {
                            family: 'Times New Roman',
                            size: 40,
                        },
                        padding: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        lineWidth: 3,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            size: 33,
                        },
                        padding: 10,
                        stepSize: 0.1,
                    },
                    
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly New Users & Quarterly Retention',
                    font: {
                        family: 'Times New Roman',
                        size: 54,
                        weight: 'bold',
                    },
                    padding: {
                        top: 5,
                        bottom: 80
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            family: 'Times New Roman',
                            size: 36,
                            padding: 100
                        },
                        boxWidth: 85,
                        boxHeight: 30,
                        padding: 15,
                        lineWidth: 100,
                    },
                    reverse: true
                },
            },
            layout: {
                padding: {
                    top: 100,
                    left: 20,
                    right: 20,
                    bottom: 22,
                }
            }
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgb(252,242,227)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        },
        {
            id: 'sourceText',
            afterRender(chart, args, options) {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.font = 'italic 30px "Times New Roman"';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Source: Dune Analytics', 23, height - 13);
                ctx.restore();
            }
        }]
    };

    createChart({
        width: width,
        height: height,
        config: configuration,
    }, struct)


}

module.exports = {
    getUserChart,
    getTVLChart,
    getLpFeesChart,
    getVolume1Chart,
    getVolume2Chart,
    getFirstBetChart,
    getRetentionChart
}