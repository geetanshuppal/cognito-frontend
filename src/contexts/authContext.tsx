import React, { useState, useEffect, useContext } from 'react'

import * as cognito from '../libs/cognito'
import { signin, signup, verifyEmail } from '../services/apiService';

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

export interface IAuth {
  sessionInfo?: { username?: string; email?: string; sub?: string; accessToken?: string; refreshToken?: string }
  attrInfo?: any
  authStatus?: AuthStatus
  signInWithEmail?: any
  signUpWithEmail?: any
  signOut?: any
  verifyCode?: any
  getSession?: any
  sendCode?: any
  forgotPassword?: any
  changePassword?: any
  getAttributes?: any
  setAttribute?: any
}

const defaultState: IAuth = {
  sessionInfo: {},
  authStatus: AuthStatus.Loading,
}

export const AuthContext = React.createContext(defaultState)

export const AuthIsSignedIn: React.FunctionComponent = ({ children }) => {
  const { authStatus }: IAuth = useContext(AuthContext)

  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>
}

export const AuthIsNotSignedIn: React.FunctionComponent = ({ children }) => {
  const { authStatus }: IAuth = useContext(AuthContext)

  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>
}

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading)
  const [sessionInfo, setSessionInfo] = useState({})
  const [attrInfo, setAttrInfo] = useState([])

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const session: any = await getSession()
        setSessionInfo({
          accessToken: session.accessToken.jwtToken,
          refreshToken: session.refreshToken.token,
        })
        window.localStorage.setItem('accessToken', `${session.accessToken.jwtToken}`)
        window.localStorage.setItem('refreshToken', `${session.refreshToken.token}`)
        await setAttribute({ Name: 'website', Value: 'https://github.com/dbroadhurst/aws-cognito-react' })
        const attr: any = await getAttributes()
        setAttrInfo(attr)
        setAuthStatus(AuthStatus.SignedIn)
      } catch (err) {
        setAuthStatus(AuthStatus.SignedOut)
      }
    }
    setAuthStatus(AuthStatus.SignedOut)
    // getSessionInfo()
  }, [setAuthStatus, authStatus])

  if (authStatus === AuthStatus.Loading) {
    return null
  }

  async function signInWithEmail(email: string, password: string) {
    try {
      const res = await signin({email, password})
      console.log("signInResponse", res);
      window.localStorage.setItem('accessToken', `${res?.response?.token?.accessToken}`)
      window.localStorage.setItem('refreshToken', `${res?.response?.session?.refreshToken}`)
      setAuthStatus(AuthStatus.SignedIn)
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut)
      throw err
    }
  }

  async function signUpWithEmail(name: string, email: string, password: string) {
    try {
     const res =  await signup({name, email, password})
     return res;
    } catch (err) {
      throw err
    }
  }

  function signOut() {
    // cognito.signOut()
    setAuthStatus(AuthStatus.SignedOut)
  }

  async function verifyCode(email: string, codeEmailVerify: string) {
    try {
      await verifyEmail({email, codeEmailVerify})
      // code: "ExpiredCodeException",message: "Invalid code provided, please request a code again."name: "ExpiredCodeException"statusCode: 422
    } catch (err) {
      throw err
    }
  }

  async function getSession() {
    try {
      // const session = await cognito.getSession()
      return null
    } catch (err) {
      throw err
    }
  }

  async function getAttributes() {
    try {
      // const attr = await cognito.getAttributes()
      return null
    } catch (err) {
      throw err
    }
  }

  async function setAttribute(attr: any) {
    try {
      // const res = await cognito.setAttribute(attr)
      return null
    } catch (err) {
      throw err
    }
  }

  async function sendCode(username: string) {
    try {
      // await cognito.sendCode(username)
    } catch (err) {
      throw err
    }
  }

  async function forgotPassword(username: string, code: string, password: string) {
    try {
      // await cognito.forgotPassword(username, code, password)
    } catch (err) {
      throw err
    }
  }

  async function changePassword(oldPassword: string, newPassword: string) {
    try {
      // await cognito.changePassword(oldPassword, newPassword)
    } catch (err) {
      throw err
    }
  }

  const state: IAuth = {
    authStatus,
    sessionInfo,
    attrInfo,
    signUpWithEmail,
    signInWithEmail,
    // signOut,
    verifyCode,
    // getSession,
    // sendCode,
    // forgotPassword,
    // changePassword,
    // getAttributes,
    // setAttribute,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
