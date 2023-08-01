import { makeChart, updateChart } from '/js/chart.js';
import { addEventListeners } from '/js/events.js';



var chart; // global chart reference
var allData; // store all data
var dataType = 'pm25'; // default data type
var timeRange = 'day'; // default time range
var ctx = document.getElementById('myChart').getContext('2d'); // canvas context
var apiBaseUrl;

function fetchConfig() {
    return fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            apiBaseUrl = config.apiBaseUrl;
        });
}

function fetchData() {
        fetch(apiBaseUrl + '/api/metrics')
        .then(response => response.json())
        .then(data => {
            allData = data; // store all data
            ctx = document.getElementById('myChart').getContext('2d');

            var now = luxon.DateTime.local(); // get current date/time
            var cutoff = now.startOf('day');
            var initialData = allData.filter(item => luxon.DateTime.fromISO(item.timestamp) >= cutoff);

            chart = makeChart(ctx, initialData, timeRange, dataType); // initial display by day
            addEventListeners(chart, allData, timeRange, dataType, ctx); // Add this line

            const dayButton = document.getElementById('day-button');
            if (dayButton) {
                dayButton.click(); // simulates a user click on the "day" button
            }
        });
}

// Initially fetch the data and create the chart
fetchConfig().then(fetchData);


// Set an interval to refresh the data every 30 minutes
setInterval(fetchData, 30 * 60 * 1000);
