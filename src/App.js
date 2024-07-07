import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './App.css';
import { Header } from './header';
import { Nav } from './nav';
import {Data} from './Data';
import {Figure6} from './Figure6';
import {Figure7} from './Figure7';
import {Figure8} from './Figure8';
import {Figure9} from './Figure9';


function App() {
  // get data
  // set state
  const [data, setData] = useState([]);
  // fetch data
  useEffect(() => {
    fetch('./Capacity Estimates Data.xlsx')
      .then((res) => res.arrayBuffer())  //将响应体转换成 ArrayBuffer 对象，也用于处理二进制数据
      .then((ab) => {
        const workbook = XLSX.read(ab);  // read data
        const worksheetName = workbook.SheetNames[0]; // get sheet name 
        const worksheet = workbook.Sheets[worksheetName]; // get sheet content
        const json = XLSX.utils.sheet_to_json(worksheet, {header: 1}); // trans to json
        console.log(json)
        const formattedData = json.map(row => 
          row.map(cell => ({ value: cell ?? "" }))  //react-spreadsheet need data in form: [{value: X}, {value: Y}]
                                                    // [] means one row, {} means one cell
        );
        setData(formattedData);
      });
  }, []);
  
  return (
    <div>
      <Header />
      <div className='body'>
        <Nav />
        {/* <Data data={data}/> */}
        {/* <Figure6 data={data}/> */}
        {/* <Figure7 data={data}/> */}
        <Figure8 data={data}/>
        {/* <Figure9 data={data}/> */}


      </div>
    </div>
  );
}

export default App;
