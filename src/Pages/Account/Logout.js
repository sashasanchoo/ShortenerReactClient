import { useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../../Context/Context'
export default function Logout(){
    const {SignedIn, IsInAdminRole, ContextUsername} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole
    const [username, setUsername] = ContextUsername
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem(process.env.REACT_APP_JWT_KEY)
        localStorage.removeItem(process.env.REACT_APP_JWT_EXPIRATON) 
        setIsSignedIn(localStorage[process.env.REACT_APP_JWT_EXPIRATON] === undefined ? false : (Date.now() > Date.parse(localStorage[process.env.REACT_APP_JWT_EXPIRATON]) ? false : true))
        setIsInAdminRole(false)
        setUsername('')
        navigate('/')
    })
}