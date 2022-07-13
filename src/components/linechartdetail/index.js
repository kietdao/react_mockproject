import { useParams } from 'react-router-dom'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'

export default function LineChartDetail(props) {
  const data = props?.data?.timeline
  const dateArray = []
  const confirmedArray = []
  const recoveredArray = []
  const deathsArray = []
  for(let key in data) {
    dateArray.push(Object.keys(data[key]))
    switch(key) {
        case 'cases':
            confirmedArray.push(Object.values(data['cases']))
            break
        case 'recovered':
            recoveredArray.push(Object.values(data['recovered']))
            break
        case 'deaths':
            deathsArray.push(Object.values(data['deaths']))    
            break
    }
  }
  const dateCustomedArray = dateArray[0] && dateArray[0].map(date => {
    let dateForCustomize = new Date(date)
    let customizedDate = `${dateForCustomize.getDate()}-${dateForCustomize.getMonth()+1}-${dateForCustomize.getFullYear().toString().substr(-2)}`
    return customizedDate
  })
  const config = {
    title: {
      text: "Solar Employment Growth by Sector, 2010-2016"
    },

    subtitle: {
      text: "A demo of displaying a data table in Highcharts"
    },

    credits: {
      text: "Source: thesolarfoundation.com"
    },

    yAxis: {
      title: {
        text: "Numbers of Cases"
      }
    },

    xAxis: {
        type: 'datetime'
    },

    series: [
      {
        name: "Confirmed Cases",
        data: confirmedArray
      },
      {
        name: "Recovered Cases",
        data: recoveredArray
      },
      {
        name: "Deaths Cases",
        data: deathsArray
      },
    ],
  };
  return (
    <div 
        style={{
            width: "90%",
            height: "500px",
            margin: "auto",
        }}
    >
        <HighchartsReact
         options={config} 
         highcharts={Highcharts}
         />
    </div>
  )
}
