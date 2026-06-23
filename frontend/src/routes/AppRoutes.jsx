import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import AdminRoutes from './AdminRoutes'
import ManagerRoutes from './ManagerRoutes'
import DriverRoutes from './DriverRoutes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      {AdminRoutes}
      {ManagerRoutes}
      {DriverRoutes}
    </Routes>
  )
}

export default AppRoutes