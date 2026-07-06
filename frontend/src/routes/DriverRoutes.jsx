import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import DriverDashboard from '../pages/driver/Dashboard'
import DriverProfile from '../pages/driver/DriverProfile'
import DriverTrips from '../../src/pages/driver/Trips'
import LiveMap from '../pages/driver/LiveMap'


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
      } />,
      <Route key='driver-trips' path='/drivers/trips' element={
        <ProtectedRoute allowedRoles={['Driver']}>
          <DriverTrips />
        </ProtectedRoute>
      } />,
      <Route key='driver-liveMap' path='/drivers/liveMap' element={
        <ProtectedRoute allowedRoles={['Driver']}>
          <LiveMap/>
        </ProtectedRoute>
      } />
     
    
  
    ]

export default DriverRoutes