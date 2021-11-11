import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import NavbarView from './NavbarView';

import { AuthContext } from '../Context/AuthContext';

const HomeView = () => {
    let navigate = useNavigate();

    const { isAuth } = useContext(AuthContext)

    if(isAuth === false){
        navigate('/login')
    }
      
    return (
        <NavbarView>
        </NavbarView>
    )
}

export default HomeView
