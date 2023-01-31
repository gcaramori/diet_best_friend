import React, { createContext, useState, useEffect } from "react";

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
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [isAuthenticated, setAuth] = useState<boolean>(false)
    
    const grantAuthentication = (authData: IUserAuth) => {
        if(authData.token) {
            setAuth(true);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('user_auth') !== null) setAuth(true)
    }, [isAuthenticated]);

    return <AuthContext.Provider value={{ isAuthenticated, grantAuthentication }}>{ children }</AuthContext.Provider>
}

export default AuthProvider