export function getGradient(context, colors: string[]) {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) {
        return;
    }

    const { top, bottom } = chartArea;


    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    colors.forEach((color, index) => {
        const offset = index / (colors.length - 1);
        gradient.addColorStop(offset, color);
    });

    return gradient;
}
