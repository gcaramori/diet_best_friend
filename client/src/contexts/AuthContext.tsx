import React, { createContext, useState, useEffect } from "react";
import { setCookie, getCookie } from '../lib/utils'

export interface Props {
    children: React.ReactNode
}

export interface IUserAuth {
    email: string;
    token: string;
}

export type AuthContextType = {
    isAuthenticated: boolean | null;
    grantAuthentication: (userAuth: IUserAuth) => void;
    resetAuthentication: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const checkUserAuthCookie = () => {
        if(getCookie('user_auth') !== false) {
            const authCookie = JSON.parse(getCookie('user_auth').toString())

            if(authCookie?.email && authCookie?.token) return true
            else return false
        }
        else return false
    }
    
    const [isAuthenticated, setAuth] = useState<boolean>(() => checkUserAuthCookie())
    
    const grantAuthentication = (authData: IUserAuth) => {
        if(authData.email && authData.token) {
            setCookie('user_auth', JSON.stringify(authData), 1)
            setAuth(true);
        }
    }

    const resetAuthentication = () => {
        setAuth(false)
    }

    useEffect(() => {
        setAuth(checkUserAuthCookie())
    }, [isAuthenticated])

    return <AuthContext.Provider value={{ isAuthenticated, grantAuthentication, resetAuthentication }}>{ children }</AuthContext.Provider>
}

export default AuthProvider