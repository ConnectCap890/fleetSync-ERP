import {useState,useEffect} from 'react'
import API from '../../api/axios'
import AdminLayout from './AdminLayout'


const Trips =  () =>{
      const [editId,setEditId] = useState(null)
      const [editMode,setEditMode] = useState(false)
      const [showForm,setShowForm] = useState(false)
      const [formData, setFormData] = useState({
        
        journey: '',
        driver: '',
        vehicle:'',
        schedule:'',
        status:'',
      })

      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
      }
      const [vehicles,setVehicles] = useState([])
      const [drivers,setDrivers] = useState([])
      const [journeys,setJourneys] = useState([])
      const [trips,setTrips] = useState([])

      const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
          

          await API.post('/trips/create',{
           journey : formData.journey,
           driver: formData.driver,
           vehicle: formData.vehicle,
           schedule: formData.schedule,
           status: formData.status

           })
           alert('Trip data Created Successfully')
           setShowForm(false)
           const response = await API.get('/trips')
           setTrips(response.data)
          

        }catch(error){
            console.log(error.response?.data)
            alert(error.response?.data?.message || 'Error Creating Trip')
        }
      }

      const handleEdit = (trips) =>{

           setEditId(trips._id)
           setEditMode(true)
           setShowForm(true)
           setFormData({

           journey : trips.journey._id,
           driver: trips.driver._id,
           vehicle: trips.vehicle._id,
           schedule: trips.schedule,
           status : trips.status

           })
         

      }

      const handleUpdate = async(e) =>
      {
        e.preventDefault()
        try{
            await API.put(`/trips/${editId}`,
               {  
                  journey : formData.journey,
                  driver: formData.driver,
                  vehicle: formData.vehicle,
                  schedule: formData.schedule,
                  status: formData.status

            }

            )
            alert('Trip data updated successfully')
            setShowForm(false)
            setEditMode(false)
            const response = await API.get('/trips')
            setTrips(response.data)
        }catch(error){
            console.log(error)
            alert('Error Updating the Trips')
        }
    }


      const handleDelete = async (id) =>{

       if(window.confirm('Are you sure want to Delete this Trip Data?')){
        try{
            await API.delete(`/trips/${id}`)
            setTrips(trips.filter(trips => trips._id !== id))
        }catch(error){
         console.log(error)
         alert('Error Deleting the Trip data')
        }
        
       }
      }

      const resetFrom = () =>{
      setEditMode(false)
      setEditId(null)
      setFormData({

       journey: '',
        driver: '',
        vehicle:'',
        schedule:'',
        status:'',
      })
      setShowForm(!showForm)
      }

      useEffect(() =>{

        const fetchTrip = async () =>{
            try{
                const [tripsRes,journeysRes,vehiclesRes,driversRes] = await Promise.all([
                 API.get('/trips'),
                 API.get('/journeys'),
                 API.get('/vehicles'),
                 API.get('/drivers')

                ])
            setTrips(tripsRes.data)
            setJourneys(journeysRes.data)
            setVehicles(vehiclesRes.data)
            setDrivers(driversRes.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchTrip()
    },[])

    return(
        <AdminLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Trips</h2>

            <button 
          onClick={resetFrom}
          className="bg-green-500 text-white px-4 py-2 rounded">
          Add Trip
            </button>
            {showForm && (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">{editMode ? 'Update Trip ':'Create New Trip'}</h3>
    <select name ="journey" onChange={handleChange} className="border p-2 rounded w-full mb-3">
        <option value="">Select Route</option>
            {journeys.map(j =>(<option key={j._id } value={j._id}>{j.from } →{j.to}
        </option>))}
    </select>

    <select name="vehicle" onChange={handleChange} className="border p-2 rounded w-full mb-3">
       <option value="">Select Vehicle</option>
             {vehicles.filter(v => v.status === 'Active').map(v => (
        <option key={v._id} value={v._id}>{v.make} {v.model} - {v.licensePlate}</option>
         ))}
    </select>
    <select  name="driver" onChange={handleChange} className="border p-2 rounded w-full mb-3">
           <option value="">Select Driver</option>
              {drivers.filter(d => d.status === 'available').map(d => (
           <option key={d._id} value={d._id}>{d.name}</option>
    ))}
    </select>
        <input type="date" name="schedule" onChange={handleChange} className="border p-2 rounded w-full mb-3"/>
    <select name='status' onChange={handleChange} className="border p-2 rounded w-full mb-3">
       <option value="">Select Status</option>
       <option value="Scheduled">Scheduled</option>
       <option value="In Progress">In Progress</option>
       <option value="Cancelled">Cancelled</option>
       <option value="Completed">Completed</option>


    </select>
        <button onClick={editMode ? handleUpdate : handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">{editMode ? 'Update Trip':'Create Trip'}</button>
       
    </div>
)}
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Route</th>
                        <th className="p-3 text-left">Vehicle</th>
                        <th className="p-3 text-left">Driver</th>
                        <th className="p-3 text-left">Schedule</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip_s => (
                        <tr key={trip_s._id} className="border-b">
                            <td className="p-3">{trip_s.journey?.from} → {trip_s.journey?.to}</td>
                            <td className="p-3">{trip_s.vehicle?.licensePlate}</td>
                            <td className="p-3">{trip_s.driver?.name}</td>
                            <td className="p-3">{new Date(trip_s.schedule).toLocaleDateString()}</td>
                            <td className="p-3">
                                <button onClick={() => handleEdit(trip_s)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(trip_s._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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
        </AdminLayout>
    )
}

export default Trips

    
    
            
        
      
    

