import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Account/Login';
import Register from './Account/Register';
import ShortURLsTable from './Shorteners/ShortURLsTable';
import ErrorHandler from './ErrorHandler'
import Logout from './Account/Logout';
import Redirect from '../Components/Redirect';
import DeleteConcreteShortenerURL from './Shorteners/Delete';
import CreateShortener from './Shorteners/Create';
import Details from './Shorteners/Details';
export default function RoutesProvider(){
    return(
        <>
            <Routes>
                <Route path='/' element={<ShortURLsTable/>}/>
                <Route path='/Account/Login' element={<Login/>}/>
                <Route path='/Account/Register' element={<Register/>}/>
                <Route path='/Account/Logout' element={<Logout/>}/>
                <Route path='/Error' element={<ErrorHandler/>}/>
                <Route path='/Go' element={<Redirect/>}/>
                <Route path='/Delete' element={<DeleteConcreteShortenerURL/>}/>
                <Route path='/Create' element={<CreateShortener/>}/>
                <Route path='/Details' element={<Details/>}/>
            </Routes>
        </>
    )
}