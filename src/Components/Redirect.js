import { useEffect, useContext, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Context from '../Context/Context'
export default function Redirect(){
    const [searchParams, setSearchParams] = useSearchParams()
    const params = searchParams.get("to")
    const navigate = useNavigate()
    const {SignedIn, RequestResultHolder} = useContext(Context)
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    const [shortenerHolder, setShortenerHolder] = useState({
        shortener: params
    })

    useEffect(() => {
        console.log(params)
        fetch(`${process.env.REACT_APP_HOST}/api/ShortenerURL/UseShortenerUrl`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shortenerHolder)
        }).then(response => {
            if(response.status === 200){
                response.json().then(json => {
                    const URL = json['url']
                    window.location.href = URL
                }).catch(e => {
                    setRequestResultHolder(e.message)
                    navigate('/Error')
                })             
            }   
            else if(response.status !== 200){
                response.json().then(data => {
                    var errors = ""
                    for(const value of data){
                        errors = errors.concat(`${value}`)
                    }
                    setRequestResultHolder(errors) 
                    navigate('/Error')
                }).catch(e => {
                                    
                    setRequestResultHolder(e.message) 
                    navigate('/Error')
                })
            }      
        }).catch((e) => {
            setRequestResultHolder(e.message)
            navigate('/Error')
        })
    }, [])
}