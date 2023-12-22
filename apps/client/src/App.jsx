import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkDataAccount } from './redux/slice/accountSlice'
import NotFound from './pages/PageNotFound'
import LoginPage from './pages/PageLogin/Login'
import ManageProduk from './pages/PageManageProduk'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginAccount = localStorage.getItem("tokenAccount")
  
  useEffect(() => {
    dispatch(checkDataAccount())
    if (loginAccount) {
      navigate("/manage-produk");
    } else if(!loginAccount){
      navigate("/")
      localStorage.removeItem("tokenAccount")
    }
  }, [])

  return (
    <>
    <Routes>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/manage-produk' element={<ManageProduk/>}/>
    </Routes>
    </>
  )
}

export default App
