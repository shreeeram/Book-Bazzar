import React, { Component } from "react";
import Chart from "react-apexcharts";
import orderService from "../../service/order.service";


class StatusChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            // series: this.props.orderdata,
            series: [], 
            options: {
                chart: {
                    type: 'donut',
                },
                title: {
                    text: 'Orders Status',
                    align: 'left',
                    // offsetX: 110
                },
                labels: [ 'Processing', 'Delivered','pending'],
                responsive: [{
                    breakpoint: 400,
                    options: {
                        chart: {
                            width: 100
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },

        };
    }

    async componentDidMount() {
        const pieValues = (await orderService.getPieValues()).data;
        this.setState({ series: pieValues });
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="donut"
                            width="80%"
                            height={"250"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusChart;