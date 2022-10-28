import React from "react";
import {Line} from "react-chartjs-2";
import {months} from "../../../../config/constant";

const randomSales = () => {
    var sales = [];

    for (let index = 0; index < months.length; index++) {
        sales.push(Math.floor(1000 + Math.random() * 1000000));
    }

    return sales;
};

function SalesChart() {
    randomSales();

    return (
        <>
            <Line
                height={"50%"}
                width={"100%"}
                data={{
                    labels: months,
                    datasets: [
                        {
                            label: "Sales",
                            data: randomSales(),
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)"
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)"
                            ],
                            borderWidth: 1
                        }
                    ],
                    options: {
                        responsive: true,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            ]
                        }
                    }
                }}
            />
        </>
    );
}

export default SalesChart;
