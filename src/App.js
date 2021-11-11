import {BrowserRouter, Routes, Route } from 'react-router-dom';

//Context
import {AuthProvider} from './Context/AuthContext'

//Views Templates
import LoginView from './Pages/LoginView';
import HomeView from './Pages/HomeView';
import StatusView from './Pages/StatusView';
import TypeView from './Pages/TypeView';
import CaseView from './Pages/CaseView';
import UsersView from './Pages/UsersView';

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomeView />}>
            </Route>
            <Route path="/login" element={<LoginView />}>
            </Route>
            <Route path="/status" element={<StatusView />}>
            </Route>
            <Route path="/types" element={<TypeView />}>
            </Route>
            <Route path="/cases" element={<CaseView />}>
            </Route>
            <Route path="/users" element={<UsersView />}>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter> 
  );
}

export default App;