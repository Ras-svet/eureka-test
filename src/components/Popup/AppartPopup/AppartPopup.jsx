import Popup from "../Popup";
import houses from '../../../utils/houses'
import React, { useEffect, useState } from "react";

function AppartPopup(props) {
  const [selectedApparts, setSelectedApparts] = useState([])

  function selectApparts(appartNumber) {
    setSelectedApparts(prevState => [...prevState, appartNumber])
  }

  function deleteSelection(appartNumber) {
    const newSelectedApparts = selectedApparts.filter(item => item != appartNumber)
    setSelectedApparts(newSelectedApparts)
  }

  function handleAdd() {
    props.add(selectedApparts)
  }

  useEffect(() => {
    setSelectedApparts([])
  }, [props.isOpened])

  return (
    <Popup isOpened={props.isOpened} add={handleAdd} closePopup={props.closePopup} popupName={"Номер квартиры"} popupList={props.list} select={selectApparts} deleteSelection={deleteSelection} selected={selectedApparts}/>
  )
}

export default AppartPopup