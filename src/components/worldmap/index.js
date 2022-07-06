import { useSelector } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import map from "@highcharts/map-collection/custom/world.geo.json";
HighchartsMap(Highcharts);
export default function WorldMap() {
  const data = useSelector(state => state.countries?.countryList)
  const options = {
    chart: {
      borderWidth: 1,
    },
    title: {
      text: "Covid-19 World Map"
    },
    subtitle: {
      text: "Covid-19 Cases"
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
        name: 'Countries',
        color: '#ccc',
      }
      ,
      {
        type: "map",
        name: "Death Cases",
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
        name: "Recovered Cases",
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
        name: "Confirmed Cases",
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
      <h2>WorldMap</h2>
      <HighchartsReact
          options={options}
          constructorType={'mapChart'}
          highcharts={Highcharts}
      />
    </div>
  )
}
