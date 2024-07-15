import "./Data.css"
import Spreadsheet from 'react-spreadsheet';

function DataExcel(props){
    return (
        <Spreadsheet data={props.data} />
    );
  }

export function Data(props){
    return(
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">Row data table</div>
            <div className="data-box">
                <DataExcel data={props.data}/>
            </div>
        </div>
    )
}