import { luxon } from 'luxon';
import { pm25Annotations, vocAnnotations, weatherAnnotations, legendColorPlugin } from './chartUtilities.js';

export function makeChart(ctx, data, timeRange, dataType) {
    const defaultGridColor = '#484848';
    const defaultTickColor = '#484848';

    var annotations;
    if (dataType === 'pm25') {
        annotations = pm25Annotations;
    } else if (dataType === 'voc') {
        annotations = vocAnnotations;
    } else if (dataType === 'weather') {
        annotations = weatherAnnotations;
    }

    const backyardData = data
        .filter(item => item.detector.name === 'backyard')
        .map(item => {
            if (dataType === 'pm25') {
                const p2_5UmB = item.p2_5UmB !== null ? item.p2_5UmB : item.p2_5Um;
                const avg = (item.p2_5Um + p2_5UmB) / 2;
                return {
                    x: item.timestamp,
                    y: avg
                };
            } else {
                return null;
            }
        })
        .filter(item => item != null);

    const bedroomData = data
        .filter(item => item.detector.name === 'bedroom')
        .map(item => ({
            x: item.timestamp,
            y: dataType === 'pm25' ? item.p2_5Um : item.gas680
        }));

    const nurseryData = data
        .filter(item => item.detector.name === 'nursery')
        .map(item => ({
            x: item.timestamp,
            y: dataType === 'pm25' ? item.p2_5Um : item.gas680
        }));

    const livingroomData = data
        .filter(item => item.detector.name === 'livingroom')
        .map(item => ({
            x: item.timestamp,
            y: dataType === 'pm25' ? item.p2_5Um : item.gas680
        }));

    const temperatureData = data
        .map(item => ({
            x: item.timestamp,
            y: item.temperature
        }));

    const humidityData = data
        .map(item => ({
            x: item.timestamp,
            y: item.humidity
        }));

    var unit = 'day';
    var displayFormat = 'MM/dd/yyyy';
    if (timeRange === 'day') {
        unit = 'hour';
        displayFormat = 'h:mm a';
    }

    var datasets = [];

    if (dataType === 'pm25') {
        datasets.push({
            label: 'Backyard ' + dataType.toUpperCase(),
            data: backyardData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        });
    }

    datasets.push({
        label: 'Bedroom ' + dataType.toUpperCase(),
        data: bedroomData,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
    }, {
        label: 'Nursery ' + dataType.toUpperCase(),
        data: nurseryData,
        fill: false,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1
    }, {
        label: 'Livingroom ' + dataType.toUpperCase(),
        data: livingroomData,
        fill: false,
        borderColor: 'rgb(255, 218, 41)',
        tension: 0.1
    }, {
        label: 'Temperature',
        data: temperatureData,
        fill: false,
        borderColor: 'rgb(75, 75, 255)',
        tension: 0.1
    }, {
        label: 'Humidity',
        data: humidityData,
        fill: false,
        borderColor: 'rgb(75, 75, 192)',
        tension: 0.1
    });

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
                annotation: annotations ? {
                    annotations: annotations
                } : undefined
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

export function updateChart(allData, timeRange, dataType, ctx, chart) {
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
    return makeChart(ctx, filteredData, timeRange, dataType);
}
