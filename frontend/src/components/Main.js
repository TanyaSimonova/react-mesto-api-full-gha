import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = (card) => {
    onCardClick(card);
  };

  const handleCardLike = (card) => {
    onCardLike(card);
  };

  const handleCardDelete = (card) => {
    onCardDelete(card);
  };

  return (
    <>
      <main className="main">
        <section className="profile">
          <button
            type="button"
            className="profile__button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              alt={currentUser.name}
              src={currentUser.avatar}
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__speciality">{currentUser.about}</p>
            <button
              className="edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}
            >
              <span className="edit-button__icon" />
            </button>
          </div>
          <button
            className="add-button"
            type="button"
            aria-label="добавить карточку"
            onClick={onAddPlace}
          >
            <span className="add-button__icon" />
          </button>
        </section>
        <section className="elements">
          <ul className="element-list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;
