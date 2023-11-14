import React from "react";
import ValidImage from "../images/image_valid.svg";
import InvalidImage from "../images/image_invalid.svg";

export function InfoTooltip({ isOpened, isValid, onClose }) {

  return (
    <div className={`popup ${isOpened ? "popup_active" : ""}`}>
      <div className="popup-form">
        <div className="popup-form__container">
          <img
            className="popup-form__image"
            src={isValid ? ValidImage : InvalidImage}
            alt={""}
          />
          <h2 className="popup-form__subtitle">
            {" "}
            {isValid ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}{" "}
          </h2>
        </div>
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
