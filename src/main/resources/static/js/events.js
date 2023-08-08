import { updatePM25Chart } from '/js/pm25Chart.js';
import { updateVOCChart } from '/js/vocChart.js';
import { updateWeatherChart } from '/js/weatherChart.js';

export function addEventListeners(chart, allData, timeRange, dataType, ctx) {
    document.addEventListener('keydown', function(event) {
        switch (event.key.toLowerCase()) {
            case 'p':
                document.getElementById('pm25-button').click();
                break;
            case 'v':
                document.getElementById('voc-button').click();
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
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const dayButton = document.getElementById('theme-toggle');
        if (dayButton) {
            dayButton.click();
        }
    });
}
