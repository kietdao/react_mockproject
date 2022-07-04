import React from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { useSelector } from 'react-redux';
import './linechart.scss'


export default function DataChart() {
  const globalChartData = useSelector(state => state.countries?.chartData)
  const customedData = JSON.parse(JSON.stringify(globalChartData))
  const chartData = customedData?.data
  const dateArray = []
  const dataArray = []
  for(let index in chartData) {
    dateArray.push(Object.keys(chartData[index]))
    dataArray.push(Object.values(chartData[index]))
  }
  const casesData = dataArray?.[0]
  const deathsData = dataArray?.[1]
  const recoveredData = dataArray?.[2]
  const dateCustomedArray = dateArray[0] && dateArray[0].map(date => {
    let dateForCustomize = new Date(date)
    let customizedDate = `${dateForCustomize.getDate()}-${dateForCustomize.getMonth()+1}-${dateForCustomize.getFullYear().toString().substr(-2)}`
    return customizedDate
  })
  const dataForChart = dateCustomedArray && dateCustomedArray.map((date, index) => {
    return {
      date,
      cases: casesData?.[index],
      deaths: deathsData?.[index],
      recovered: recoveredData?.[index]
    }
  })
  return (
    <div className='line_chart'>
      <h2>Overview Chart</h2>
      <ResponsiveContainer className="chart" height={300}>
        <LineChart 
         width={`100%`} 
         height={800}
         data={dataForChart ? dataForChart : []}
         margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <XAxis dataKey="date"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#e53e33" />
        <Line type="monotone" dataKey="deaths" stroke="#71809b" />
        <Line type="monotone" dataKey="recovered" stroke="#38a16e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
