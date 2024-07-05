import "./Figure8.css"

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

export function Figure8(props){ //props.data
    return (
        <div>
            <div className="filter-input">
                <div>
                    <div>Country name:</div>
                    <select>
                        <OptionComponent property="Majority Country" data={props.data}/>
                    </select>
                </div>
                <div>
                    <div>Scenario:</div>
                    <select>
                        <OptionComponent property="Senarios" data={props.data}/>
                    </select>
                </div>
                <div>
                    <div>Duration:</div>
                    <select>
                        <OptionComponent property="Duration" data={props.data}/>
                    </select>
                </div>
            </div>
        </div>
    )
}