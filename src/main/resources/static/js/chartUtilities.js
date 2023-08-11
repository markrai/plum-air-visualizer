export const pm25Annotations = {
    shadeBelow5: {
        type: 'box',
        yMin: 0,
        yMax: 5,
        backgroundColor: 'rgba(144, 238, 144, 0.1)'
    },
    shadeBetween5and15: {
        type: 'box',
        yMin: 5,
        yMax: 15,
        backgroundColor: 'rgba(255, 255, 0, 0.1)'
    },
    shadeAbove15: {
        type: 'box',
        yMin: 15,
        backgroundColor: 'rgba(255, 0, 0, 0.1)'
    }
};

export const vocAnnotations = {
    shadeBetween0and50: {
        type: 'box',
        yMin: 0,
        yMax: 50,
        backgroundColor: 'rgba(0, 255, 0, 0.1)' // Green
    },
    shadeBetween51and100: {
        type: 'box',
        yMin: 51,
        yMax: 100,
        backgroundColor: 'rgba(255, 255, 0, 0.1)' // Yellow
    },
    shadeBetween101and150: {
        type: 'box',
        yMin: 101,
        yMax: 150,
        backgroundColor: 'rgba(255, 165, 0, 0.1)' // Orange
    },
    shadeBetween151and200: {
        type: 'box',
        yMin: 151,
        yMax: 200,
        backgroundColor: 'rgba(255, 0, 0, 0.1)' // Red
    },
    shadeBetween201and300: {
        type: 'box',
        yMin: 201,
        yMax: 300,
        backgroundColor: 'rgba(128, 0, 128, 0.1)' // Purple
    },
    shadeAbove301: {
        type: 'box',
        yMin: 301,
        backgroundColor: 'rgba(75, 0, 130, 0.1)' // Dark Purple
    }
};

export const weatherAnnotations = {
    shadeAbove100: {
        type: 'box',
        yMin: 100,
        backgroundColor: 'rgba(255, 0, 0, 0.1)'
    }
};

export const legendColorPlugin = {
    id: 'legendColorPlugin',
    beforeDraw(chart) {
        const legend = chart.legend;
        legend.legendItems.forEach((item, index) => {
            const dataset = chart.data.datasets[index];
            item.fillStyle = dataset.borderColor;
            item.strokeStyle = dataset.borderColor;
        });
    },
};
