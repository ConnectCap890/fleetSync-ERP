import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login  from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ManagerDashboard from "./pages/manager/Dashboard";
import DriverDashboard from "./pages/driver/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/admin/dashboard' element={
        
      <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
      }/>
      <Route path ='/manager/dashboard' element=
      {<ProtectedRoute allowedRoles={['Manager']}>

      <ManagerDashboard/>
      </ProtectedRoute>}/>
      <Route path ='/driver/dashboard' element={
       <ProtectedRoute allowedRoles={['Driver']}>
      <DriverDashboard/>
      </ProtectedRoute>
      }/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
