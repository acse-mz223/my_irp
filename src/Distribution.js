import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./Distribution.css"
import L, { map } from 'leaflet';
import omnivore from 'leaflet-omnivore';

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

// get the basin name of different class
export function statistic(data){ 
    // dataBasinName
    const dataBasinName={
        "history": [],
        "developed": []
    }
    // header + data
    const headers = data[0].map(item => item.value);
    const dataRows = data.slice(1);
    // index
    const bainNameIndex = headers.indexOf("Basin Name")
    const historyIndex = headers.indexOf("Well Count")
    const developedIndex = headers.indexOf("Majority Country")
    const developedCountry = ["Canada", "USA", "Norway", "UK", "Australia","Netherlands", "China", "Denmark", "Germany", "Japan"]

    // 
    dataRows.forEach((datarow) =>{
        // history
        if (datarow[historyIndex] && datarow[historyIndex].value >= 100)
            dataBasinName["history"].push(datarow[bainNameIndex].value)
            
        // developed
        if (datarow[developedIndex] && developedCountry.includes(datarow[developedIndex].value))
            dataBasinName["developed"].push(datarow[bainNameIndex].value)
    })

    return dataBasinName
}

export function KMLLayer(props) {
    const map = useMap();

    useEffect(() => {
        const kmlLayer = omnivore.kml('/Global_Basins.kml');
        console.log("kml layer")
        console.log("KML Data:", kmlLayer.toGeoJSON());
        kmlLayer.on('ready', () => {
            kmlLayer.eachLayer((layer) => {
                // 设置图层样式
                let color;
                if (layer.feature && layer.feature.properties){
                    // set color
                    const basinName = layer.feature.properties['Basin Name'];
                    if (props.dataBasinName['developed'].includes(basinName) && props.dataBasinName['history'].includes(basinName)) {
                        color = 'red';
                    } else if (props.dataBasinName['developed'].includes(basinName)) {
                        color = 'green';

                    } else if (props.dataBasinName['history'].includes(basinName)) {
                        color = 'blue';
                    } else {
                        color = 'grey'; // 默认颜色
                    }
                    layer.setStyle({
                        color: color, // 边界颜色
                        weight: 1,        // 边界宽度
                        opacity: 0.65     // 边界透明度
                    });
                }

                // 添加点击事件
                layer.on('click', (e) => {
                    // 弹窗显示属性信息
                    if (layer.feature && layer.feature.properties) {
                        const props = layer.feature.properties;
                        let popupContent = '<div class="popup-content">';
                        popupContent += `<h3>${props['Basin Name']}</h3>`;
                        popupContent += `<p><strong>Basin Type:</strong> ${props['Basin Type']}</p>`;
                        popupContent += `<p><strong>Region:</strong> ${props['Region']}</p>`;
                        popupContent += `<p><strong>Longitude:</strong> ${props['Longitude']}</p>`;
                        popupContent += `<p><strong>Latitude:</strong> ${props['Latitude']}</p>`;
                        // 添加更多属性按需要展示
                        popupContent += '</div>';

                        L.popup().setLatLng(e.latlng).setContent(popupContent).openOn(map);
                    }
                });
                
                // hover event
                layer.on("mouseover", (e) =>{
                    layer.setStyle({
                        color: color, // 边界颜色
                        weight: 3,        // 边界宽度
                        opacity: 0.65     // 边界透明度
                    });
                })
                layer.on("mouseout", (e) =>{
                    layer.setStyle({
                        color: color, // 边界颜色
                        weight: 1,        // 边界宽度
                        opacity: 0.65     // 边界透明度
                    });
                })

            });
            

        });
        kmlLayer.addTo(map);

        return () => {
            map.removeLayer(kmlLayer);
        };

    }, [map]);

    return null;
}

function Legend(props){
    console.log("myMapRef:",props.myMapRef)
    function onHoverLabel(type,dataBasinName,myMapRef){
        
        myMapRef.current.eachLayer((layer) =>{
            if (layer.feature && layer.feature.properties){
                // set color
                let color,weight;
                const basinName = layer.feature.properties['Basin Name'];
                if (dataBasinName['developed'].includes(basinName) && props.dataBasinName['history'].includes(basinName)) {
                    color = 'red';
                    type === "both"? weight=3:weight=1; 
                } else if (dataBasinName['developed'].includes(basinName)) {
                    color = 'green';
                    type === "developed"? weight=3:weight=1; 
                } else if (dataBasinName['history'].includes(basinName)) {
                    color = 'blue';
                    type === "history"? weight=3:weight=1; 
                } else {
                    color = 'grey'; // 默认颜色
                    type === "none"? weight=3:weight=1; 
                }
                layer.setStyle({
                    color: color, // 边界颜色
                    weight: weight,        // 边界宽度
                    opacity: 0.65     // 边界透明度
                });
            }
        })
    }

    return (
        <ul className='legend-box'>
            <div className="legend-box-div" onMouseOver={()=>{onHoverLabel("history",props.dataBasinName,props.myMapRef)}} onMouseOut={()=>{onHoverLabel("null",props.dataBasinName,props.myMapRef)}}>
                <div className='mark mark1'></div>
                <label className='legend'>History</label>
            </div>
            <div className="legend-box-div" onMouseOver={()=>{onHoverLabel("developed",props.dataBasinName,props.myMapRef)}} onMouseOut={()=>{onHoverLabel("null",props.dataBasinName,props.myMapRef)}}>
                <div className='mark mark2' ></div>
                <label className='legend' >Developed</label>
            </div>
            <div className="legend-box-div" onMouseOver={()=>{onHoverLabel("both",props.dataBasinName,props.myMapRef)}} onMouseOut={()=>{onHoverLabel("null",props.dataBasinName,props.myMapRef)}}>
                <div className='mark mark3' ></div>
                <label className='legend' >Both</label>
            </div>
            <div className="legend-box-div" onMouseOver={()=>{onHoverLabel("none",props.dataBasinName,props.myMapRef)}} onMouseOut={()=>{onHoverLabel("null",props.dataBasinName,props.myMapRef)}}>
                <div className='mark mark4' ></div>
                <label className='legend' >None</label>
            </div>
        </ul>
    )
}

export function Distribution(props){
    // state
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

    // ref + initalmap
    const myMapRef = useRef(null)
    useEffect(() =>{
        if (myMapRef.current){
            myMapRef.current.invalidateSize();  // info map to redraw 
        }
    },[props.menuHidden])

    // map layer
    // get developed + history name
    let dataBasinName
    if (props.data.length){
        dataBasinName = statistic(props.data);
        console.log("dataBasinName:", dataBasinName)
    }
    
    if (!props.data.length) return <div></div>
    return (
        <div className={`subpage ${props.menuHidden && "subpage-full"}` }>
            <div className="subpage-title">Data distribution map</div>
            <div className='distribution'>
                <MapContainer center={[51.5074, -0.127758]} 
                ref={myMapRef}
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
                    {/* {geoData && <GeoJSON data={geoData} style={style}/>} */}
                    <KMLLayer  dataBasinName={dataBasinName}/>
                </MapContainer>
                <Legend  dataBasinName={dataBasinName} myMapRef={myMapRef}/>
            </div>
        </div>
      );
}