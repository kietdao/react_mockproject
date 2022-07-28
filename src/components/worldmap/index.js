import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import map from "@highcharts/map-collection/custom/world.geo.json";
import i18n from 'i18next'
HighchartsMap(Highcharts);
export default function WorldMap(props) {
  const [confirmedVisible, setConfirmedVisible] = useState(true)
  const [recoveredVisible, setRecoveredVisible] = useState(true)
  const [deathsVisible, setDeathsVisible] = useState(true)
  const data = useSelector(state => state.countries?.countryList)
  let resultData
  if(props?.iso3) {
    resultData = data?.filter(country => {
      return country.iso3 === props?.iso3
    })
  }
  const setDefaultVisibleLine = useMemo(() => {
    if(confirmedVisible === false && recoveredVisible === false && deathsVisible === false) {
      setRecoveredVisible(true)
    }
  }, [confirmedVisible, recoveredVisible, deathsVisible])
  const options = {
    chart: {
      borderWidth: 1,
      height: 500,
    },
    title: {
      text: `${i18n.t('mapChart')} ${resultData ? resultData[0].countryName : i18n.t('world')}`
    },
    subtitle: {
      text: i18n.t('mapChartSubt')
    },
    legend: {
      enabled: true
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "top"
      }
    },
    plotOptions: {
      map: {
        states: {
          hover: {
            color: 'yellow'
          },
          select: {
            color: 'yellow',
            dashStyle: 'dot'
          }
        }
      },
      series: {
        allowPointSelect: true,
        events: {
          legendItemClick: function() {
            setDefaultVisibleLine()
          }
        }
      }
    },
    series: [
      {
        name: i18n.t('recovered'),
        color: '#38a16e',
        data: resultData ? resultData : data,
        mapData: map,
        allAreas: resultData ? false : true,
        showInLegend: true,
        joinBy: ['iso-a3','iso3'],
        tooltip: {
          pointFormat: `{point.properties.name}: {point.recovered} people`
        },
        visible: recoveredVisible,
        events: {
          legendItemClick: function() {
            this.visible ? setRecoveredVisible(false) : setRecoveredVisible(true)
          }
        }
      },
      {
        name: i18n.t('confirmed'),
        color: '#e53e33',
        data: resultData ? resultData : data,
        mapData: map,
        allAreas: resultData ? false : true,
        showInLegend: true,
        joinBy: ['iso-a3','iso3'],
        tooltip: {
          pointFormat: `{point.properties.name}: {point.confirmed} people`
        },
        visible: confirmedVisible,
        events: {
          legendItemClick: function() {
            this.visible ? setConfirmedVisible(false) : setConfirmedVisible(true)
          }
        }
      },
      {
        name: i18n.t('deaths'),
        color: '#71809b',
        data: resultData ? resultData : data,
        mapData: map,
        allAreas: resultData ? false : true,
        showInLegend: true,
        joinBy: ['iso-a3','iso3'],
        tooltip: {
          pointFormat: `{point.properties.name}: {point.deaths} people`
        },
        visible: deathsVisible,
        events: {
          legendItemClick: function() {
            this.visible ? setDeathsVisible(false) : setDeathsVisible(true)
          }
        }
      }
    ],
  };
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
