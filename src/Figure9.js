import "./Figure9.css"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// 注册需要使用的 Chart.js 组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function statistic(data){  
    const dataBasinName={
        history: [],
        developed: []
    }
    // header + data
    const headers = data[0].map(item => item.value);
    const dataRows = data.slice(1);
    // index 
    const senarios = Array.from({length:12},(item,index)=>{ return (index + 1).toString()})
    const durations = ["30", "80"]
    const categories = ["uniform","history","developed"] // all + well count + main country (condition)
    // index
    const historyIndex = headers.indexOf("Well Count")
    const developedIndex = headers.indexOf("Majority Country")
    const developedCountry = ["Canada", "USA", "Norway", "UK", "Australia","Netherlands", "China", "Denmark", "Germany", "Japan"]
    // 计算每个categories下，每个年份下，每个senario下的求和
    const dataStatistic = {};
    durations.forEach((duration) =>{
        dataStatistic[duration]={}
        senarios.forEach((senario) =>{
            dataStatistic[duration][senario] = {}
            // get index -- use to sum 
            const storageIndex = headers.indexOf(senario + '_' + duration); 
            // inital
            categories.forEach((category) =>{
                dataStatistic[duration][senario][category] = 0
            })
            // update  -- now we have now which column we are gonna use. Now iterate the row
            dataRows.forEach((datarow) =>{
                // judge wheather the sum value is valid
                if (datarow[storageIndex] && datarow[storageIndex].value !== "NaN"){
                    // uniform
                    dataStatistic[duration][senario]["uniform"] += datarow[storageIndex].value
                    // history
                    if (datarow[historyIndex] && datarow[historyIndex].value >= 100)
                        dataStatistic[duration][senario]["history"] += datarow[storageIndex].value
                        
                    // developed
                    if (datarow[developedIndex] && developedCountry.includes(datarow[developedIndex].value))
                        dataStatistic[duration][senario]["developed"] += datarow[storageIndex].value
                }
            })
        })
    })
    return {dataStatistic, senarios, categories}
}



function prepareData(props){
    const labels = props.data.senarios
    const datasets = props.data.categories.map((category) =>{
        return {
        label: category,
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
function ChartComponentFigure9(props){
    // prepare date for chart
    const chartData = prepareData(props)
    // return
    const option = { 
        responsive: true,
        maintainAspectRatio: false,  // 防止保持原始宽高比
        scales: { 
            x: { 
                stacked: false,
                title: {
                    display: true,
                    text: 'Senario'
                }
            },
            y: { 
                stacked: false,
                title: {
                    display: true,
                    text: 'Storage Capacity'
                },

            }, 
        },
    } 


    const style = {
        width: "40vw"
    }

    return <Bar className="data-map" style={style} data={chartData} options={option} />;

}

export function Figure9(props){    // props => data
    // judge
    if (!props.data.length) return <div></div>
    // statistic
    const statisticData = statistic(props.data)
    console.log(statisticData)
    return (
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">Figure9</div>
            <div className="data-map-box">
                <div>
                    <ChartComponentFigure9 data={statisticData} duration='30' />
                </div>
                <div>
                    <ChartComponentFigure9 data={statisticData} duration='80' />
                </div>
            </div>
        </div>
    )
}