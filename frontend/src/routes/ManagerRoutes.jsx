import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import ManagerDashboard from '../pages/manager/Dashboard'
import  Vehicles from '../pages/manager/Vehicles'
import Drivers from '../pages/manager/Drivers'
import Cities from '../pages/manager/Cities'
import Trips from '../pages/manager/Trips'
import ManagerProifile from '../pages/manager/ManagerProfile'

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
      } />,
      <Route key='manager-drivers' path='/manager/Drivers' element={
        <ProtectedRoute allowedRoles={['Manager']}>
          <Drivers />
        </ProtectedRoute>
      } />,
       <Route key='manager-cities' path='/manager/cities' element={
        <ProtectedRoute allowedRoles={['Manager']}>
          <Cities />
        </ProtectedRoute>
      } />,
      <Route key='manager-trips' path='/manager/trips' element={
        <ProtectedRoute allowedRoles={['Manager']}>
          <Trips />
        </ProtectedRoute>
      } />,
       <Route key='manager-profile' path='/manager/profile' element={
        <ProtectedRoute allowedRoles={['Manager']}>
          <ManagerProifile />
        </ProtectedRoute>
      } />
     
    
  
    ]

export default ManagerRoutes
