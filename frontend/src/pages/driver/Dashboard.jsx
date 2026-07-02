import { useState,useEffect } from "react"
import API from "../../api/axios"
//import { useNavigate } from "react-router-dom"
//import {useAuth} from "../../context/AuthContext"
//import { Link } from "react-router-dom"
import DriverLayout from './DriverLayout'
import LoadSpinner from '../../components/loadspinner'

const DriverDashboard = () => {
  const [stats, setStats] = useState({
    
    activeTrips: 0,
    scheduledTrips: 0,
    completedTrips: 0


    
   
  })

  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [trips] = await Promise.all([
         
          API.get('/trips')
          
         
         
        ])
        

        setStats({
          
          activeTrips: trips.data.filter(t => t.status === 'In Progress').length,
          scheduledTrips: trips.data.filter(s => s.status === 'Scheduled').length,
          completedTrips: trips.data.filter(c => c.status === 'Completed').length
          
         
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
      
if (loading) return <LoadSpinner layout='driver'/>

  return (
    <DriverLayout>
    <div className="flex h-screen bg-gray-100">
      
      

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          

         
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Active Trip</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.activeTrips} <span>🗺️</span></p>
            
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm"> Scheduled Trips</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.scheduledTrips} <span>⏳</span></p>
            
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm"> Completed Trips</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.completedTrips} <span>🏁</span></p>
            
          </div>
          
         
        </div>
      </div>

    </div>
  </DriverLayout>  
  )
}

export default DriverDashboard