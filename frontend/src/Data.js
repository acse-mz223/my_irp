import "./Data.css"
import Spreadsheet from 'react-spreadsheet';
import { useRef, useState, useEffect } from "react";


export function Data(props){
    // load
    const [loadDone, loadDoneSet] = useState(false)
    useEffect(() =>{
        const timer = setTimeout(() => loadDoneSet(true), 2000); 
        return () => clearTimeout(timer); 
    },[])

    return(
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">Row data table</div>
            <div className="data-box" >
                <div className={`data-box-loader ${loadDone? "invisible":""}`} >
                    <svg width="500" height="300">
                        <text className="data-box-loader-text" x="50%" y="50%" text-anchor="middle" >
                            CO2 BLOCK
                        </text>
                    </svg>
                </div>
                <Spreadsheet data={props.data} />
            </div>
        </div>
    )
}

