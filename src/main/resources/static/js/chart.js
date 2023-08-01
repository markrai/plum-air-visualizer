export function makeChart(ctx, data, timeRange, dataType) {
    const defaultGridColor = '#484848';
    const defaultTickColor = '#484848';

    // Prepare annotation for PM2.5
    const pm25Annotations = {
        shadeBelow5: {
            type: 'box',
            yMin: 0,
            yMax: 5,
            backgroundColor: 'rgba(144, 238, 144, 0.1)' // Light green shading
        },
        shadeBetween5and15: {
            type: 'box',
            yMin: 5,
            yMax: 15,
            backgroundColor: 'rgba(255, 255, 0, 0.1)' // Yellow shading
        },
        shadeAbove15: {
            type: 'box',
            yMin: 15,
            backgroundColor: 'rgba(255, 0, 0, 0.1)' // Red shading
        }
    };

    // Prepare annotation for VOC
    const vocAnnotations = {
        shadeAbove100: {
            type: 'box',
            yMin: 100,
            backgroundColor: 'rgba(255, 0, 0, 0.1)' // Red shading
        }
    };

    var annotations;
    if (dataType === 'pm25') {
        annotations = pm25Annotations;
    } else if (dataType === 'voc') {
        annotations = vocAnnotations;
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
                // no gas680 data for backyard sensor
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

    var unit = 'day';
    var displayFormat = 'MM/dd/yyyy';
    if (timeRange === 'day') {
        unit = 'hour';
        displayFormat = 'h:mm a';
    }

    // Prepare datasets
    var datasets = [];

    // Include Backyard dataset only for PM 2.5
    if (dataType === 'pm25') {
        datasets.push({
            label: 'Backyard ' + dataType.toUpperCase(),
            data: backyardData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        });
    }

    // Include Bedroom and Nursery datasets for both PM 2.5 and VOC
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
    });

    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets // Updated datasets
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
                        color: defaultTickColor, // Apply the default tick color
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        color: defaultGridColor // Apply the default grid color
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: defaultTickColor // Apply the default tick color
                    },
                    grid: {
                        color: defaultGridColor // Apply the default grid color
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
                            hours = hours ? hours : 12; // the hour '0' should be '12'
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            return (hours + ':' + minutes + ' ' + ampm + ', ' +
                                (date.getMonth() + 1) + '/' +
                                date.getDate() + '/' +
                                date.getFullYear());
                        }
                    }
                },
                legendColorPlugin, // This is where you should place the plugin
                annotation: annotations ? {
                    annotations: annotations
                } : undefined // Apply the selected annotations

            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

  applyThemeToChart(chart);
  return chart;
}

const legendColorPlugin = {
    id: 'legendColorPlugin',
    beforeDraw(chart) {
        const legend = chart.legend;
        legend.legendItems.forEach((item, index) => {
            const dataset = chart.data.datasets[index];
            item.fillStyle = dataset.borderColor; // Set fillStyle to match borderColor
            item.strokeStyle = dataset.borderColor; // Set strokeStyle to match borderColor
        });
    },
};



export function updateChart(allData, timeRange, dataType, ctx, chart) {
    var now = luxon.DateTime.local(); // get current date/time
    var cutoff;

    switch (timeRange) {
        case 'day':
            cutoff = now.minus({
                hours: 12
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

    // destroy old chart and make a new one with the filtered data
    chart.destroy();
    return makeChart(ctx, filteredData, timeRange, dataType); // return the new chart

}

export const darkModeOptions = {
    scales: {
        x: {
            grid: {
                color: 'white',
            },
            ticks: {
                color: 'white',
            },
        },
        y: {
            grid: {
                color: 'white',
            },
            ticks: {
                color: 'white',
            },
        },
    },
};