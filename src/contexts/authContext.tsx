import React, { useState, useEffect, useContext } from 'react'
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
  isAdmin?: any
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
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
  const [isAdmin, setIsAdmin] = useState('');


  useEffect(() => {
    setAuthStatus(AuthStatus.SignedOut)
  }, [setAuthStatus, authStatus])

  if (authStatus === AuthStatus.Loading) {
    return null
  }

  async function signInWithEmail(email: string, password: string) {
    try {
      const res = await signin({email, password})
      if(res.statusCode==200){
        window.localStorage.setItem('accessToken', `${res?.response?.token?.accessToken}`)
        window.localStorage.setItem('refreshToken', `${res?.response?.token?.refreshToken}`)
        const admin = res?.response?.scope.includes('Admins') ? 'true' :'';
        setIsAdmin(admin)
        setAuthStatus(AuthStatus.SignedIn)
      }
      return res;
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
    window.localStorage.setItem('accessToken', ``)
    window.localStorage.setItem('refreshToken', ``)
    // window.localSto/rage.setItem('isAdmin','');
    setIsAdmin('');
    setAuthStatus(AuthStatus.SignedOut)
    
  }

  async function verifyCode(email: string, codeEmailVerify: string) {
    try {
      const res = await verifyEmail({email, codeEmailVerify})
      return res;
    } catch (err) {
      throw err
    }
  }

  const state: IAuth = {
    authStatus,
    isAdmin,
    signUpWithEmail,
    signInWithEmail,
    verifyCode,
    signOut
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
