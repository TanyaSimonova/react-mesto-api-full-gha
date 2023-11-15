import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = ({ onRegister }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValue);
  }

  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <h2 className="sign-form__title">Регистрация</h2>
      <input
        className="sign-form__input"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={formValue.email}
        onChange={handleChange}
      />
      <input
        className="sign-form__input"
        name="password"
        type="password"
        placeholder="Пароль"
        required
        value={formValue.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        onSubmit={handleSubmit}
        className="sign-form__button"
      >
        Зарегистрироваться
      </button>
      <Link to="/signin" className="sign-form__link">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
};
