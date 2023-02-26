import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Context from './Context';
export default function StateProvider({children}){
    const [isSignedIn, setIsSignedIn] = useState(Boolean(localStorage[process.env.REACT_APP_JWT_EXPIRATON] === undefined ? false : (Date.now() > Date.parse(localStorage[process.env.REACT_APP_JWT_EXPIRATON]) ? false : true)))
    const [username, setUsername] = useState()
    const [isInAdminRole, setIsInAdminRole] = useState(false)
    const [requestResultHolder, setRequestResultHolder] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if(isSignedIn){
          fetch(`${process.env.REACT_APP_HOST}/api/User/GetUsername`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            }}).then(response => 
                {   
                    if(response.status === 200){
                        response.json()
                        .then(json => {
                          setIsSignedIn(true)
                          setUsername(json['userName'])
                        })
                        .catch(e => {
                          setRequestResultHolder(e.message)
                          navigate('/Error')
                        })
                    }
                    else if(response.status !== 200){
                      setIsSignedIn(false)
                    }
                })           
                .catch(e => {
                  setRequestResultHolder(e.message)
                  navigate('/Error')
                })
        }
    
      }, [isSignedIn])
      return(
        <>
            <Context.Provider value={{SignedIn: [isSignedIn, setIsSignedIn], ContextUsername: [username, setUsername],
                IsInAdminRole: [isInAdminRole, setIsInAdminRole], RequestResultHolder: [requestResultHolder, setRequestResultHolder]}}>
                {children}
            </Context.Provider>
        </>
      )
}