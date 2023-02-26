import React, { useEffect, useState, useContext } from 'react'
import Context from '../../Context/Context'
import { createSearchParams, NavLink, useNavigate } from 'react-router-dom'
export default function ShortURLsTable(){
    const {SignedIn, RequestResultHolder, ContextUsername, IsInAdminRole} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    const [username, setUsername] = ContextUsername
    const navigate = useNavigate()

    const [shortenerURLs, setShortenerURLs] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/api/ShortenerURL`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status === 200){
                response.json().then(data => {
                    setShortenerURLs(data)
                }).catch(e => {
                    setRequestResultHolder(e.message) 
                    navigate('/Error')
                })
            }
        }).catch(e => {
            setRequestResultHolder(e.message) 
            navigate('/Error')
        })
    }, [isSignedIn])
    
    const getProps = (item) => {
        let content = []
        let host = window.location.protocol + "//" + window.location.host
        
        for(const [key,value] of Object.entries(item)){
            if(key.toLowerCase().includes("url")){
                content.push(<td key={key}>{value}</td>)
            }
            else if(key.toLowerCase().includes("shortener")){
                content.push(
                <td>
                    <NavLink key={key} to={{pathname: '/Go', search: `?${createSearchParams([['to', `${value}`]])}`}}>
                        {`${host}/Go?to=${value}`}
                    </NavLink>
                </td>)
            }
        }      
        return content;
    }
    const getDeleteAction = (item) => {
        if(item['createdBy'] === username || isInAdminRole)
        {
            return <NavLink to='/Delete' className={'btn btn-danger'} state={{shortener: item}} key={item.id}>
                        Delete
                    </NavLink>           
        }
    }
    return(
        <>
            <div className={'table-responsive'}>
                <table className={'table table-bordered text-nowrap'}>
                    <thead>
                        <tr>
                            <th>
                                URL
                            </th>
                            <th>
                                Shortener URL
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shortenerURLs.map((shortenerURL, index) => {
                            return <tr key={shortenerURL.id}>
                                {getProps(shortenerURL)}
                                <td>
                                    <NavLink className={'btn btn-light'} to='/Details' state={{shortener: shortenerURL}}>
                                        Details
                                    </NavLink>
                                    {getDeleteAction(shortenerURL)}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                {isSignedIn ? (
                    <div className={'form-group'}>
                        <NavLink to='/Create' className={'btn btn-success'} >
                            Add new URL
                        </NavLink>
                    </div>
                ): (<></>)}
            </div> 
        </>
    )
}