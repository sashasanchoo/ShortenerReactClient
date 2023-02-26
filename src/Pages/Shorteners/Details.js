import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import Context from '../../Context/Context'
export default function ShortenerDetails(){
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const [shortener, setShortener] = useState({
        createdBy: "",
        createdDate: "",             
        url: "",        
        shortener: "",         
    })

    const {RequestResultHolder} = useContext(Context)
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder

    useEffect(() => {
        if(!state){
            return navigate('/')
        }
        fetch(`${process.env.REACT_APP_HOST}/api/ShortenerURL/${state.shortener.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if(response.status === 200){
                response.json().then(data => {
                    setShortener(data)
                }).catch(e => {
                    setRequestResultHolder(e.message) 
                    navigate('/Error')
                })
            }
        }).catch(e => {
            setRequestResultHolder(e.message) 
            navigate('/Error')
        })
    }, [])
    return(
        <>
        <dl className={'row'}>
            <dt className={'col-sm-2'}>Created by</dt>
            <dd className={'col-sm-10'}>{shortener.createdBy}</dd>
            <dt className={'col-sm-2'}>Created date</dt>
            <dd className={'col-sm-10'}>{new Date(shortener.createdDate).toLocaleDateString()}</dd>
            <dt className={'col-sm-2'}>URL</dt>
            <dd className={'col-sm-10'}>{shortener.url}</dd>
            <dt className={'col-sm-2'}>Shorneter</dt>
            <dd className={'col-sm-10'}>{shortener.shortener}</dd>
        </dl>
        <div>
            <NavLink className={'btn btn-secondary'} to='/'>
                Back to list
            </NavLink>
        </div>
        </>
    )
}