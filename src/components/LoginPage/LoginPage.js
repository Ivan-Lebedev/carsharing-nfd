import React from "react"
import "./LoginPage.scss"
import LogoIcon from "../../assets/icons/LogoIcon.svg"
import { Button } from "../common/Button/Button"
import { TextField } from "../common/Forms/Forms"

const LoginPage = () => {
  return (
    <div className="login__wrapper">
      <div className="login">
        <div className="login__logo">
          <img src={LogoIcon} alt="Logo" className="logo__img" />
          <h1 className="logo__title">Need for drive</h1>
        </div>
        <div className="login-form">
          <div className="login-form__title">Вход</div>
          <TextField title="Почта" placeholder="admin@ss.com" type="email" />
          <TextField title="Пароль" placeholder="password" type="password" />
          <div className="login-form__footer">
            <div className="login-form__access">Запросить доступ</div>
            <Button additionalStyles="button__admin">Войти</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
