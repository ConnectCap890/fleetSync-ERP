import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login  from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ManagerDashboard from "./pages/manager/Dashboard";
import DriverDashboard from "./pages/driver/Dashboard";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path ='/manager/dashboard' element={<ManagerDashboard/>}/>
      <Route path ='/driver/dashboard' element={<DriverDashboard/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
