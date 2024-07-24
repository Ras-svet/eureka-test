import React from "react"

function TableHeader(props) {
  function handleOpenPopup() {
    props.addPopupOpen(props.houseNumber)
  }

  function handleDelete() {
    props.deleteData(props.houseNumber)
  }
  return (
    <div className="table__header">
      <h2 className="table__title">Дом {props.houseNumber}</h2>
      <div className="table__buttons">
        <button className="table__button table__button-delete" aria-label="Удалить" tabIndex="0" onClick={handleDelete}></button>
        <button className="table__button table__button-add" onClick={handleOpenPopup}></button>
      </div>
    </div>
  )
}

export default TableHeader