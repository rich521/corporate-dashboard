import axios from "axios";
import Chart from "chart.js";


let pc,
    lc,
    bc;

export function fetchMetrics(once, p, b, l) {
    return function(dispatch) {
        dispatch({ type: "FETCH_METRIC" });
        axios.get("./data/metrics.json")
            .then((response) => {
                dispatch({ type: "FETCH_METRIC_FULFILLED", payload: response.data });
                if (once) updateCharts(response.data, p, b, l, false);
            })
            .catch((err) => {
                dispatch({ type: "FETCH_METRIC_REJECTED", payload: err });
            });
    }
}

export function updateCharts(d, p, b, l, check) {
    const dataLength = d.length;
    let pieData = [0, 0],
        barData = [
            [],
            []
        ],
        lineData = [
            [],
            []
        ],
        accumData = [d[0].total_issues],
        acumPay = 0;

    // Bardata accumulation
    for (let i = 1; i < dataLength; i++) {
        accumData.push(d[i].total_issues + accumData[i - 1]);
    }
    // Process data
    for (let i = 0; i < dataLength; i++) {
        // For pie data
        let di = d[i];
        pieData[0] += di.opened_issues;
        pieData[1] += (di.total_issues - di.opened_issues);
        // For Bar data (every 2 weeks)
        if ((i + 1) % 2 === 0) {
            barData[0].push(di.week);
            barData[1].push(accumData[i]);
        }
        // For Line data (every 4 weeks)
        acumPay += di.paying_customers;
        if ((i + 1) % 4 === 0) {
            lineData[0].push(di.week);
            lineData[1].push(acumPay / 4);
            acumPay = 0;
        }
    }

    // Pie Chart
    if (lc && bc && pc) {
        lc.destroy();
        bc.destroy();
        pc.destroy();
    }

    pieChart(p, pieData);
    barChart(b, barData);
    lineChart(l, lineData);
}


function pieChart(p, pieData) {
    // p.innerHTML = "";
    pc = new Chart(p, {
        type: "pie",
        data: {
            labels: [
                "Open Issues",
                "Closed Issues",
            ],
            datasets: [{
                data: [pieData[0], pieData[1]],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: "Pie Chart of Issues"
            }
        }
    });
}

function barChart(b, barData) {
    // Bar Chart
    bc = new Chart(b, {
        type: "bar",
        data: {
            labels: barData[0],
            datasets: [{
                label: "Reported Issues over Time",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data: barData[1],
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Reported Issues"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Weeks"
                    }
                }]
            }
        }
    });
}

function lineChart(l, lineData) {
    lc = new Chart(l, {
        type: "line",
        data: {
            labels: lineData[0],
            datasets: [{
                label: "Paying Customers over Time",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                data: lineData[1],
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Paying Customers"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Weeks"
                    }
                }]
            }
        }
    });
}
