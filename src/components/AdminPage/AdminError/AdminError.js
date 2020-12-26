import React from "react"
import { Button } from "../../common/Button/Button"
import "./AdminError.scss"

const AdminError = () => {
  return (
    <div className="admin__error error">
      <div className="error__code">500</div>
      <div className="error__message">Что-то пошло не так</div>
      <div className="error__recommendation">
        Попробуйте перезагрузить страницу
      </div>
      <Button additionalStyles="button__admin">Назад</Button>
    </div>
  )
}

export default AdminError
