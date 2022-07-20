import { useSelector } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import map from "@highcharts/map-collection/custom/world.geo.json";
import i18n from 'i18next'
HighchartsMap(Highcharts);
export default function WorldMap() {
  const data = useSelector(state => state.countries?.countryList)
  const options = {
    chart: {
      borderWidth: 1,
      height: 500
    },
    title: {
      text: i18n.t('mapChart')
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
          }
        }
      }
    },
    series: [
      {
        type: "map",
        mapData: map,
        name: i18n.t('mapChart'),
        color: '#ccc',
      }
      ,
      {
        type: "map",
        name: i18n.t('deaths'),
        color: '#71809b',
        data: data,
        mapData: map,
        showInLegend: true,
        joinBy: ['iso-a3','iso3'],
        tooltip: {
          pointFormat: `{point.properties.name}: {point.deaths} people`
        }
      },
      {
        type: "map",
        name: i18n.t('recovered'),
        color: '#38a16e',
        data: data,
        mapData: map,
        showInLegend: true,
        joinBy: ['iso-a3','iso3'],
        tooltip: {
          pointFormat: `{point.properties.name}: {point.recovered} people`
        }
      },
      {
        type: "map",
        name: i18n.t('confirmed'),
        color: '#e53e33',
        data: data,
        mapData: map,
        showInLegend: true,
        joinBy: ['iso-a3','iso3'],
        tooltip: {
          pointFormat: `{point.properties.name}: {point.confirmed} people`
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
