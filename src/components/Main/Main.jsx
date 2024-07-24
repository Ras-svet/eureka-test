import React, { useState } from "react"
import './Main.css'
import Table from "../Table/Table"

function Main(props) {
  return (
    <main className="content">
      <section className="tables">
      {props.houses?.map(house => {
            return (
              <Table
                houseData={props.addedAppartments?.filter(apartment => apartment?.houseNumber == house.houseNumber)}
                key={house.houseNumber}
                houseNumber={house.houseNumber}
                addPopupOpen={props.addPopupOpen}
                closeAll={props.closeAll}
                deleteData={props.deleteData}
              />
            )
          })}
      </section>
    </main>
  )
}

export default Main