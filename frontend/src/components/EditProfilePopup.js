import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

export function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser, isOpened]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, description });
  }

  return (
    <PopupWithForm
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="profile-popup"
      title="Редактировать профиль"
      label="сохранить"
      button="Coxpaнить"
    >
      <input
        className="popup-form__input popup-form__input_type_name"
        type="text"
        placeholder="Имя"
        id="name"
        name="name"
        required=""
        minLength={2}
        maxLength={40}
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup-form__error popup-form__error_name" />
      <input
        className="popup-form__input popup-form__input_type_speciality"
        type="text"
        placeholder="О себе"
        id="speciality"
        name="speciality"
        required=""
        minLength={2}
        maxLength={200}
        value={description}
        onChange={handleChangeAbout}
      />
      <span className="popup-form__error popup-form__error_speciality" />
    </PopupWithForm>
  );
}
