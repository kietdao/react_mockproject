import React from 'react'
import { Navigate } from 'react-router'
import checkToken from '../../ultis/localstorage'

export default function AuthRoute(props) {
    if(checkToken()) {
        return <Navigate to={'/'} />
    }
    return props.children
}