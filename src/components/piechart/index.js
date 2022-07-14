import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'

export default function PieChart(props) {
    const title = (props?.confirmed && `Confirmed Cases`) || (props?.recovered && `Recovered Cases`) || (props?.deaths && `Death Cases`)
    const color = (props?.confirmed && ['#e53e33', '#e53e334f']) || (props?.recovered && ['#38a16e', '#38a16e52']) || (props?.deaths && ['#71809b', '#71809b57'])
    const cases = (props?.confirmed && props?.confirmed) || (props?.recovered && props?.recovered) || (props?.deaths && props?.deaths) 
    const config = {
        chart: {
          type: "pie",
          marginTop: 0,
          spacingLeft: 0,
          spacingRight: 0,
          spacingTop: 0
        },
        title: {
          text: title,
          align: "center",
          verticalAlign: "middle",
          y: -30,
          style: {
            fontWeight: 500
          }
        },
        subtitle: {
          text: `${cases} Per Million`,
          align: "center",
          verticalAlign: "middle",
          y: 0
        },
        tooltip: {
          enabled: true,
          pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
          series: {
            states: {
              hover: {
                enabled: true
              }
            }
          },
          pie: {
            allowPointSelect: false,
            cursor: "pointer",
            dataLabels: {
              enabled: true
            },
            showInLegend: false,
            borderWidth: 0,
            colors: color
          }
        },
        series: [
            {
                name: 'Rate',  
                innerSize: "75%",
                data: [
                {
                    name: `Rate ${title}`,
                    y: (cases/1000000 * 100),
                },
                {
                    name: 'Rest Rate',
                    y: 100,
                },
                ]
            },
        ],
        legend: {
          itemStyle: {
            color: "red"
          },
          symbolRadius: 0
        }
      };
  return (
    <div className='pie_chart_item'>
        <HighchartsReact 
            options={config} 
            highcharts={Highcharts}
        />
    </div>
  )
}
