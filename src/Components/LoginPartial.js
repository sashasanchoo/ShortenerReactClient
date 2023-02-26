import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Context from '../Context/Context'

export default function LoginPartial(){
    const {SignedIn, ContextUsername, IsInAdminRole} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    const [username, setUsername] = ContextUsername
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole
    useEffect(() => {
        if(isSignedIn){
            fetch(
                `${process.env.REACT_APP_HOST}/api/Role/IsAdmin`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
                }
            }).then(response => {
                if(response.status === 200){
                    response.json().then(json => {
                        setIsInAdminRole(json)
                    }
                )
                }
                if(response.status !== 200){
                    response.text().then(data => {
                        throw new Error(data);
                    }).catch(e => {
                        //console.log(e)
                    })
                }
            }).catch(e => {
                //console.log(e)
            })
        }
        
    }, [isSignedIn])
    return(
        <>
            {isSignedIn === true ? (
                <ul className={'navbar-nav'}>
                    <li className={'nav-item'}>
                        <a className={'navbar-brand text-white'}>
                            Hello, {username}
                        </a>

                    </li>
                    <li className={'nav-item'}>
                        <NavLink to='/Account/logout' className={'navbar-brand text-white'}>
                            Logout
                        </NavLink>
                    </li>
                </ul>)
    : 
            (<ul className='navbar-nav'>
                <li className={'nav-item'}>
                    <NavLink to='/Account/Login' className={'navbar-brand text-white'}>
                        Login
                    </NavLink>
                </li>  
                <li className={'nav-item'}>
                    <NavLink to='/Account/Register' className={'navbar-brand text-white'}>
                        Register
                    </NavLink>
                </li> 
            </ul>)}
        </>
    )
}