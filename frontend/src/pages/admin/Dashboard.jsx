import { useState,useEffect } from "react"
import API from "../../api/axios"
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../context/AuthContext"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeTrips: 0,
    availableDrivers: 0,
    totalManagers: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [vehicles, trips, drivers, managers] = await Promise.all([
          API.get('/vehicles'),
          API.get('/trips'),
          API.get('/drivers'),
          API.get('/managers')
        ])

        setStats({
          totalVehicles: vehicles.data.length,
          activeTrips: trips.data.filter(t => t.status === 'In Progress').length,
          availableDrivers: drivers.data.filter(d => d.status === 'available').length,
          totalManagers: managers.data.length
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchStats()
  }, [])
      
       
  const {logout} = useAuth()
  const navigate = useNavigate()
   const handleLogout = () =>{
    logout()
    navigate('/login')
   }     
      


  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">FleetSync</h1>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
           <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Dashboard</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Users</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Managers</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Drivers</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Vehicles</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Journeys</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Trips</a></li>
          </ul>
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full bg-red-600 p-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Vehicles</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalVehicles}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Active Trips</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.activeTrips}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Available Drivers</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.availableDrivers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Managers</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalManagers}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard