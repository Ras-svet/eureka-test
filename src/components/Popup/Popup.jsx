import React, { useState, useEffect, useRef } from "react";
import './Popup.css';

function Popup(props) {
  const [activeIndex, setActiveIndex] = useState(null);
  const listRef = useRef([]);

  function closePopup() {
    props.closePopup();
  }

  function handleSelect(evt) {
    const id = evt.currentTarget.id;
    if (Array.isArray(props.selected)) {
      if (props.selected.includes(id)) {
        props.deleteSelection(id);
      } else {
        props.select(id);
      }
    } else {
      props.select(id);
    }
  }

  function handleKeyDown(evt) {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      setActiveIndex(prevIndex => {
        const newIndex = Math.min(prevIndex + 1, props.popupList.length - 1);
        return newIndex;
      });
    } else if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      setActiveIndex(prevIndex => {
        const newIndex = Math.max(prevIndex - 1, 0);
        return newIndex;
      });
    } else if (evt.key === 'Enter') {
      if (evt.ctrlKey) {
        if (props.popupName === 'Номер квартиры' && props.selected.length !== 0) {
          props.add();
        }
      } else {
        if (activeIndex !== null) {
          handleSelect({ currentTarget: listRef.current[activeIndex] });
        }
      }
    }
  }

  useEffect(() => {
    setActiveIndex(null);
  }, [props.isOpened]);

  useEffect(() => {
    if (activeIndex !== null) {
      listRef.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  return (
    <section
      className={`popup ${props.isOpened ? 'popup_opened' : ''}`}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={closePopup}></button>
        <h3 className="popup__title">{props.popupName}</h3>
        <ul className="popup__list">
          {props.popupList?.map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              ref={el => listRef.current[index] = el}
              className={`popup__item ${activeIndex === index ? 'popup__item-active' : ''} ${
                Array.isArray(props.selected)
                ? props.selected.includes(String(item.id)) 
                  ? 'popup__item-checked'
                  : ''
                : props.selected == item.id 
                  ? 'popup__item-checked' 
                  : ''}`}
              onClick={handleSelect}
              tabIndex="0"
            >
              {item.name}
            </li>
          ))}
        </ul>
        {props.popupName === 'Номер квартиры' && (
          <button
            onClick={props.add}
            className={`popup__add-button ${props.selected.length === 0 ? 'popup__add-button_disabled' : ''}`}
            disabled={props.selected.length === 0}
          >
            Добавить
          </button>
        )}
      </div>
    </section>
  );
}

export default Popup;
