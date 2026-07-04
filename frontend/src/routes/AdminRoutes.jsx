import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminDashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users';
import Managers from '../pages/admin/Managers'
import Drivers from '../pages/admin/Driver'
import Vehicles from '../pages/admin/vehicles'
import Cities from '../pages/admin/Cities'
import Trips from '../pages/admin/Trips'
import LiveMap from '../pages/admin/LiveMap';

const AdminRoutes = [
  
    
      <Route key = 'admin-dashboard' path='/admin/dashboard' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />,  <Route key = 'admin-users' path='/admin/users' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Users/>
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
      <Route key = 'admin-cities' path='/admin/cities' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Cities />
          
        </ProtectedRoute>
        
      } />,
      <Route key = 'admin-trips' path='/admin/trips' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Trips />
          
        </ProtectedRoute>
        
      } />,
      <Route key = 'admin-liveMap' path='/admin/map' element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <LiveMap />
          
        </ProtectedRoute>
        
      } />
      
      
    
  
]

export default AdminRoutes
