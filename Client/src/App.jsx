
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import {Mainpage} from './components/mainpage'
import './App.css'
import { LoginPage } from './components/login'
import { Dashboard } from './components/dashboard'
import { Groups } from './components/Groups'
import { Signup } from './components/signup'

function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path="/" element={<Mainpage></Mainpage>}></Route>
    <Route path='/login' element={<LoginPage></LoginPage>}></Route>
    <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
    <Route path='/createGroup'element={<Groups></Groups>}></Route>
    </Routes>
  </BrowserRouter>
  </>
}
export default App
