import React, { useState } from "react";

export const Login = ({ onLogin }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue);
    setFormValue({ email: "", password: "" });
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <h2 className="sign-form__title">Вход</h2>
      <input
        className="sign-form__input"
        name="email"
        type="email"
        minLength={8}
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
      <button type="submit" className="sign-form__button">
        Войти
      </button>
    </form>
  );
};
