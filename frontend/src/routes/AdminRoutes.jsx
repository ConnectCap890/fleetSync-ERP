import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminDashboard from '../pages/admin/Dashboard'
import Managers from '../pages/admin/Managers'

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
      } />
    
  
]

export default AdminRoutes