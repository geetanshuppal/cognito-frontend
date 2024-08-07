import React, { useState, useContext } from 'react'

import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { useValidEmail, useValidPassword, useValidUsername } from '../../hooks/useAuthHooks'
import { Email, Password, Username } from '../../components/authComponents'

import { AuthContext } from '../../contexts/authContext'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
})

const SignUp: React.FunctionComponent<{}> = () => {
  const classes = useStyles()

  const { email, setEmail, emailIsValid } = useValidEmail('')
  const { password, setPassword, passwordIsValid } = useValidPassword('')
  const { username, setUsername, usernameIsValid } = useValidUsername('')
  const [error, setError] = useState('')
  const [created, setCreated] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    password: passwordConfirm,
    setPassword: setPasswordConfirm,
    passwordIsValid: passwordConfirmIsValid,
  } = useValidPassword('')

  const isValid =
    !emailIsValid ||
    email.length === 0 ||
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0 ||
    !passwordConfirmIsValid ||
    passwordConfirm.length === 0

  const history = useHistory()

  const authContext = useContext(AuthContext)

  const signInClicked = async () => {
    try {
      setLoading(true);
      const res = await authContext.signUpWithEmail(username, email, password)
      if(res.statusCode == 200){
        setCreated(true)
        setLoading(false);
        return;
      }
      setError(res?.response?.message || "something went wrong!!")
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const signUp = (
    <>
      <Box width="80%" m={1}>
        <Email emailIsValid={emailIsValid} setEmail={setEmail} />
      </Box>
      <Box width="80%" m={1}>
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
      </Box>
      <Box width="80%" m={1}>
        <Password label="Password" passwordIsValid={passwordIsValid} setPassword={setPassword} />
      </Box>
      <Box width="80%" m={1}>
        <Password label="Confirm Password" passwordIsValid={passwordConfirmIsValid} setPassword={setPasswordConfirm} />
      </Box>
      <Box mt={2}>
       
      </Box>
      <Box mt={2}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>

      {/* Buttons */}
      <Box mt={2}>
        <Grid container direction="row" justify="center">
          <Box m={1}>
            <Button onClick={() => history.goBack()} color="secondary" variant="contained">
              Cancel
            </Button>
          </Box>
          <Box m={1}>
            <Button disabled={isValid} color="primary" variant="contained" onClick={signInClicked}>
            {loading && <CircularProgress size={15} color="secondary" />} Sign Up
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  )

  const accountCreated = (
    <>
      <Typography  align="center" variant="h5">{`Created ${username} account`}</Typography>
      <Typography  align="center"  variant="h6">{`Verfiy Code sent to ${email}`}</Typography>

      <Box m={4}>
        <Button onClick={() => history.push('/verify')} color="primary" variant="contained">
          Verify Code
        </Button>
      </Box>
    </>
  )

  return (
    <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
      <Grid xs={11} sm={6} lg={4} container direction="row" justify="center" alignItems="center" item>
        <Paper style={{ width: '100%', padding: 16 }}>
          <Grid container direction="column" justify="center" alignItems="center">
            {/* Title */}
            <Box m={3}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Typography variant="h3">Sign Up</Typography>
              </Grid>
            </Box>

            {!created ? signUp : accountCreated}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SignUp
