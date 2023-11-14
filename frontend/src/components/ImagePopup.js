import React from "react";

function ImagePopup({ onClose, card }) {
  if (Object.keys(card).length === 0) {
    return null;
  }

  return (
    <div className="popup image-popup popup_active">
      <div className="popup-focus">
        <img className="popup-focus__image" alt={card.name} src={card.link} />
        <h3 className="popup-focus__subtitle">{card.name}</h3>
        <button
          className="close-button"
          type="button"
          form="popupFormElement"
          aria-label="закрыть"
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
