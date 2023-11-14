import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";

export function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar-popup"
      title="Обновить аватар"
      label="сохранить"
      button="Coxpaнить"
    >
      <input
        className="popup-form__input popup-form__input_type_avatar"
        type="url"
        placeholder="Ссылка на картинку"
        id="avatar"
        name="avatar"
        required=""
        ref={inputRef}
      />
      <span className="popup-form__error popup-form__error_avatar" />
    </PopupWithForm>
  );
}
