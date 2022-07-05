import { useSelector } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import map from "@highcharts/map-collection/custom/world.geo.json";
HighchartsMap(Highcharts);
export default function WorldMap() {
  const data = useSelector(state => state.countries?.countryList)
  const dataEnableFormat = JSON.parse(JSON.stringify(data))
  const formattedData = dataEnableFormat.map(country => {
    if(country.countryName === 'USA') {
      country.countryName = 'United States of America'
    } else if(country.countryName === 'UK') {
      country.countryName = 'United Kingdom'
    } else if(country.countryName === 'Libyan Arab Jamahiriya') {
      country.countryName = 'Libya'
    } else if(country.countryName === 'Congo') {
      country.countryName = 'Republic of Congo'
    } else if(country.countryName === `Côte d'Ivoire`) {
      country.countryName = 'Ivory Coast'
    } else if(country.countryName === 'DRC') {
      country.countryName = 'Democratic Republic of the Congo'
    } else if(country.countryName === 'Tanzania') {
      country.countryName = 'United Republic of Tanzania'
    } else if(country.countryName === 'N. Korea') {
      country.countryName = 'North Korea'
    } else if(country.countryName === 'S. Korea') {
      country.countryName = 'South Korea'
    } else if(country.countryName === `Lao People's Democratic Republic`) {
      country.countryName = 'Laos'
    }
    return country
  })
  const options = {
    chart: {
      map: map,
      borderWidth: 1,
    },
    title: {
      text: "Covid-19 World Map"
    },
    subtitle: {
      text: "Cofirmed Cases"
    },
    legend: {
      enabled: false
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom"
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
        name: "Countries",
        color: "#E0E0E",
        enableMouseTracking: false,
      },
      {
        type: "map",
        name: "Confirmed Cases",
        data: formattedData,
        joinBy: ['name','countryName'],
        tooltip: {
          pointFormat: `{point.properties.name}: {point.confirmed} people`
        }
      }
    ]
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
