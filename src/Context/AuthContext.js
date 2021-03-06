import React, {useEffect, createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'


export const AuthContext = createContext() 

export const AuthProvider = (props) => {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({id: '', role: ''})
    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        const verifyTokenAuth = async () => {
            try {
                if(token){
                    const decoded = await jwt.verify(
                        token,
                        process.env.REACT_APP_SECRET_PRIVATE_KEY
                    )
                    setUserInfo({id: `${decoded.id}`, role:`${decoded.role}`})
                    setIsAuth(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        verifyTokenAuth();
    }, [token])


 
    const saveToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token)
    }

    const clearToken = () => {
        localStorage.clear();
        setIsAuth(false)
        setUserInfo({id: '', role:''})
        setToken(null)
        navigate("/login");
    }

    const data = {
        token,
        setToken,
        saveToken,
        clearToken,
        userInfo,
        setUserInfo,
        isAuth,
        setIsAuth,
    }

    return <AuthContext.Provider value={data}> {props.children}</AuthContext.Provider>
}   