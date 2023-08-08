import { weatherAnnotations, legendColorPlugin } from './chartUtilities.js';

function processWeatherData(data) {
    const indoorTemperatureData = data
        .filter(item => item.detectorId === 4)
        .map(item => ({
            x: item.timestamp,
            y: item.temperature
        }));

    const indoorHumidityData = data
        .filter(item => item.detectorId === 4)
        .map(item => ({
            x: item.timestamp,
            y: item.humidity
        }));

    const outdoorTemperatureData = data
        .filter(item => item.detectorId === 5)
        .map(item => ({
            x: item.timestamp,
            y: item.outdoorTemperature
        }));

    const outdoorHumidityData = data
        .filter(item => item.detectorId === 5)
        .map(item => ({
            x: item.timestamp,
            y: item.outdoorHumidity
        }));

    return {
        indoorTemperatureData,
        indoorHumidityData,
        outdoorTemperatureData,
        outdoorHumidityData
    };
}

export function renderWeatherChart(ctx, data, timeRange) {
    const processedData = processWeatherData(data);

    const defaultGridColor = '#484848';
    const defaultTickColor = '#484848';

    const annotations = weatherAnnotations;

    var unit = 'day';
    var displayFormat = 'MM/dd/yyyy';
    if (timeRange === 'day') {
        unit = 'hour';
        displayFormat = 'h:mm a';
    }

    var datasets = [
        {
            label: 'Indoor Temperature',
            data: processedData.indoorTemperatureData,
            fill: false,
            borderColor: 'rgb(255,160,122)',
            tension: 0.1
        },
        {
            label: 'Indoor Humidity',
            data: processedData.indoorHumidityData,
            fill: false,
            borderColor: 'rgb(176,224,230)',
            tension: 0.1
        },
        {
            label: 'Outdoor Temperature',
            data: processedData.outdoorTemperatureData,
            fill: false,
            borderColor: 'rgb(255,0,0)',
            tension: 0.1
        },
        {
            label: 'Outdoor Humidity',
            data: processedData.outdoorHumidityData,
            fill: false,
            borderColor: 'rgb(0,191,255)',
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

export function updateWeatherChart(allData, timeRange, ctx, chart) {
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
    return renderWeatherChart(ctx, filteredData, timeRange);
}
