import React from "react";
import { Line } from "react-chartjs-2";
import "./CryptoChart.scss";
import moment from "moment/moment";

interface ICryptoChartProps {
    chartData: any;
}
const formatTooltipDate = (tooltipItem: any) => {
    const label = tooltipItem[0].xLabel;
    const formattedDate = moment(label).format("MMM DD, YYYY");
    return formattedDate;
};
const formatPrice = (tooltipItem: any, data: any) =>{
    let label = data.datasets[tooltipItem.datasetIndex].label || '';
    if (label) {
        label += ': ';
    }
    label += tooltipItem.yLabel.toFixed(2) + ' $';
    return label;
}

export const options = {

    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        zoom: {
            zoom: {
                wheel: {
                    enabled: true
                },
                pinch: {
                    enabled: true
                },
                mode: 'xy'
            },
            pan: {
                enabled: true,
                mode: 'xy'
            }
        }
    },
    legend: {
        display: false,
    },
    tooltips: {
        callbacks: {
             title: formatTooltipDate,
             label: formatPrice
        },
    },
    scales: {
        xAxes: [{
             ticks: {
                 display: false,
             },
            gridLines: {
                 display: false,
            },
        }],
        yAxes: [{
            ticks: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
                fontSize: 12
            },
            grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
            },
            position: 'right',
        }],
    },
};


const CryptoChart: React.FC<ICryptoChartProps> = ({ chartData }) => {
    return(
        <div className={"CryptoChart"}>
            {chartData && (
                <Line options={options} data={chartData}/>
            )}
        </div>
    )
};

export default CryptoChart;