import { pm25Annotations, legendColorPlugin } from './chartUtilities.js';

function processPM25Data(data) {
    const backyardData = data.filter(item => item.detector.name === 'backyard').map(item => {
        const p2_5UmB = item.p2_5UmB !== null ? item.p2_5UmB : item.p2_5Um;
        const avg = (item.p2_5Um + p2_5UmB) / 2;
        return { x: item.timestamp, y: avg };
    }).filter(item => item != null);

    const bedroomData = data.filter(item => item.detector.name === 'bedroom').map(item => ({ x: item.timestamp, y: item.p2_5Um }));
    const nurseryData = data.filter(item => item.detector.name === 'nursery').map(item => ({ x: item.timestamp, y: item.p2_5Um }));

    return { backyardData, bedroomData, nurseryData };
}

export function renderPM25Chart(ctx, data, timeRange) {
    const processedData = processPM25Data(data);
    const defaultGridColor = '#484848';
    const defaultTickColor = '#484848';
    const annotations = pm25Annotations;
    var unit = 'day';
    var displayFormat = 'MM/dd/yyyy';

    if (timeRange === 'hour') { unit = 'minute'; displayFormat = 'h:mm a'; }
    else if (timeRange === 'day') { unit = 'hour'; displayFormat = 'h:mm a'; }

    var datasets = [
        { label: 'Backyard PM 2.5', data: processedData.backyardData, fill: false, borderColor: 'rgb(75, 192, 192)', tension: 0.1 },
        { label: 'Bedroom PM 2.5', data: processedData.bedroomData, fill: false, borderColor: 'rgb(255, 99, 132)', tension: 0.1 },
        { label: 'Nursery PM 2.5', data: processedData.nurseryData, fill: false, borderColor: 'rgb(255, 159, 64)', tension: 0.1 }
    ];

    return new Chart(ctx, {
        type: 'line',
        data: { datasets: datasets },
        options: {
            scales: {
                x: { type: 'time', time: { unit: unit, displayFormats: { [unit]: displayFormat } }, distribution: 'linear', ticks: { source: 'auto', color: defaultTickColor, maxRotation: 45, minRotation: 45 }, grid: { color: defaultGridColor } },
                y: { beginAtZero: true, ticks: { color: defaultTickColor }, grid: { color: defaultGridColor } }
            },
            plugins: {
                tooltip: { callbacks: { title: function(tooltipItem) { var date = new Date(tooltipItem[0].parsed.x); var hours = date.getHours(); var minutes = date.getMinutes(); var ampm = hours >= 12 ? 'PM' : 'AM'; hours = hours % 12; hours = hours ? hours : 12; minutes = minutes < 10 ? '0' + minutes : minutes; return (hours + ':' + minutes + ' ' + ampm + ', ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()); } } },
                legendColorPlugin,
                annotation: { annotations: annotations }
            },
            responsive: true,
            maintainAspectRatio: true,
            animation: {duration: 500}
        }
    });
}

export function updatePM25Chart(allData, timeRange, ctx, chart) {
    var now = luxon.DateTime.local();
    var cutoff;

    switch (timeRange) {
        case 'hour': cutoff = now.minus({ hours: 2 }); break;
        case 'day': cutoff = now.minus({ hours: 24 }); break;
        case 'week': cutoff = now.minus({ weeks: 1 }); break;
        case 'month': cutoff = now.minus({ months: 1 }); break;
        case 'year': cutoff = now.minus({ years: 1 }); break;
    }

    if (chart instanceof Chart) {
        chart.destroy(); // Destroy the existing chart
    }

    var filteredData = allData.filter(item => luxon.DateTime.fromISO(item.timestamp) >= cutoff);
    return renderPM25Chart(ctx, filteredData, timeRange);
}
