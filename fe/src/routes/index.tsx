import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoutes'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default Index
