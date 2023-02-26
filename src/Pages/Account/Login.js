import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../Context/Context'
export default function Login(){
    const {SignedIn, RequestResultHolder} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    //Global error handling 
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    //Local error handling
    const [localRequestResultHolder, setLocalRequestResultHolder] = useState('')
    
    const [credentialsHolder, setCredentialsHolder] = useState({
        emailaddress: "",
        password: ""
    })

    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault()

        await fetch(
            `${process.env.REACT_APP_HOST}/api/User/SignIn`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsHolder)
        }).then(response => {
            if(response.status === 200){
                response.json().then(json => {
                    const JWTValue = `${json["token"]}`;
                    const JWTExpiration = `${json["expiration"]}`
                    localStorage.setItem(process.env.REACT_APP_JWT_KEY, JWTValue);                       
                    localStorage.setItem(process.env.REACT_APP_JWT_EXPIRATON, JWTExpiration)       
                    setIsSignedIn(localStorage[process.env.REACT_APP_JWT_EXPIRATON] === undefined ? false : (Date.now() > Date.parse(localStorage[process.env.REACT_APP_JWT_EXPIRATON]) ? false : true))            
                    navigate('/')
                })                  
            }
            if(response.status !== 200){
                response.text().then(data => {
                    throw new Error(data);
                }).catch(e => {
                    setLocalRequestResultHolder(`${e}`)
                });
            }
        }).catch((e) => {
            setRequestResultHolder(e.message)
            navigate('/Error')
        })
        }
    useEffect(() => {
        if(isSignedIn){
            return navigate('/')     
        }
    })
    return(
        <>
        <div className={'row'}>
            <div className={'col-md-4'}>
                <section>
                    <form onSubmit={submitHandler}>
                    <div className={'form-group'}>
                        <label className={'form-label'}>Email</label>
                        <input className={'form-control'} value={credentialsHolder.emailaddress}
                        autoComplete="email" onChange={e => {
                            setLocalRequestResultHolder('')
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            emailaddress: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className={'form-group'}>
                        <label className={'form-label'}>Password</label>
                        <input className={'form-control'} value={credentialsHolder.password} 
                        autoComplete="password" type='password' onChange={e => {
                            setLocalRequestResultHolder('')
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            password: e.target.value
                        }))}
                        }/>
                    </div>
                    <span className={'text-danger'}>{localRequestResultHolder}</span>              
                    <div>
                        <button type='submit' className={'w-100 btn btn-lg btn-primary'}>Login</button>
                    </div>
                    </form>               
                </section>              
            </div>
        </div>
        </>
    )
}