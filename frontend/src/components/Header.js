import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = (userData) => {
  const location = useLocation();

  const isSignUp = location.pathname === "/signup";
  const isLogged = location.pathname === "/";

  function signOut() {
    localStorage.removeItem("token");
    userEmailInfo.value.email = "";
  }

  const userEmailInfo = Object.values(userData).map((value, key) => {
    return (
      <div className="header__span" key={key}>
        {value.email}
      </div>
    );
  });

  return (
    <header className="header">
      <div className="header__cover">
        <div className="header__logo" />
        {isLogged ? userEmailInfo : ""}

        {(() => {
          if (isLogged) {
            return (
              <Link className="header__button" onClick={signOut} to="/signin">
                Выйти
              </Link>
            );
          } else if (isSignUp) {
            return (
              <Link className="header__button" to="/signin">
                Войти
              </Link>
            );
          } else {
            return (
              <Link className="header__button" to="/signup">
                Регистрация
              </Link>
            );
          }
        })()}
      </div>
    </header>
  );
};

export default Header;
