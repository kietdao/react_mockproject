import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import { useSelector } from 'react-redux';

export default function DataChart(props) {
  const globalChartData = useSelector(state => state.countries?.chartData)
  const customedData = JSON.parse(JSON.stringify(globalChartData))
  let data = customedData?.data
  if(props?.data) {
    data = props.data.timeline
  }
  const dateArray = []
  const dataArray = []
  for(let key in data) {
    dateArray.push(Object.keys(data[key]))
    dataArray.push(Object.values(data[key]))
  }
  const confirmedData = dataArray?.[0]
  const deathsData = dataArray?.[1]
  const recoveredData = dataArray?.[2]
  const dateCustomedArray = dateArray[0] && dateArray[0].map(date => {
    let dateForCustomize = new Date(date)
    let customizedDate = `${dateForCustomize.getDate()}-${dateForCustomize.getMonth()+1}-${dateForCustomize.getFullYear().toString().substr(-2)}`
    return customizedDate
  })
  const casesForChart = dateCustomedArray && dateCustomedArray.map((date, index) => {
    return [
      date,
      confirmedData?.[index]
    ]
  })
  const recoveredForChart = dateCustomedArray && dateCustomedArray.map((date, index) => {
    return [
      date,
      recoveredData?.[index]
    ]
  })
  const deathsForChart = dateCustomedArray && dateCustomedArray.map((date, index) => {
    return [
      date,
      deathsData?.[index]
    ]
  })
  const config = {
    chart: {
      type: 'line',
      height: 500
    },
    title: {
      text: `Overview Chart of ${props?.data?.country || 'All Countries'}`
    },
    subtitle: {
      text: "Overview chart includes Confirmed, Recovered, Deaths cases"
    },
    yAxis: {
      title: {
        text: "Numbers of Cases"
      },
    },
    xAxis: {
      categories: dateCustomedArray
    },
    series: [
      {
        name: "Confirmed Cases",
        type: "line",
        color: "#e53e33",
        data: casesForChart
      },
      {
        name: "Recovered Cases",
        type: "line",
        color: "#38a16e",
        data: recoveredForChart
      },
      {
        name: "Deaths Cases",
        type: "line",
        color: "#71809b",
        data: deathsForChart
      },
    ],
    exporting: {
      showTable: true
    }
  };
  return (
    <div className="line_chart">
      <HighchartsReact
        options={config} 
        highcharts={Highcharts}
      />
    </div>
  )
}
