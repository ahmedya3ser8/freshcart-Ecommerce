import { useEffect, useState } from 'react';
import { createContext}  from 'react'

export let UserContext = createContext();

export default function UserContextProvider(props) {
  let [userLogin, setUserLogin] = useState(null);
  useEffect(() => {
    if (localStorage.getItem('user-token')) {
      setUserLogin(localStorage.getItem('user-token'));
    } else {
      setUserLogin(null);
    }
  }, []);
  return <UserContext.Provider value={{userLogin, setUserLogin}}>
    {props.children}
  </UserContext.Provider>
}
