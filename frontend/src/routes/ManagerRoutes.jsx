import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import ManagerDashboard from '../pages/manager/Dashboard'
import  Vehicles from '../pages/manager/Vehicles'


const ManagerRoutes =  [
  
    
      <Route key='manager-dashboard' path='/manager/dashboard' element={
        <ProtectedRoute allowedRoles={['Manager']}>
          <ManagerDashboard />
        </ProtectedRoute>
      } />,

      <Route key='manager-vehicles' path='/manager/Vehicles' element={
        <ProtectedRoute allowedRoles={['Manager']}>
          <Vehicles />
        </ProtectedRoute>
      } />
     
    
  
    ]

export default ManagerRoutes