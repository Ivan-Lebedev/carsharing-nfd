import React, { useEffect } from 'react'
import './Finished.css'
import TotalContainer from '../Total/Total'
import { getOrderData } from '../../../store/order-selectors'
import { requestOrder } from '../../../store/order-reducer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'

const Finished = ({ orderData, requestOrder }) => {
  const { orderId } = useParams()

  useEffect(() => {
    requestOrder(orderId)
  }, [orderId, requestOrder])

  return (
    <div className='finished'>
      <div className='finished__title'>Ваш заказ подтверждён</div>
      <TotalContainer orderData={orderData} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    orderData: getOrderData(state),
  }
}

export default compose(
  connect(mapStateToProps, { requestOrder }),
  withRouter
)(Finished)
