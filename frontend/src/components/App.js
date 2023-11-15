import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { InfoTooltip } from "./InfoTooltip.js";
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipValid, setIsInfoTooltipValid] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [userData, setUserData] = useState({});
  const [cards, setCards] = useState([]);
  const [stateCards, setStateCards] = useState(false);
  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard ||
    isInfoTooltipOpen;
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(userData ?? "");
    handleTokenCheck();
  }, [loggedIn]);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setLoggedIn(localStorage.getItem("token"));
            setUserData(res.data);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => console.log(`Ошибка при проверке токена ${error}`));
    }
  };

  const handleRegister = (formValue) => {
    auth
      .register(formValue)
      .then((res) => {
        console.log(res)
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipValid(true);
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        console.log(`Ошибка при регистрации пользователя ${error}`);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (formValue) => {
    auth
      .authorize(formValue)
      .then((res) => {
        if (res.token) {
          setLoggedIn(localStorage.getItem("token"));
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(`Ошибка при авторизации пользователя ${error}`);
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipValid(false);
      });
   };

   useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getItems(), api.getUser()])
        .then(([cards, currentUser]) => {
          setCards(cards);
          setCurrentUser(currentUser);
        })
        .catch((error) =>
          console.log(
            `Ошибка при загрузке данных пользователя и карточек ${error}`,
          ),
        );
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.includes((currentUser._id))
    if (!isLiked) {
     api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c.id === card._id ? newCard : c)),
          );
          setStateCards(true);
        })
        .catch((error) => console.log(`Ошибка при добавлении лайка ${error}`));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c.id === card._id ? newCard : c))
          );
          setStateCards(true);
        })
        .catch((error) => console.log(`Ошибка при удалении лайка ${error}`));
    }
  }

  useEffect(() => {
    if ( stateCards === true ){
      api.getItems()
      .then((cards) => {
        setCards(cards);
        setStateCards(false);
      })
      .catch((error) =>
      console.log(
        `Ошибка отображения лайка карточке ${error}`,
      ));
    }
   }, [stateCards]);


  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(`Ошибка при удалении карточки ${error}`));
  }

  const handleUpdateUser = (currentUser) => {
    api
      .setUser(currentUser)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при редактировании данных профиля ${error}`),
      );
  };

  const handleUpdateAvatar = (currentUser) => {
    api
      .setUserAvatar(currentUser)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при редактировании фото профиля ${error}`),
      );
  };

  const handleAddPlace = (newCard) => {
    api
      .addItems(newCard)
      .then((newCard) => {
          setCards([newCard , ...cards]);
          setStateCards(true);
          closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при добавлении карточки ${error}`));
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={currentUser} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfilePopupOpen}
                  onAddPlace={handleAddPlacePopupOpen}
                  onEditAvatar={handleEditAvatarPopupOpen}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRouteElement>
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm
          isOpened={false}
          onClose={false}
          name="delete-popup"
          title="Вы уверены?"
          label="Да"
          button="Да"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpened={isInfoTooltipOpen}
          isValid={isInfoTooltipValid}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
