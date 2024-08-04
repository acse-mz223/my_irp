import "./Data.css"
import Spreadsheet from 'react-spreadsheet';


export function Data(props){
    return(
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">Row data table</div>
            <div className="data-box">
                <Spreadsheet data={props.data}/>
            </div>
        </div>
    )
}

// import React from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css'; // 核心样式
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // 主题样式

// export function Data(props) {
//   // 生成列定义
//   const generateColumnDefs = () => {
//     if (props.data.length > 0) {
//       return props.data[0].map((cell, index) => ({
//         headerName: `Column ${index + 1}`, 
//         field: `col${index}`,
//         width: 150,
//         resizable: true
//       }));
//     }
//     return [];
//   };

//   // 将数据转换成ag-Grid的格式
//   const rowData = props.data.slice(1).map((row) => {
//     let rowObject = {};
//     row.forEach((cell, index) => {
//       rowObject[`col${index}`] = cell.value;
//     });
//     return rowObject;
//   });

//   return (
//         <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
//             <div className="subpage-title">Row data table</div>
//             <div className="data-box">
//                 <AgGridReact
//                     columnDefs={generateColumnDefs()}
//                     rowData={rowData}
//                     domLayout='autoHeight' // 自动高度
//                     rowModelType='infinite' // 开启无限滚动模式
//                     pagination={true} // 启用分页
//                     paginationPageSize={100} // 每页显示100行
//                     cacheBlockSize={100} // 每次从服务器加载100行数据到缓存
//                     maxBlocksInCache={3} // 最多保持3个数据块在缓存中
//                 />
//             </div>
//         </div>

//   );
// }
