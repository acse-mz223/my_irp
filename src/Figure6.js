import "./Figure6.css"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// 注册需要使用的 Chart.js 组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// statistic => dataStatistic[duration][senario][region]
function statistic(data){
    // header + data
    const headers = data[0].map(item => item.value);
    const dataRows = data.slice(1);
    // index
    const senarios = Array.from({length:12},(item,index)=>{ return (index + 1).toString()})
    const durations = ["30", "80"]
    const regionIndex = headers.indexOf("Region")
    // region statistic
    const regionSet = new Set();
    dataRows.forEach((item) =>{
        if (item[regionIndex]) regionSet.add(item[regionIndex].value)
    })
    const regions = Array.from(regionSet);
    // 计算每个region下，每个年份下，每个senario下的求和
    const dataStatistic = {};
    durations.forEach((duration) =>{
        dataStatistic[duration]={}
        senarios.forEach((senario) =>{
            dataStatistic[duration][senario] = {}
            // get index 
            const storageIndex = headers.indexOf(senario + '_' + duration);
            // inital
            regions.forEach((region) =>{
                dataStatistic[duration][senario][region] = 0
            })
            // update
            dataRows.forEach((datarow) =>{
                if (datarow[regionIndex]){
                    if(datarow[storageIndex])
                        if (datarow[storageIndex].value !== "NaN") dataStatistic[duration][senario][datarow[regionIndex].value] += datarow[storageIndex].value
                }
            })
        })
    })
    return {dataStatistic, senarios, regions}
}

function prepareData(props){
    const labels = props.data.senarios
    const datasets = props.data.regions.map((region) =>{
        return {
        label: region,
        data: [],
        backgroundColor: getRandomColor(),
      }
    })

    labels.forEach(scenario => {
        datasets.forEach(dataset => {
          dataset.data.push(props.data.dataStatistic[props.duration][scenario][dataset.label] || 0);
        });
      });

    return {
        labels: labels,
        datasets: datasets
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  }

// chart component
function ChartComponent(props){
    // prepare date for chart
    const chartData = prepareData(props)
    // return
    const option = { 
        responsive: true,
        maintainAspectRatio: false,  // 防止保持原始宽高比
        scales: { 
            x: { 
                stacked: true,
                title: {
                    display: true,
                    text: 'Scenario',
                    font: {
                        size: 20, // 图例文字大小
                    },
                  },
                ticks:{
                    font: {
                        size: 18, // 图例文字大小
                    },
                } 

            },
            y: { 
                stacked: true,
                title: {
                    display: true,
                    text: 'Storage capacity (Gt)',
                    font: {
                        size: 18, // 图例文字大小
                    },
                  },
                ticks:{
                    font: {
                        size: 18, // 图例文字大小
                    },
                }                  
            },
        },
        plugins: {
            legend: {  // 图例
                labels: {
                    color: 'black', // 图例文字颜色
                    font: {
                        size: 15, // 图例文字大小
                    },
                }
            }
        }, 
    }

    const style = {
        width: "40vw"
    }

    return <Bar className="data-map" style={style} data={chartData} options={option} />;

}

export function Figure6(props){
    // judge
    if (!props.data.length) return <div></div>
    // statistic
    const statisticData = statistic(props.data)
    // chart
    return(
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">Figure6</div>
            <div className="data-map-box">
                <div>
                    <ChartComponent data={statisticData} duration='30' />
                </div>
                <div>
                    <ChartComponent data={statisticData} duration='80' />
                </div>
            </div>
        </div>
    )
}