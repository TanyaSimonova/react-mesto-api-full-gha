import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";

export function AddPlacePopup({ isOpened, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleAddPlace(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpened]);

  return (
    <PopupWithForm
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="card-popup"
      title="Новое место"
      label="Создать"
      button="Создать"
    >
      <input
        className="popup-form__input popup-form__input_type_name"
        type="text"
        placeholder="Название"
        name="name"
        required=""
        minLength={2}
        maxLength={30}
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup-form__error popup-form__error_name" />
      <input
        className="popup-form__input popup-form__input_type_link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
        value={link}
        onChange={handleAddPlace}
      />
      <span className="popup-form__error popup-form__error_link" />
    </PopupWithForm>
  );
}
