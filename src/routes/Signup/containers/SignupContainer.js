import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'

// Components
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { LIST_PATH } from 'constants/paths'
import SignupForm from '../components/SignupForm/SignupForm'

import classes from './SignupContainer.scss'

// redux/firebase

import { connect } from 'react-redux'
import { UserIsNotAuthenticated } from 'utils/router'

import { firebaseConnect, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, pathToJS } = helpers

@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
export default class Signup extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    authError: PropTypes.object
  }

  state = {
    snackCanOpen: false
  }

  handleSignup = (creds) => {
    this.setState({
      snackCanOpen: true
    })
    const { createUser, login } = this.props.firebase
    createUser(creds, { email: creds.email, username: creds.username })
      .then(() => {
        login(creds)
      })
  }

  providerLogin = (provider) => {
    this.setState({
      snackCanOpen: true
    })

    this.props.firebase
      .login({ provider, type: 'popup' })
      .then(account =>
        this.context.router.push(LIST_PATH)
      )
  }

  render () {
    const { authError } = this.props
    const { snackCanOpen } = this.state


    return (
      <div className={classes.container}>
        <Paper className={classes.panel}>
          <SignupForm onSubmit={this.handleSignup} />
        </Paper>
        <div className={classes.or}>
          or
        </div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.login}>
          <span className={classes['login-label']}>
            Already have an account?
          </span>
          <Link className={classes['login-link']} to='/login'>
            Login
          </Link>
        </div>
        {
          isLoaded(authError) && !isEmpty(authError) && snackCanOpen &&
            <Snackbar
              open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
              message={authError ? authError.message : 'Signup error'}
              action='close'
              autoHideDuration={3000}
              onRequestClose={() => this.setState({ snackCanOpen: false })}
            />
        }
      </div>
    )
  }
}
