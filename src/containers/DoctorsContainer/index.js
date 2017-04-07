import React, {
  Component,
  PropTypes
} from 'react'
import {
  firebaseConnect,
  dataToJS,
  isLoaded
} from 'react-redux-firebase'
import {
  connect
} from 'react-redux'
import {
  compose
} from 'redux'

import DoctorsList from '../../components/DoctorsList'

const selectBall = (ballId) => ({
  type: 'SELECT_BALL',
  payload: {
    ballId
  }
})

const objectToArray = object => object ? Object.keys(object).map(key => ({
  key,
  ...object[key]
})) : []

export default compose(
  firebaseConnect([
    '/doctors'
  ]),
  connect(
    ({ firebase }) => ({
      // Connect todos prop to firebase todos
      doctors: objectToArray(dataToJS(firebase, '/doctors')),
      loading: !isLoaded(dataToJS(firebase, '/doctors'))
    }),
    dispatch => ({
      onClickBall (ballId) {
        dispatch(selectBall(ballId))
      }
    })
  )
)(DoctorsList)
