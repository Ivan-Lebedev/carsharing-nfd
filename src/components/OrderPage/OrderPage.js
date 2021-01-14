import React, { useState } from "react"
import "./OrderPage.css"
import Steps from "./Steps/Steps"
import Header from "../common/Header/Header"
import Location from "./Location/Location"
import Model from "./Model/Model"
import Addition from "./Addition/Addition"
import TotalContainer from "./Total/TotalContainer"
import Status from "./Status/Status"
import Finished from "./Finished/Finished"
import { useFormik } from "formik"
import { connect } from "react-redux"
import { getOrderId } from "../../store/order-selectors"
import SideBar from "../SideBar/SideBar"

const OrderPage = ({ isFinished, orderId }) => {
  const [stepDisabled, setStepDisabled] = useState({
    1: false,
    2: true,
    3: true,
    4: true,
  })

  const [step, setStep] = useState(1)

  const formik = useFormik({
    initialValues: {
      locationCity: "",
      locationPoint: "",
      modelFilter: "Все модели",
      model: "",
      color: "любой",
      dateFrom: "",
      dateTo: "",
      rate: "day",
      isFullTank: false,
      isNeedChildChair: false,
      isRightWheel: false,
    },
  })

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Location formik={formik} />
      case 2:
        return <Model formik={formik} />
      case 3:
        return <Addition formik={formik} />
      case 4:
        return <TotalContainer formData={formik.values} />
      default:
        return <Location formik={formik} />
    }
  }

  return (
    <>
      <SideBar />
      <div className="order-page">
        <div className="order-page__header">
          <Header />
        </div>
        <div className="order-page__steps">
          <Steps
            isFinished={isFinished}
            step={step}
            setStep={setStep}
            stepDisabled={stepDisabled}
            orderId={orderId}
          />
        </div>
        <div className="order">
          <div className="order__content-container">
            <div className="order__content">
              {isFinished ? <Finished /> : renderStep()}
            </div>
          </div>
          <div className="order__status-container">
            <div className="order__status">
              <Status
                isFinished={isFinished}
                step={step}
                setStep={setStep}
                stepDisabled={stepDisabled}
                setStepDisabled={setStepDisabled}
                formData={formik.values}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  orderId: getOrderId(state),
})

export default connect(mapStateToProps, {})(OrderPage)
