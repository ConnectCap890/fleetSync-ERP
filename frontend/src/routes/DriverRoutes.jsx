import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import DriverDashboard from '../pages/driver/Dashboard'
import DriverProfile from '../pages/driver/DriverProfile'


const DriverRoutes =  [
   
    
      <Route key='driver-dashboard' path='/driver/dashboard' element={
        <ProtectedRoute allowedRoles={['Driver']}>
          <DriverDashboard />
        </ProtectedRoute>
      } />,
      <Route key='driver-profile' path='/drivers/profile' element={
        <ProtectedRoute allowedRoles={['Driver']}>
          <DriverProfile />
        </ProtectedRoute>
      } />
     
    
  
    ]

export default DriverRoutes