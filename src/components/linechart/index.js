import { useState, useEffect, useCallback, useMemo } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import { useSelector } from 'react-redux';
import i18n from 'i18next'

export default function DataChart(props) {
  const [confirmedVisible, setConfirmedVisible] = useState(true)
  const [recoveredVisible, setRecoveredVisible] = useState(true)
  const [deathsVisible, setDeathsVisible] = useState(true)
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
  const setDefaultVisibleLine = useMemo(() => {
    if(confirmedVisible === false && recoveredVisible === false && deathsVisible === false) {
      setRecoveredVisible(true)
    }
  }, [confirmedVisible, recoveredVisible, deathsVisible])

  const config = {
    chart: {
      type: 'line',
      height: 500
    },
    title: {
      text: `${i18n.t('overviewChartOf')} ${props?.data?.country || i18n.t('allCountry')}`
    },
    subtitle: {
      text: i18n.t('overviewChartSubt')
    },
    plotOptions: {
      series: {
        events: {
          legendItemClick: function() {
            setDefaultVisibleLine()
          }
        }
      }
    },
    yAxis: {
      title: {
        text: i18n.t('numberOfCases')
      },
    },
    xAxis: {
      categories: dateCustomedArray
    },
    series: [
      {
        name: i18n.t('confirmed'),
        type: "line",
        color: "#e53e33",
        data: casesForChart,
        visible: confirmedVisible,
        events: {
          legendItemClick: function() {
            this.visible ? setConfirmedVisible(false) : setConfirmedVisible(true)
          }
        }
      },
      {
        name: i18n.t('recovered'),
        type: "line",
        color: "#38a16e",
        data: recoveredForChart,
        visible: recoveredVisible,
        events: {
          legendItemClick: function() {
            this.visible ? setRecoveredVisible(false) : setRecoveredVisible(true)
          }
        }
      },
      {
        name: i18n.t('deaths'),
        type: "line",
        color: "#71809b",
        data: deathsForChart,
        visible: deathsVisible,
        events: {
          legendItemClick: function() {
            this.visible ? setDeathsVisible(false) : setDeathsVisible(true)
          }
        }
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
