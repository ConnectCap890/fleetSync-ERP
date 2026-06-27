import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminDashboard from '../pages/admin/Dashboard'
import Managers from '../pages/admin/Managers'
import Drivers from '../pages/admin/Driver'
import Vehicles from '../pages/admin/vehicles'
import Journey from '../pages/admin/Journey'
import Trips from '../pages/admin/Trips'

const AdminRoutes = [
  
    
      <Route key = 'admin-dashboard' path='/admin/dashboard' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />,
      <Route key = 'admin-managers' path='/admin/managers' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Managers />
          
        </ProtectedRoute>
      } />,
      <Route key = 'admin-drivers' path='/admin/drivers' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Drivers />
          
        </ProtectedRoute>
      } />,
      <Route key = 'admin-vehicles' path='/admin/vehicles' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Vehicles />
          
        </ProtectedRoute>
        
      } />,
      <Route key = 'admin-journeys' path='/admin/journeys' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Journey />
          
        </ProtectedRoute>
        
      } />,
      <Route key = 'admin-trips' path='/admin/trips' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Trips />
          
        </ProtectedRoute>
        
      } />
      
      
    
  
]

export default AdminRoutes