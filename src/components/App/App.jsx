import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import "./App.css"
import Main from '../Main/Main';
import Header from '../Header/Header';
import houses from "../../utils/houses.js"
import EntrancePopup from '../Popup/EntrancePopup/EntrancePopup.jsx';
import AppartPopup from '../Popup/AppartPopup/AppartPopup.jsx';

function App() {
  const [addedAppartments, setAddedAppartmanets] = useState(JSON.parse(localStorage.getItem('addedAppartments')) || [])
  const [isEntrancePopupOpen, setIsEntrancePopupOpen] = useState(false)
  const [isAppartPopupOpen, setIsAppartPopupOpen] = useState(false)
  const [selectedHouse, setSelectedHouse] = useState(null)
  const [selectedEntrance, setSelectedEntrance] = useState(null)

  function handleEntrancePopupOpen(houseNumber) {
    setIsEntrancePopupOpen(true)
    setSelectedHouse(houseNumber)
  }

  function handleAppartPopupOpen(entranceNumber) {
    setIsAppartPopupOpen(true)
    setSelectedEntrance(entranceNumber)
  }

  function handleEntrancePopupClose() {
    setIsEntrancePopupOpen(false)
    setSelectedHouse(null)
  }

  function handleAppartPopupClose() {
    setIsAppartPopupOpen(false)
    setSelectedEntrance(null)
  }

  function closeAllPopups() {
    setIsEntrancePopupOpen(false)
    setIsAppartPopupOpen(false)
    setSelectedEntrance(null)
    setSelectedHouse(null)
  }

  function handleAdd(selectedApparts) {
    const newEntry = {
      houseNumber: selectedHouse,
      entrance: selectedEntrance,
      apparts: selectedApparts
    };
    let existingData = JSON.parse(localStorage.getItem('addedAppartments')) || [];
    const isDuplicate = existingData.some(entry =>
      entry.houseNumber === newEntry.houseNumber &&
      entry.entrance === newEntry.entrance &&
      newEntry.apparts.some(appart => entry.apparts.includes(appart))
    );

    if (!isDuplicate) {
      existingData.unshift(newEntry);
      localStorage.setItem('addedAppartments', JSON.stringify(existingData));
      setAddedAppartmanets(existingData);
    }

    closeAllPopups();
  }

  function handleDelete(houseNumber) {
    const newAddedAppartments = addedAppartments.filter(item => item.houseNumber != houseNumber)
    localStorage.setItem('addedAppartments', JSON.stringify(newAddedAppartments));
    setAddedAppartmanets(newAddedAppartments)
  }

  return (
    <div className="body">
      <div className="page">
        <Routes>
          <Route exact path="/" element={
            <>
              <Header />
              <Main houses={houses} addedAppartments={addedAppartments} addPopupOpen={handleEntrancePopupOpen} deleteData={handleDelete} closeAll={closeAllPopups}/>
            </>
          } />
        </Routes>
        <EntrancePopup 
          isOpened={isEntrancePopupOpen}
          selectedHouse={selectedHouse}
          appartPopupOpen={handleAppartPopupOpen}
          closePopup={handleEntrancePopupClose}
        />
        <AppartPopup 
          isOpened={isAppartPopupOpen}
          list={houses[Number(selectedHouse) - 1]?.entrances[Number(selectedEntrance) - 1 ]?.appartments}
          closePopup={handleAppartPopupClose}
          add={handleAdd}
        />
      </div>
    </div>
	)
}

export default App;