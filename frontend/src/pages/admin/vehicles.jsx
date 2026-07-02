import {useState,useEffect} from 'react'
import API from '../../api/axios'
import AdminLayout from './AdminLayout'
import toast from 'react-hot-toast'
import swal from 'sweetalert2'
import LoadSpinner from '../../components/loadspinner'


const Vehicle =  () =>{
      const [editOriginalStatus,setEditOriginalStatus] = useState('')
      const [editId,setEditId] = useState(null)
      const [editMode,setEditMode] = useState(false)
      const [showForm,setShowForm] = useState(false)
      
      const [formData, setFormData] = useState({
       make: '',
       model:'',
       year: '',
       licensePlate:'',
       status:''
      })

      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
      }
      const [vehicles,setVehicles] = useState([])

      const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
         

          await API.post('/vehicles/create',{
            make: formData.make,
            model: formData.model,
            year: formData.year,
            licensePlate: formData.licensePlate,
            status: formData.status

           })
          toast.success('Vehicle Created Successfully')
           setShowForm(false)
           const response = await API.get('/vehicles')
           setVehicles(response.data)
          

        }catch(error){
            console.log(error.response?.data)
            toast.error('Error Creating Vehicle')
        }
      }

      const handleEdit = (vehicle) =>{
           
           setEditId(vehicle._id)
           setEditOriginalStatus(vehicle.status)
           setEditMode(true)
           setShowForm(true)
           setFormData({

          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          licensePlate: vehicle.licensePlate,
          status: vehicle.status


           })

         

      }

      const handleUpdate = async(e) =>
      {
        e.preventDefault()
        if (formData.status !== editOriginalStatus){
            const confirm = toast('Vehicle status automatically changes when a trip is completed or cancelled. Only change manually in case of emergencies. Are you sure you want to continue?'
         ,{icon:'⚠️'});
            if(!confirm) return 
        }
        try{
            await API.put(`/vehicles/${editId}`,
               { make: formData.make,
                model: formData.model,
                year: formData.year,
                status: formData.status
            }

            )
            alert('Vehicle data updated successfully')
            setShowForm(false)
            setEditMode(false)
            const response = await API.get('/vehicles')
            setVehicles(response.data)
        }catch(error){
            console.log(error)
            toast.error('Error Updating the Vehicle')
        }
    }


      const handleDelete = async (id) =>{

         const result = await swal.fire({
                title: 'Are you sure?',
                text: 'Are you sure you want to delete this vehicle?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No',
                buttonsStyling: false,
                customClass: {
                confirmButton: "bg-red-600 text-white px-4 py-2 rounded mr-2",
                cancelButton: "bg-gray-500 text-white px-4 py-2 rounded",
                },
        
        
        
               })
       if(result.isConfirmed){
        try{
            await API.delete(`/vehicles/${id}`)
            setVehicles(vehicles.filter(vehicles => vehicles._id !== id))
        }catch(error){
         console.log(error)
         toast.error('Error Deleting the vehicle')
        }
        
       }
      }

      const resetFrom = () =>{
      setEditMode(false)
      setEditId(null)
      setFormData({

        make:'',
        model:'',
        year:'',
        
        licensePlate: '',
        status: ''
      })
      setShowForm(!showForm)
      }
      const [loading,setLoading] = useState(true)
      useEffect(() =>{

        const fetchVehicle = async () =>{
            try{
                const response = await API.get('/vehicles')
                setVehicles(response.data)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fetchVehicle()
    },[])
if (loading) return <LoadSpinner Layout='admin'/>
    return(
        <AdminLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Vehicles</h2>

            <button 
          onClick={resetFrom}
          className="bg-green-500 text-white px-4 py-2 rounded">
          Add Vehicle
            </button>
            {showForm && (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">{editMode ? 'Update Vehicle Data':'Create New Vehicle'}</h3>
        <input type="text" name="make" placeholder="Make" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="model" placeholder="Model" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="licensePlate" placeholder="License Plate" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="year" placeholder="Model Year" onChange={handleChange} className="border p-2 rounded w-full mb-3" />

        <select name="status" onChange={handleChange} className="border p-2 rounded w-full mb-3">
           <option value="">Select Status</option>
           <option value="Active">Active</option>
           <option value="On trip">On Trip</option>
           <option value="In Maintenance">In Maintenance</option>
            <option value="Retired">Retired</option>
        </select>        
        <button onClick={editMode ? handleUpdate : handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">{editMode ? 'Update Vehicle':'Create Vehicle'}</button>
       
    </div>
)}
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Make</th>
                        <th className="p-3 text-left">Model</th>
                        <th className="p-3 text-left">Model Year</th>
                        <th className="p-3 text-left">License Plate</th>
                        <th className="p-3 text-left">Actions</th>
                        <th className="p-3 text-left">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vehicles => (
                        <tr key={vehicles._id} className="border-b">
                            <td className="p-3">{vehicles.make}</td>
                            <td className="p-3">{vehicles.model}</td>
                            <td className="p-3">{vehicles.year}</td>
                             <td className="p-3">{vehicles.licensePlate}</td>
                            
                            <td className="p-3">
                                <button onClick={() => handleEdit(vehicles)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(vehicles._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                            <td className="p-3">
                               <span className={`px-2 py-1 rounded text-sm ${
                                 vehicles.status === 'Active' ? 'bg-green-100 text-green-800' :
                                 vehicles.status === 'On Trip' ? 'bg-blue-100 text-blue-800' :
                                            'bg-red-100 text-red-800'
                                 }`}>
                                 {vehicles.status}
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

export default Vehicle