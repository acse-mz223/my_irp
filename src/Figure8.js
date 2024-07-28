import React, { useState, useEffect, useRef } from 'react';
import "./Figure8.css"
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Popup, Circle, useMap } from 'react-leaflet';
import { countryLocationData } from './countryLocationData';
import { KMLLayer, statistic } from "./Distribution"
import L from 'leaflet';



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
                    <div className='filter-input-name'>Country name:</div>
                    <select className='filter-input-selector' value={props.mapPara["country"]} onChange={(event) =>{
                            props.setMapParaFun("country",event);
                            props.setBasinLayerShow((preValue)=>{
                                return {
                                    ...preValue,
                                    "type": "filter"
                                }
                            })
                        }}>
                        <OptionComponent property="Majority Country" data={props.data} />
                    </select>
                </div>
                <div className="filter-input">
                    <div className='filter-input-name'>Scenario:</div>
                    <select className='filter-input-selector' value={props.mapPara["scenario"]} onChange={(event) =>{props.setMapParaFun("scenario",event)}}>
                        <OptionComponent property="Senarios" data={props.data}/>
                    </select>
                </div>
                <div className="filter-input">
                    <div className='filter-input-name'>Duration:</div>
                    <select className='filter-input-selector' value={props.mapPara["duration"]} onChange={(event) =>{props.setMapParaFun("duration",event)}}>
                        <OptionComponent property="Duration" data={props.data} />
                    </select>
                </div>
        </div>
    )
}

function DistributionMapButton(props){
    return <button className='distribution-map-button' onClick={() =>{
        props.setBasinLayerShow((preValue) =>{
            return {
                "layer": !preValue["layer"],
                "type": "button"
            }
        })
    }}>Basin layer</button>
}

function getPopUpInfo(header, dataRow, storageIndex){
    // info string 
    let infoString = []
    // info index
    const infoHeaders = ['Basin Name', 'Region', 'Attributing Countries', 'Majority Country', 'Location Latitude', 'Location Longitude', 'QGIS Poly Area (km^2)', 'Basin Size Label', 'Well Count']
    // get string 
    infoHeaders.forEach((infoHeader) =>{
        if (infoHeader === 'Basin Name')
            infoString.push(<h3>{dataRow[header.indexOf(infoHeader)].value}</h3>)
        else
            infoString.push(<div className='popup-info'><strong>{infoHeader}:</strong>{dataRow[header.indexOf(infoHeader)].value}</div>)
    })
    infoString.push(<div className='popup-info'><strong>Storage Capacity:</strong> {dataRow[storageIndex].value}</div>)
    
    return infoString
}

function Map(props) {  // <Map data={props.data} mapPara={mapPara}/>
    function circleClick(event){
        console.log("circle click!!")
        console.log("Circle pane:", event.target.getPane().className); 

    }
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
                    // get basic info to popup with 
                    const popUpInfo = getPopUpInfo(header, dataRow, storageIndex)

                    // circles push
                    circles.push(
                        <Circle 
                            center={[Number(dataRow[locationLatitudeIndex].value),Number(dataRow[locationLongitudeIndex].value)]} 
                            radius={Number(dataRow[storageIndex].value)*10000} // unit: meter
                            color= {dataRow[limitationIndex].value === "P"? "red" : "blue"}                          
                            fillColor={dataRow[limitationIndex].value === "P"? "red" : "blue"}                     
                            fillOpacity={0.5}  
                            eventHandlers={
                                {
                                    click: circleClick
                                }
                            }
                        >   
                            <Popup>{popUpInfo}</Popup>
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

    // calculate the boundary of map -- 定义地图的最大边界
    const corner1 = L.latLng(90, -180);
    const corner2 = L.latLng(-90, 180);
    const bounds = L.latLngBounds(corner1, corner2);

    // ref + initalmap
    const myMapRef = useRef(null)
    useEffect(() =>{
        if (myMapRef.current){
            myMapRef.current.invalidateSize();  // info map to redraw 
        }
    },[props.menuHidden])

    //center={SetCenter(props.mapPara)}
    return (
      <MapContainer 
        ref={myMapRef}
        center={[countryLocationData[props.mapPara.country]["latitude"], 
        countryLocationData[props.mapPara.country]["longitude"]]} 
        zoom={5} 
        maxBounds={bounds} 
        minZoom={2.2}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%'}}
      >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        {props.basinLayerShow["type"] === "filter"? <SetCenter mapPara={props.mapPara} />:""}
        {props.basinLayerShow["layer"] && <KMLLayer  dataBasinName={props.dataBasinName} />}
        {CircleComponent()} 
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

    // basin button state
    const [basinLayerShow, setBasinLayerShow] = useState({
        layer: true,
        type: "button"
    })

    // state change
    function setMapParaFun(property,event){
        setMapPara((preValue) =>{
            return {
                ...preValue,
                [property]: event.target.value
            }
        })
    }

    // get developed + history name
    let dataBasinName
    if (props.data.length){
        dataBasinName = statistic(props.data);
        console.log("dataBasinName:", dataBasinName)
    }

    if (!props.data.length) return <div></div>
    return (
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">Figure8</div>
            <div className="figure8-div">
                <OptionComponents data={props.data} setMapParaFun={setMapParaFun} mapPara={mapPara} setBasinLayerShow={setBasinLayerShow}/>
                <DistributionMapButton setBasinLayerShow={setBasinLayerShow} />
                <Map data={props.data} mapPara={mapPara} menuHidden={props.menuHidden} dataBasinName={dataBasinName} basinLayerShow={basinLayerShow}/>
                
            </div>
        </div>
    )
}