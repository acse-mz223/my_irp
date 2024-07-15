import "./Figure7.css"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// 注册需要使用的 Chart.js 组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function statistic(data){  //each cell is stored as {value: cell}
    // header + data
    const headers = data[0].map(item => item.value);
    const dataRows = data.slice(1);
    // index
    const senarios = Array.from({length:12},(item,index)=>{ return (index + 1).toString()})
    const durations = ["30", "80"]
    const limitations = ["P","T"]
    // 计算每个limit下，每个年份下，每个senario下的求和
    const dataStatistic = {};
    durations.forEach((duration) =>{
        dataStatistic[duration]={}
        senarios.forEach((senario) =>{
            dataStatistic[duration][senario] = {}
            // get index 
            const storageIndex = headers.indexOf(senario + '_' + duration);
            // inital
            limitations.forEach((limitation) =>{
                dataStatistic[duration][senario][limitation] = 0
            })
            // update  -- now we have now which column we are gonna use. Now iterate the row
            dataRows.forEach((datarow) =>{
                //  && datarow[storageIndex+1].value === ("P" || "T")
                if (datarow[storageIndex+1] && (datarow[storageIndex+1].value === "P" || datarow[storageIndex+1].value === "T")){ // if limitation is valid
                    { if (datarow[storageIndex+1].value === 0) console.log(storageIndex)
                    if(datarow[storageIndex] && datarow[storageIndex].value !== "NaN")  // if storage is valid
                        dataStatistic[duration][senario][datarow[storageIndex+1].value] += datarow[storageIndex].value
                      }  
                }
            })
            // culculate the percent
            const total = dataStatistic[duration][senario]["T"] + dataStatistic[duration][senario]["P"] 
            dataStatistic[duration][senario]["T"] = dataStatistic[duration][senario]["T"]/total
            dataStatistic[duration][senario]["P"] = dataStatistic[duration][senario]["P"]/total  
        })
    })
    return {dataStatistic, senarios, limitations}
}

function prepareData(props){
    const labels = props.data.senarios
    const datasets = props.data.limitations.map((limitation) =>{
        return {
        label: limitation,
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
function ChartComponentFigure7(props){
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
                    text: 'Senario'
                }
            },
            y: { 
                stacked: true,
                title: {
                    display: true,
                    text: 'Persentage of Storage resource'
                  },
                max: 1, // 最大刻度
                min: 0,  // 最小刻度
                ticks: {
                    stepSize: 0.2, // 刻度间隔
                }, 
            },
        } 
    }

    const style = {
        width: "40vw"
    }

    return <Bar className="data-map" style={style} data={chartData} options={option} />;

}

export function Figure7(props){    // props => data
    // judge
    if (!props.data.length) return <div></div>
    // statistic
    const statisticData = statistic(props.data)
    return (
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">Figure7</div>
            <div className="data-map-box">
                <div>
                    <ChartComponentFigure7 data={statisticData} duration='30' />
                </div>
                <div>
                    <ChartComponentFigure7 data={statisticData} duration='80' />
                </div>
            </div>
        </div>
    )
}