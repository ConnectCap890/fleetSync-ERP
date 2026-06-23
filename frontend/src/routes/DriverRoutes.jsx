import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import DriverDashboard from '../pages/driver/Dashboard'


const DriverRoutes =  [
   
    
      <Route key='driver-dashboard' path='/driver/dashboard' element={
        <ProtectedRoute allowedRoles={['Driver']}>
          <DriverDashboard />
        </ProtectedRoute>
      } />
     
    
  
    ]

export default DriverRoutes