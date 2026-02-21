import React from 'react'
import { useState } from 'react';
import { createContext, useContext } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};