import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

export default function Card ({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.includes((currentUser._id));
  const cardLikeButtonClassName = `element-list__icon ${
    isLiked && "element-list__icon_active"
  }`;

  const handleClick = (e) => {
    onCardClick(card);
  };

  const handleLikeClick = (e) => {
    onCardLike(card);
  };

  const handleDeleteClick = (e) => {
    onCardDelete(card);
  };

  return (
    <li className="element-list__item" key={card._id}>
      <img
        className="element-list__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <h2 className="element-list__title">{card.name}</h2>
      <button
        className={cardLikeButtonClassName}
        type="button"
        onClick={handleLikeClick}
      >
        <div className="element-list__score">{card.likes.length}</div>
      </button>
      {isOwn && (
        <button
          className="element-list__delete"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}
