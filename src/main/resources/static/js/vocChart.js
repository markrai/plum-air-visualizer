import { vocAnnotations, legendColorPlugin } from './chartUtilities.js';

function processVOCData(data) {
    const backyardData = data
        .filter(item => item.detector.name === 'backyard')
        .map(item => {
            return null;  // As per your earlier note, no gas680 data for backyard sensor
        })
        .filter(item => item != null);

    const bedroomData = data
        .filter(item => item.detector.name === 'bedroom')
        .map(item => ({
            x: item.timestamp,
            y: item.gas680
        }));

    const nurseryData = data
        .filter(item => item.detector.name === 'nursery')
        .map(item => ({
            x: item.timestamp,
            y: item.gas680
        }));

    const livingroomData = data
        .filter(item => item.detector.name === 'livingroom')
        .map(item => ({
            x: item.timestamp,
            y: item.gas680
        }));

    return {
        backyardData,
        bedroomData,
        nurseryData,
        livingroomData
    };
}

export function renderVOCChart(ctx, data, timeRange) {
    const processedData = processVOCData(data);

    const defaultGridColor = '#484848';
    const defaultTickColor = '#484848';

    const annotations = vocAnnotations;

    var unit = 'day';
    var displayFormat = 'MM/dd/yyyy';
    if (timeRange === 'day') {
        unit = 'hour';
        displayFormat = 'h:mm a';
    }

    var datasets = [
        {
            label: 'Bedroom VOC',
            data: processedData.bedroomData,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
        },
        {
            label: 'Nursery VOC',
            data: processedData.nurseryData,
            fill: false,
            borderColor: 'rgb(255, 159, 64)',
            tension: 0.1
        },
        {
            label: 'Livingroom VOC',
            data: processedData.livingroomData,
            fill: false,
            borderColor: 'rgb(255, 218, 41)',
            tension: 0.1
        }
    ];

    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: unit,
                        displayFormats: {
                            [unit]: displayFormat
                        },
                    },
                    distribution: 'linear',
                    ticks: {
                        source: 'auto',
                        color: defaultTickColor,
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        color: defaultGridColor
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: defaultTickColor
                    },
                    grid: {
                        color: defaultGridColor
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function(tooltipItem) {
                            var date = new Date(tooltipItem[0].parsed.x);
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var ampm = hours >= 12 ? 'PM' : 'AM';
                            hours = hours % 12;
                            hours = hours ? hours : 12;
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            return (hours + ':' + minutes + ' ' + ampm + ', ' +
                                (date.getMonth() + 1) + '/' +
                                date.getDate() + '/' +
                                date.getFullYear());
                        }
                    }
                },
                legendColorPlugin,
                annotation: {
                    annotations: annotations
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

export function updateVOCChart(allData, timeRange, ctx, chart) {
    var now = luxon.DateTime.local();
    var cutoff;

    switch (timeRange) {
        case 'day':
            cutoff = now.minus({
                hours: 24
            });
            break;
        case 'week':
            cutoff = now.minus({
                weeks: 1
            });
            break;
        case 'month':
            cutoff = now.minus({
                months: 1
            });
            break;
        case 'year':
            cutoff = now.minus({
                years: 1
            });
            break;
    }

    var filteredData = allData.filter(item => luxon.DateTime.fromISO(item.timestamp) >= cutoff);
    chart.destroy();
    return renderVOCChart(ctx, filteredData, timeRange);
}
