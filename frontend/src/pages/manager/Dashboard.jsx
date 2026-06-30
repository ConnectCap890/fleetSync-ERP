import { useState,useEffect } from "react"
import API from "../../api/axios"
//import { useNavigate } from "react-router-dom"
//import {useAuth} from "../../context/AuthContext"
//import { Link } from "react-router-dom"
import ManagerLayout from "./ManagerLayout"


const ManagerDashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeTrips: 0,
    availableDrivers: 0,
   
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [vehicles, trips, drivers] = await Promise.all([
          API.get('/vehicles'),
          API.get('/trips'),
          API.get('/drivers'),
         
        ])
        //console.log('vehicles:', vehicles.data)

        setStats({
          totalVehicles: vehicles.data.length,
          vehiclesAvailable: vehicles.data.filter(v => v.status === 'Active').length,
          activeTrips: trips.data.filter(t => t.status === 'In Progress').length,
          availableDrivers: drivers.data.filter(d => d.status === 'available').length,
         
        })
      } catch (error) {
        console.log(error)
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
      


  return (
    <ManagerLayout>
    <div className="flex h-screen bg-gray-100">
      
      

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="group bg-white p-6 rounded-lg shadow hover:bg-red-700 transition-colors duration-300 ">
            <h3 className="text-gray-500 text-sm group-hover:text-white">Total Vehicles</h3>
            <p className="text-3xl font-bold text-gray-800 group-hover:text-white ">{stats.totalVehicles} <span>🚛</span></p>
            
          </div>

          <div className="group bg-white p-6 rounded-lg shadow hover:bg-red-700 transition-colors duration-300">
            <h3 className="text-gray-500 text-sm group-hover:text-white" >Available Vehicles</h3>
            <p className="text-3xl font-bold text-gray-800 group-hover:text-white ">{stats.vehiclesAvailable} <span>🚛</span></p>
            
          </div>
          <div className="group bg-white p-6 rounded-lg shadow hover:bg-red-700 transition-colors duration-300">
            <h3 className="text-gray-500 text-sm group-hover:text-white">Active Trips</h3>
            <p className="text-3xl font-bold text-gray-800 group-hover:text-white ">{stats.activeTrips} <span>🗺️</span></p>
            
          </div>
          <div className="group bg-white p-6 rounded-lg shadow hover:bg-red-700 transition-colors duration-300">
            <h3 className="text-gray-500 text-sm group-hover:text-white">Available Drivers</h3>
            <p className="text-3xl font-bold text-gray-800 group-hover:text-white ">{stats.availableDrivers} <span>🚘</span></p>
            
          </div>
         
        </div>
      </div>

    </div>
  </ManagerLayout>  
  )
}

export default ManagerDashboard