import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminDashboard from '../pages/manager/Dashboard'
import ManagerDashboard from '../pages/manager/Dashboard'

const ManagerRoutes =  [
  
    
      <Route key='manager-dashboard' path='/manager/dashboard' element={
        <ProtectedRoute allowedRoles={['Manager']}>
          <ManagerDashboard />
        </ProtectedRoute>
      } />
     
    
  
    ]

export default ManagerRoutes