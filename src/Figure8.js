import React, { useState, useEffect } from 'react';
import "./Figure8.css"
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { countryLocationData } from './countryLocationData';


function OptionComponent(props){  //props.property => Majority Country / Senarios / Duration
    if (props.property === "Senarios")
        {
            const senarios = Array.from({length:12}, (item,index)=>{return (index+1).toString()})
            const select = senarios.map((item) =>{
                return <option value={item}>{item}</option>
            })
            return select
        }
    else if (props.property === "Duration"){
        return [<option value="30">30</option>,<option value="80">80</option>]
    }
    else {
        //data
        const headers = props.data[0].map(item => item.value);
        const dataRows = props.data.slice(1)
        // find out all the majority country
        const majorityCountrySet = new Set()
        const majorityCountryIndex = headers.indexOf("Majority Country")
        dataRows.forEach((item) =>{
            if (item[majorityCountryIndex]) majorityCountrySet.add(item[majorityCountryIndex].value)
        })
        const majorityCountry = Array.from(majorityCountrySet)
        // rerturn 
        const select = majorityCountry.map((item) =>{
            return <option value={item}>{item}</option>
        })
        return select
        
    }
}

function OptionComponents(props){
    return (
        <div className="filter-inputs">
                <div className="filter-input">
                    <div>Country name:</div>
                    <select value={props.mapPara["country"]} onChange={(event) =>{props.setMapParaFun("country",event)}}>
                        <OptionComponent property="Majority Country" data={props.data} />
                    </select>
                </div>
                <div className="filter-input">
                    <div>Scenario:</div>
                    <select value={props.mapPara["scenario"]} onChange={(event) =>{props.setMapParaFun("scenario",event)}}>
                        <OptionComponent property="Senarios" data={props.data}/>
                    </select>
                </div>
                <div className="filter-input">
                    <div>Duration:</div>
                    <select value={props.mapPara["duration"]} onChange={(event) =>{props.setMapParaFun("duration",event)}}>
                        <OptionComponent property="Duration" data={props.data} />
                    </select>
                </div>
        </div>
    )
}

function Map(props) {  // <Map data={props.data} mapPara={mapPara}/>
    // generate <Circle>
    function CircleComponent(){
        const circles = []
        // date preprepartion
        const header = props.data[0].map(item => item.value)
        const dataRows = props.data.slice(1)
        // index
        const nameIndex = header.indexOf("Basin Name")
        const locationLongitudeIndex = header.indexOf("Location Longitude")
        const locationLatitudeIndex = locationLongitudeIndex - 1
        const storageIndex = header.indexOf(props.mapPara.scenario + "_" + props.mapPara.duration)
        const limitationIndex = storageIndex + 1
        dataRows.forEach((dataRow)=>{
            // get data -- name, location, limitations, storage
            if (dataRow[storageIndex] && dataRow[storageIndex].value !== "NaN" && 
                dataRow[limitationIndex] && 
                (dataRow[limitationIndex].value === "P" || dataRow[limitationIndex].value === "T") &&
                dataRow[locationLatitudeIndex] && dataRow[locationLongitudeIndex] ){
                    circles.push(
                        <Circle 
                            center={[Number(dataRow[locationLatitudeIndex].value),Number(dataRow[locationLongitudeIndex].value)]} 
                            radius={Number(dataRow[storageIndex].value)*10000} // unit: meter
                            color= {dataRow[limitationIndex].value === "P"? "red" : "blue"}                          
                            fillColor={dataRow[limitationIndex].value === "P"? "red" : "blue"}                     
                            fillOpacity={0.5}  
                        >   
                            <Popup>{dataRow[nameIndex].value}</Popup>
                        </Circle>
                    )
                }
            
        })
        console.log(circles)
        return circles
    }

    function SetCenter(props){
        const countryName = props.mapPara.country
        console.log("center:",countryName)
        const map = useMap();
        map.setView([countryLocationData[countryName]["latitude"], countryLocationData[countryName]["longitude"]]);
    }

    //center={SetCenter(props.mapPara)}
    return (
      <MapContainer center={[countryLocationData[props.mapPara.country]["latitude"], countryLocationData[props.mapPara.country]["longitude"]]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {CircleComponent()} 
        <SetCenter mapPara={props.mapPara} />
      </MapContainer>
    );
  }


export function Figure8(props){ //props.data
    // state
    const [mapPara, setMapPara] = useState({
        country: "UK",
        scenario: "1",
        duration: "30"
    })
    console.log(mapPara)

    // state change
    function setMapParaFun(property,event){
        setMapPara((preValue) =>{
            return {
                ...preValue,
                [property]: event.target.value
            }
        })
    }


    if (!props.data.length) return <div></div>
    return (
        <div className="figure8-div">
            <OptionComponents data={props.data} setMapParaFun={setMapParaFun} mapPara={mapPara}/>
            <Map data={props.data} mapPara={mapPara}/>
        </div>
    )
}