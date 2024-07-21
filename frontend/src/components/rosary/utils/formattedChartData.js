// src/components/rosary/utils/formattedChartData.js
export const formattedChartData = (chartData) => {
    return chartData.labels.map((label, index) => {
        return { label: label, value: chartData.datasets[0].data[index] };
    });
};
