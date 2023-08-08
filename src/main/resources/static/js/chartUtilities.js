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
    shadeAbove100: {
        type: 'box',
        yMin: 100,
        backgroundColor: 'rgba(255, 0, 0, 0.1)'
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
