import React from "react";
import './Table.css'
import TableHeader from "./TableHeader/TableHeader";
import TableData from "./TableData/TableData";

function Table(props) {
  return(
    <div className="table">
      <TableHeader 
        houseNumber={props.houseNumber}
        addPopupOpen={props.addPopupOpen}
        closeAll={props.closeAll}
        deleteData={props.deleteData}
        />
      <TableData houseData={props.houseData}/>
    </div>
  )
}

export default Table