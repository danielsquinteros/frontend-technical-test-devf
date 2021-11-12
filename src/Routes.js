import React,{ useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';

//Views Templates
import LoginView from './Pages/LoginView';
import StatusView from './Pages/StatusView';
import TypeView from './Pages/TypeView';
import CaseView from './Pages/CaseView';
import CaseViewUser from './Pages/CaseViewUser';
import UsersView from './Pages/UsersView';

import { AuthContext } from './Context/AuthContext';

function AllRoutes() {
    const { userInfo } = useContext(AuthContext)

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/cases" />}>
            </Route>

            <Route path="/login" element={<LoginView />}>
            </Route>

            <Route path="/cases" element={
                !(userInfo.role === 'ADMIN_ROLE') ? 
                (<CaseViewUser/>)
                :
                (<CaseView />)
            }>
            </Route>

            <Route path="/status" element=
                {
                    !(userInfo.role === 'ADMIN_ROLE') ? 
                    (<Navigate to="/cases" />)
                    :
                    (<StatusView />)
                }
            />

            <Route path="/users" element=
                {
                    !(userInfo.role === 'ADMIN_ROLE') ? 
                    (<Navigate to="/cases" />)
                    :
                    (<UsersView />)
                }
            />
            <Route path="/types" element=
                {
                    !(userInfo.role === 'ADMIN_ROLE') ? 
                    (<Navigate to="/cases" />)
                    :
                    (<TypeView />)
                }
            />

        </Routes>
    );
}

export default AllRoutes;