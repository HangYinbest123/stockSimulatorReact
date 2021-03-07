import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'
import {numberFormat} from '../Util/numberFormat'

export default class Chart extends Component {

    render() {
        const configPrice = this.getConfigPrice();
        if (this.props.data == null) {
            return <div>Loading...</div>
        }else{
            return (

                <div>
                    <ReactHighcharts className="chart" config = {configPrice}></ReactHighcharts>
                </div>
            )
        }
    }

    getConfigPrice(){

        const configPrice = {

            yAxis: [{
                offset: 20,

                labels: {
                    formatter: function () {
                        return numberFormat.format(this.value)
                    }
                    ,
                    x: -15,
                    style: {
                        "color": "#000", "position": "absolute"

                    },
                    align: 'left'
                },
            },

            ],
            tooltip: {
                shared: true,
                formatter: function () {
                    return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
                }
            },
            plotOptions: {
                series: {
                    showInNavigator: true,
                    gapSize: 6,

                }
            },
            chart: {
                height: 600,
            },

            credits: {
                enabled: false
            },
            xAxis: {
                type: 'date',
            },
            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 7,
                    text: '7d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                },
                    {
                        type: 'all',
                        text: 'All'
                    }],
                selected: 4
            },
            series: [{
                name: 'Price',
                type: 'spline',
                data: this.props.data,
                tooltip: {
                    valueDecimals: 2
                },

            }
            ]
        };
        return configPrice;
    }
}
