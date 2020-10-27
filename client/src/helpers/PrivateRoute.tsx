// @ts-nocheck
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from './UserContext'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <UserContext.Consumer>
        {
            ({user}) => 
            <Route {...rest} render={props => {
                if(!user) {
                    // not logged in so redirect to login with return url
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                }
                // check if route is restricted by role
                // roles.indexOf(currentUser.role) === -1
                // if(roles && roles.some(role => currentUser.roles.findIndex(userRole => userRole.name===role) === -1)) {
                //     return <Redirect to={{ pathname: '/app/notauthorized'}} />
                // }

                // authorzied so return component
                return  <Component {...props} />
            }} />
            
        }
    </UserContext.Consumer>
)