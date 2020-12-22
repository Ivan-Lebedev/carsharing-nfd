import React from "react"
import "./LoginPage.scss"
import LogoIcon from "../../assets/icons/LogoIcon.svg"
import { Button } from "../common/Button/Button"
import { TextField } from "../common/AdminForms/AdminForms"
import { Form, Formik } from "formik"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { logIn } from "../../store/auth-reducer"
import * as Yup from "yup"
import Cookies from "js-cookie"

const initialValues = {
  username: "",
  password: "",
}

const validationSchema = Yup.object({
  username: Yup.string().required("Введите логин"),
  password: Yup.string().required("Введите пароль"),
})

const LoginPage = ({ logIn, isAuthInProgress, isAuthFailed }) => {
  const accessToken = Cookies.get("access_token")
  if (accessToken) {
    return <Redirect to="/admin/orders" />
  }

  const onLogInSubmit = (userData) => {
    logIn(userData)
  }

  return (
    <div className="login__wrapper">
      <div className="login">
        <div className="login__logo">
          <img src={LogoIcon} alt="Logo" className="logo__img" />
          <h1 className="logo__title">Need for drive</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onLogInSubmit}
        >
          {(formik) => {
            return (
              <Form className="login-form">
                <div className="login-form__title">Вход</div>
                {isAuthFailed && (
                  <span className="error-message">
                    Неверный логин или пароль
                  </span>
                )}
                <TextField
                  name="username"
                  title="Почта"
                  placeholder="admin@ss.com"
                  type="text"
                />
                <TextField
                  name="password"
                  title="Пароль"
                  placeholder="password"
                  type="password"
                />
                <div className="login-form__footer">
                  <div className="login-form__access">Запросить доступ</div>
                  <Button
                    type="submit"
                    additionalStyles="button__admin"
                    disabled={!formik.isValid}
                    isLoading={isAuthInProgress}
                  >
                    Войти
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthInProgress: state.auth.isAuthInProgress,
  isAuthFailed: state.auth.isAuthFailed,
})

export default connect(mapStateToProps, { logIn })(LoginPage)
