import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginPartial from './LoginPartial'
export default function Navbar(){
    return(
        <>
        <nav className={'navbar navbar-expand-sm navbar-dark bg-dark'}>
                <div className={'container-fluid'}>
                    <div className={'navbar-collapse d-sm-inline-flex justify-content-between'}>
                        <ul className={'navbar-nav'}>
                            <li className={'nav-item'}>
                                <NavLink to='/' className={'navbar-brand text-white'}>
                                    Home
                                </NavLink>
                            </li>                                                                            
                        </ul>
                        <LoginPartial/>
                    </div>
                </div>
            </nav>          
        </>
    )
}