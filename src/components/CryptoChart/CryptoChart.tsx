import React from "react";
import { Line } from "react-chartjs-2";
import "./CryptoChart.scss";

interface ICryptoChartProps {
    chartData: any;
}

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        xAxes: [{
             ticks: {
                 display: true,
                     fontSize: 12,
             },
            gridLines: {
                 display: true,
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