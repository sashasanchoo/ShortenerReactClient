import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../Context/Context';
import { NavLink } from 'react-router-dom';
export default function CreateShortener(){
    const {SignedIn, RequestResultHolder} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    //Global error handling 
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    //Local error handling
    const [localRequestResultHolder, setLocalRequestResultHolder] = useState('')

    const [urlHolder, setUrlHolder] = useState({
        URL: ""
    })
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()

        await fetch(
            `${process.env.REACT_APP_HOST}/api/ShortenerURL`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            },
            body: JSON.stringify(urlHolder)
        }).then(response => {
            if(response.status === 200){
                response.json().then(json => {
                    const shortener = `${json["shortener"]}`;
                    navigate('/')
                })                  
            }
            if(response.status !== 200){
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
        }).catch((e) => {
            setRequestResultHolder(e.message)
            navigate('/Error')
        })
        }
    useEffect(() => {
        if(!isSignedIn){
            return navigate('/Account/Login')     
        }
    })
    return(
        <>
        <div className={'row'}>
            <div className={'col-md-4'}>
                <section>
                    <form onSubmit={submitHandler}>
                    <div className={'form-group'}>
                        <label className={'form-label'}>URL</label>
                        <input className={'form-control'} value={urlHolder.URL}
                            onChange={e => {
                            setLocalRequestResultHolder('')
                            return setUrlHolder((prevState) => ({
                            ...prevState,
                            URL: e.target.value
                            }))
                        }}/>
                    </div>
                    <span className={'text-danger'}>{localRequestResultHolder}</span>              
                    <div className={'form-floating'}>
                        <button type='submit' className={'btn btn-success'}>Create shorter URL</button>
                        <NavLink className={'btn btn-secondary'} to='/'>
                            Back to list
                        </NavLink>
                    </div>
                    </form>               
                </section>              
            </div>
        </div>
        </>
    )
}