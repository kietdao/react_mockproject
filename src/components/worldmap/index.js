import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import map from "@highcharts/map-collection/custom/world.geo.json";
import i18n from 'i18next'
HighchartsMap(Highcharts);
export default function WorldMap(props) {
  const [confirmedVisible, setConfirmedVisible] = useState(false)
  const [recoveredVisible, setRecoveredVisible] = useState(true)
  const [deathsVisible, setDeathsVisible] = useState(false)
  const data = useSelector(state => state.countries?.countryList)
  useEffect(() => {
    setDefaultVisibleMap()
  }, [confirmedVisible, recoveredVisible, deathsVisible])
  let resultData
  if(props?.iso3) {
    resultData = data?.filter(country => {
      return country.iso3 === props?.iso3
    })
  }
  const dataToFormat = JSON.parse(JSON.stringify(data))
  const recoveredCases = dataToFormat.map(item => {
      return [item?.iso2?.toLowerCase(), item?.recovered]
  }) 
  const confirmedCases = dataToFormat.map(item => {
    return [item?.iso2?.toLowerCase(), item?.confirmed]
  })
  const deathsCases = dataToFormat.map(item => {
    return [item?.iso2?.toLowerCase(), item?.deaths]
  }) 
  const setDefaultVisibleMap = () => {
    if(confirmedVisible === false && recoveredVisible === false && deathsVisible === false) {
      setRecoveredVisible(true)
    }
  }
  const options = {
      chart: {
        map: map,
        borderWidth: 1,
        height: 500,
      },
      title: {
        text: `${i18n.t('mapChart')} ${resultData ? resultData[0].countryName : i18n.t('world')}`
      },
      subtitle: {
        text: i18n.t('mapChartSubt')
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox"
        }
      },
      legend: {
        verticalAlign: 'bottom',
        align: 'right',
      },
      colorAxis: [{
        min: 0,
        minColor: '#000',
        maxColor: '#38a16e',
        showInLegend: recoveredVisible ? true : false,
      },
      {
        min: 0,
        minColor: '#46130f',
        maxColor: '#e53e33',
        showInLegend: confirmedVisible ? true : false,
      },
      {
        min: 0,
        minColor: '#000',
        maxColor: '#71809b',
        showInLegend: deathsVisible ? true : false,
      }
    ],
      series: [
        {
          name: i18n.t('recovered'),
          color:'#38a16e',
          colorAxis: 0,
          showInLegend: true,
          states: {
            hover: {
              color: "yellow"
            }
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          },
          allAreas: false,
          data: recoveredCases,
          visible: recoveredVisible,
          events: {
            legendItemClick: function() {
              if(this.visible) {
                setRecoveredVisible(false)
              } else {
                setRecoveredVisible(true)
                setConfirmedVisible(false)
                setDeathsVisible(false)
              }
            }
          }
        },
        {
          name: i18n.t('confirmed'),
          color:'#e53e33',
          colorAxis: 1,
          showInLegend: true,
          states: {
            hover: {
              color: "yellow"
            }
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          },
          allAreas: false,
          data: confirmedCases,
          visible: confirmedVisible,
          events: {
            legendItemClick: function() {
              if(this.visible) {
                setConfirmedVisible(false)
              } else {
                setConfirmedVisible(true)
                setRecoveredVisible(false)
                setDeathsVisible(false)
              }
            }
          }
        },
        {
          name: i18n.t('deaths'),
          color:'#71809b',
          colorAxis: 2,
          showInLegend: true,
          states: {
            hover: {
              color: "yellow"
            }
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          },
          allAreas: false,
          data: deathsCases,
          visible: deathsVisible,
          events: {
            legendItemClick: function() {
              if(this.visible) {
                setDeathsVisible(false)
              } else {
                setDeathsVisible(true)
                setConfirmedVisible(false)
                setRecoveredVisible(false)
              }
            }
          }
        },
      ]
    }
  return (
    <div className='world_map'>
      <HighchartsReact
          options={options}
          constructorType={'mapChart'}
          highcharts={Highcharts}
      />
    </div>
  )
}
