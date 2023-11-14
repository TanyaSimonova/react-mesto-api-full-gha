import React from "react";

export function PopupWithForm({ isOpened, onClose, onSubmit, ...props }) {
  return (
    <div
      className={`popup ${props.name} ${isOpened ? "popup_active" : ""}`}
      id={props.name}
    >
      <div className="popup-form">
        <form
          action="#"
          className="popup-form__container"
          method="post"
          noValidate=""
          name={props.name}
          onSubmit={onSubmit}
        >
          <h2 className="popup-form__title">{props.title}</h2>
          {props.children}
          <button
            className="submit-button"
            type="submit"
            aria-label={props.label}
            disabled=""
          >
            {props.button}
          </button>
        </form>
        <button
          className="close-button"
          type="button"
          aria-label="закрыть"
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
}
