import Popup from "../Popup";
import houses from '../../../utils/houses'
import React, { useState, useEffect } from "react";

function EntrancePopup(props) {
  const list = houses[Number(props.selectedHouse) - 1]?.entrances
  const [selectedEntrance, setSelectedEntrance] = useState(null)

  function selectEntrance(entranceNumber) {
    setSelectedEntrance(entranceNumber)
    props.appartPopupOpen(entranceNumber)
  }

  function deleteSelection() {
    setSelectedEntrance(null)
  }

  useEffect(() => {
    setSelectedEntrance(null)
  }, [props.isOpened])

  return (
    <Popup isOpened={props.isOpened} closePopup={props.closePopup} popupName={"Номер подъезда"} popupList={list} deleteSelection={deleteSelection} select={selectEntrance} selected={selectedEntrance}/>
  )
}

export default EntrancePopup