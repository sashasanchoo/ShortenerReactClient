import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
export default function DeleteConcreteShortenerURL(){
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location

    const [localRequestResultHolder, setLocalRequestResultHolder] = useState('')
    const errorHolderClassName = 'text-danger'
    useEffect(() => {
        if(!state){
            return navigate('/')
        }
    })
    const submit = async (e) => {
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_HOST}/api/ShortenerURL/${state.shortener.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            },
        }).then(response => {
            if(response.status === 204){
                navigate('/')
            }
            else if(response.status !== 204){
                response.json().then(data => {
                    var errors = ""
                    for(const value of data){
                        errors = errors.concat(`${value}`)
                    }               
                    setLocalRequestResultHolder(errors) 
                }).catch(e => {             
                    setLocalRequestResultHolder(e.message) 
                })

            }
        }).catch(e => {              
            setLocalRequestResultHolder(e.message) 
        })
    }
    return(
        <>
        <form onSubmit={submit}>
                <div className={'form-group'}>
                    <label className={'form-label'}>Are you sure you want to delete "{state.shortener.shortener}" shortener ?</label>
                </div>
                <span className={errorHolderClassName}>{localRequestResultHolder}</span>
                <div className={'form-floating'}>
                    <button className={'btn btn-danger'} type={'submit'}>Delete</button>
                    <NavLink className={'btn btn-secondary'} to='/'>
                        Back to list
                    </NavLink>
                </div>
            </form>
        </>
    )
    
}
