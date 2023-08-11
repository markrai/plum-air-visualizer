import { updatePM25Chart } from '/js/pm25Chart.js';
import { updateVOCChart } from '/js/vocChart.js';
import { updateWeatherChart } from '/js/weatherChart.js';

export function addEventListeners(chart, allData, timeRange, dataType, ctx) {
    // Function to update the chart based on the selected time range and data type
    function updateChart() {
        if (chart) {
            chart.destroy();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Introduce a delay to ensure the chart is completely destroyed before creating a new one
            setTimeout(() => {
                switch (dataType) {
                    case 'pm25':
                        chart = updatePM25Chart(allData, timeRange, ctx, chart);
                        break;
                    case 'voc':
                        chart = updateVOCChart(allData, timeRange, ctx, chart);
                        break;
                    case 'weather':
                        chart = updateWeatherChart(allData, timeRange, ctx, chart);
                        break;
                    default:
                        console.error('Unknown data type:', dataType);
                }
            }, 100); // 100 milliseconds delay
        } else {
            switch (dataType) {
                case 'pm25':
                    chart = updatePM25Chart(allData, timeRange, ctx, chart);
                    break;
                case 'voc':
                    chart = updateVOCChart(allData, timeRange, ctx, chart);
                    break;
                case 'weather':
                    chart = updateWeatherChart(allData, timeRange, ctx, chart);
                    break;
                default:
                    console.error('Unknown data type:', dataType);
            }
        }
    }


    document.addEventListener('keydown', function(event) {
        switch (event.key.toLowerCase()) {
            case 'c':
                var toggleSwitch = document.getElementById('toggle-switch');
                if (toggleSwitch) {
                    toggleSwitch.click();
                }
                break;
            case 'p':
                document.getElementById('pm25-button').click();
                break;
            case 'v':
                document.getElementById('voc-button').click();
                break;
            case '2':
                document.getElementById('hours-button').click();
                break;
            case 'd':
                document.getElementById('day-button').click();
                break;
            case 'w':
                document.getElementById('week-button').click();
                break;
            case 'm':
                document.getElementById('month-button').click();
                break;
            case 'y':
                document.getElementById('year-button').click();
                break;
            case 't':
                document.getElementById('weather-button').click();
                break;
        }
    });

    document.querySelectorAll('.time-range-button').forEach(button => {
        button.addEventListener('click', function() {
            // remove 'selected' class from all time range buttons
            document.querySelectorAll('.time-range-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            // add 'selected' class to the clicked button
            this.classList.add('selected');

            timeRange = this.dataset.timeRange || timeRange;
            updateChart(); // Call the new updateChart function
        });
    });

    document.querySelectorAll('.data-type-button').forEach(button => {
        button.addEventListener('click', function() {
            // remove 'selected' class from all data type buttons
            document.querySelectorAll('.data-type-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            // add 'selected' class to the clicked button
            this.classList.add('selected');

            dataType = this.dataset.dataType || dataType;
            updateChart(); // Call the new updateChart function
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const dayButton = document.getElementById('theme-toggle');
        if (dayButton) {
            dayButton.click();
        }
    });

    var cyclingInterval;

    var currentView = 0; // 0: PM 2.5, 1: VOC, 2: Temp/Hum

    function cycleViews() {
        // Increment current view and wrap around if it exceeds the number of views
        currentView = (currentView + 1) % 3;

        // Simulate clicks on the buttons based on the current view
        switch (currentView) {
            case 0:
                document.getElementById('pm25-button').click();
                break;
            case 1:
                document.getElementById('voc-button').click();
                break;
            case 2:
                document.getElementById('weather-button').click();
                break;
        }
    }

    function showGrowlMessage(message) {
        var growlMessage = document.getElementById('growl-message');
        growlMessage.textContent = message;
        growlMessage.classList.add('show');
        setTimeout(function() {
            growlMessage.classList.remove('show');
        }, 2000); // Hide the message after 3 seconds
    }

    document.getElementById('toggle-switch').addEventListener('change', function() {
        if (this.checked) {
            cyclingInterval = setInterval(cycleViews, 10000);
            showGrowlMessage("View Cycling Turned On (15 secs)");
        } else {
            clearInterval(cyclingInterval);
            showGrowlMessage("View Cycling Turned Off");
        }
    });
}