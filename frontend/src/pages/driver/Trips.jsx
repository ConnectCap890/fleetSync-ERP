import {useState,useEffect} from 'react'
import API from '../../api/axios'
import DriverLayout from './DriverLayout'


const Trips =  () =>{
      const [editId,setEditId] = useState(null)
      //const [editMode,setEditMode] = useState(false)
      const [showForm,setShowForm] = useState(false)
      const [formData, setFormData] = useState({
        
        
        status:''
      })

      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
      }
    
      const [trips,setTrips] = useState([])

      

      const handleEdit = (trips) =>{

           setEditId(trips._id)
           //setEditMode(true)
           setShowForm(true)
           setFormData({

           
           status : trips.status

           })
         

      }

      const handleUpdate = async(e) =>
      {
        e.preventDefault()
        try{
            await API.put(`/trips/${editId}`,
               {  
                 
                  status: formData.status

            }

            )
            alert('Trip Status updated successfully')
            setShowForm(false)
            //setEditMode(false)
            const response = await API.get('/trips')
            setTrips(response.data)
        }catch(error){
            console.log(error)
            alert('Error Updating the Trips status')
        }
    }


      

    

      useEffect(() =>{

        const fetchTrip = async () =>{
            try{
                const response = await API.get('/trips')

                
            setTrips(response.data)
       
            }catch(error){
                console.log(error)
            }
        }
        fetchTrip()
    },[])

    return(
        <DriverLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Trips</h2>

           
            {showForm && (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">Update status</h3>
    

    
    
    <select name='status' onChange={handleChange} className="border p-2 rounded w-full mb-3">
       <option value="">Select Status</option>
       <option value="Scheduled">Scheduled</option>
       <option value="In Progress">In Progress</option>
       <option value="Cancelled">Cancelled</option>
       <option value="Completed">Completed</option>


    </select>
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update Status</button>
       
    </div>
)}
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Route</th>
                        <th className="p-3 text-left">Vehicle</th>
                        <th className="p-3 text-left">Driver</th>
                        <th className="p-3 text-left">Start Date</th>
                        <th className="p-3 text-left">End Date</th>
                        <th className="p-3 text-left">Update status</th>
                        <th className="p-3 text-left">Current Status</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip_s => (
                        <tr key={trip_s._id} className="border-b">
                            <td className="p-3">{trip_s.journey?.from} → {trip_s.journey?.to}</td>
                            <td className="p-3">{trip_s.vehicle?.licensePlate}</td>
                            <td className="p-3">{trip_s.driver?.name}</td>
                            <td className="p-3">{new Date(trip_s.startDateTime).toLocaleDateString()}</td>
                            <td className="p-3">{new Date(trip_s.endDateTime).toLocaleDateString()}</td>
                            <td className="p-3">
                                <button onClick={() => handleEdit(trip_s)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                            </td>
                            <td className="p-3">
                             <span className={`px-2 py-1 rounded text-sm ${
                                 trip_s.status === 'In Progress' ? 'bg-blue-100 text-green-800' :
                                 trip_s.status === 'Scheduled' ? 'bg-grey-100 text-blue-800' :
                                 trip_s.status === 'Completed' ? 'bg-green-100 text-blue-800':
                                 
                                            'bg-red-100 text-red-800'

                                 }`}>
                                 {trip_s.status}
                               </span>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </DriverLayout>
    )
}

export default Trips

    
    
            
        
      
    

