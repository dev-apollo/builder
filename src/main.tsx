import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './assets/css/index.css'
import App from './pages/App.tsx'
import Login from './pages/Login.tsx'
import Homepage from './pages/Homepage.tsx'
import Userpage from './pages/Userpage.tsx'
import ProtecaoRotas from './components/ProtecaoRotas.tsx'
import Cadastro from './pages/Cadastro.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/cadastro' element={<Cadastro/>}/>
      <Route path='/' element={
          <ProtecaoRotas>
              <App/>
          </ProtecaoRotas>
        }/>
      <Route path='/homepage' element={
          <ProtecaoRotas>
              <Homepage/>
          </ProtecaoRotas>
        }/>
      <Route path='/userpage' element={
          <ProtecaoRotas>
              <Userpage/>
          </ProtecaoRotas>
        }/>
    </Routes>
  </BrowserRouter>
)