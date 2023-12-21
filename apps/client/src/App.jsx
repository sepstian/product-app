import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkDataAccount } from './redux/slice/accountSlice'
import NotFound from './pages/PageNotFound'
import LoginPage from './pages/PageLogin/Login'
import ManageProduk from './pages/PageManageProduk'

function App() {
  const dispatch = useDispatch()
  const loginAccount = useSelector((state) => {
    return state.accountSlice
  })

  useEffect(() => {
    dispatch(checkDataAccount())

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
