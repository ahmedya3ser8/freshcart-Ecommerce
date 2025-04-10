import React from 'react'
import { Navigate } from 'react-router-dom';

export default function AuthRoute(props) {
  if (localStorage.getItem('user-token')) {
    return <Navigate to={'/'} />
  } else {
    return props.children;
  }
}
