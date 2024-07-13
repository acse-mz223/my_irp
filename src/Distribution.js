import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./Distribution.css"
import L from 'leaflet';

// process data to GeoJSON data (GeometryCollection to FeatureCollection)
function prepareDataFun(data){
    // judge
    if (data === null) return null
    const preparedData = {
        type: 'FeatureCollection',
        features:[]
    }
    data.geometries.forEach((item,index) =>{
        preparedData.features.push(
            {
                type: "Feature",
                properties: {
                name: index
                },
                geometry: item
            }
        )
    })
    console.log("pre",preparedData)
    return preparedData
}

export function Distribution(){
    const [geoData, setGeoData] = useState(null);

    // fetch data
    useEffect(() => {
      fetch('./Global_Basins.json')
        .then(response => response.json())
        .then(data => prepareDataFun(data))
        .then(data => setGeoData(data));
    }, []);
    console.log("geo", geoData)

    // style
    const style={
        color: 'blue',
        weight: 1,
        fillColor: 'blue',
        fillOpacity: 0.5
    }

    // calculate the boundary of map -- 定义地图的最大边界
    const corner1 = L.latLng(90, -180);
    const corner2 = L.latLng(-90, 180);
    const bounds = L.latLngBounds(corner1, corner2);

    return (
        <div className="subpage">
            <div className="subpage-title">Data distribution map</div>
            <MapContainer center={[51.5074, -0.127758]} 
              zoom={5} 
              style={{ height: '100%', width: '100%' }}
              maxBounds={bounds} 
              minZoom={2.2}
              maxBoundsViscosity={1.0}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoData && <GeoJSON data={geoData} style={style}/>}
            </MapContainer>
        </div>
      );
}