import React from 'react'
import { Navigate } from 'react-router'
import checkToken from '../../ultis/localstorage'

export default function PrivateRoute(props) {
    if(!checkToken()) {
        return <Navigate to={'/login'} />
    }
    return props.children
}
