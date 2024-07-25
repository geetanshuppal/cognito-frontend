import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AuthProvider, { AuthIsSignedIn, AuthIsNotSignedIn } from './contexts/authContext'
import SignIn from './routes/auth/signIn'
import SignUp from './routes/auth/signUp'
import VerifyCode from './routes/auth/verify'
import RequestCode from './routes/auth/requestCode'
import usersListPage from './routes/usersListPage'
import { UserProvider } from './contexts/userContext'

let lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
})
lightTheme = responsiveFontSizes(lightTheme)


const SignInRoute: React.FunctionComponent = () => (
  <Router>
    <Switch>
      <Route path="/usersList" component={usersListPage} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/verify" component={VerifyCode} />
      <Route path="/requestcode" component={RequestCode} />
      <Route path="/" component={SignIn} />
    </Switch>
  </Router>
)

 

const App: React.FunctionComponent = () => (
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <AuthProvider>
      <AuthIsNotSignedIn>
        <UserProvider>
        <SignInRoute />
        </UserProvider>
      </AuthIsNotSignedIn>
    </AuthProvider>
  </ThemeProvider>
)

export default App
