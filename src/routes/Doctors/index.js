import { DOCTORS_PATH as path } from 'constants/paths'
import React from 'react'
export default (store) => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Doctors = require('../../containers/DoctorsContainer').default

      /*  Return getComponent   */
      cb(null, () => <Doctors minAge={12} />)

    /* Webpack named bundle   */
    }, 'Login')
  }
})
