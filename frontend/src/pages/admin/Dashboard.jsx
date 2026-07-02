import { useState,useEffect } from "react"
import API from "../../api/axios"
//import { useNavigate } from "react-router-dom"
//import {useAuth} from "../../context/AuthContext"
//import { Link } from "react-router-dom"
import AdminLayout from "./AdminLayout"
import LoadSpinner from "../../components/loadspinner"


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeTrips: 0,
    availableDrivers: 0,
    totalManagers: 0
  })
 const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [vehicles, trips, drivers, managers] = await Promise.all([
          API.get('/vehicles'),
          API.get('/trips'),
          API.get('/drivers'),
          API.get('/managers')
        ])
        //console.log('vehicles:', vehicles.data)

        setStats({
          totalVehicles: vehicles.data.length,
          vehiclesAvailable: vehicles.data.filter(v => v.status === 'Active').length,
          activeTrips: trips.data.filter(t => t.status === 'In Progress').length,
          availableDrivers: drivers.data.filter(d => d.status === 'available').length,
          totalManagers: managers.data.length
        })
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    fetchStats()
  }, [])
      
       
  // const {logout} = useAuth()
  // const navigate = useNavigate()
  //  const handleLogout = () =>{
  //   logout()
  //   navigate('/login')
  //  }     
      
  if (loading) return <LoadSpinner layout='admin'/>


  return (
    <AdminLayout>
    <div className="flex h-screen bg-gray-100">
      
      

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Vehicles</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalVehicles} <span>🚛</span></p>
            
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Available Vehicles</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.vehiclesAvailable} <span>🚛</span></p>
            
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Active Trips</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.activeTrips} <span>🗺️</span></p>
            
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Available Drivers</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.availableDrivers} <span>🚘</span></p>
            
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Managers</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalManagers} <span>👥</span></p>
            
          </div>
        </div>
      </div>

    </div>
  </AdminLayout>  
  )
}

export default AdminDashboard