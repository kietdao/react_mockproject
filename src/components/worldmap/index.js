import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import map from "@highcharts/map-collection/custom/world-highres.geo.json";
import axios from 'axios'
HighchartsMap(Highcharts);
export default function WorldMap() {
  const mapData = useSelector(state => state.countries?.countryList)
  console.log(mapData)
  const options = {
    chart: {
      borderWidth: 1,
      map: map
    },
  
    title: {
      text: "World population 2013 by country"
    },
  
    subtitle: {
      text: "Demo of Highcharts map with bubbles"
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
  
    series: [
      {
        name: "Countries",
        color: "#E0E0E0",
        enableMouseTracking: true
      },
      {
        type: "map",
        name: "Population 2016",
        joinBy: null,
        data: mapData,
        minSize: 5,
        maxSize: "50%",
        tooltip: {
          pointFormat: "{point.properties.name}: {point.confirmed} thousands"
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
