import {useState,useEffect} from 'react'
import API from '../../api/axios'
import AdminLayout from './AdminLayout'
import toast from 'react-hot-toast'
import swal from 'sweetalert2'

const Journey =  () =>{
      
      const [editId,setEditId] = useState(null)
      const [editMode,setEditMode] = useState(false)
      const [showForm,setShowForm] = useState(false)
      
      const [formData, setFormData] = useState({
       from: "",
       to: "",
       estimatedDistance: "",
       estimatedDuration:"",
       description:""
      })

      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
      }
      const [journey,setJourney] = useState([])

      const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
         

          await API.post('/journeys/create',{
           from: formData.from,
           to: formData.to,
           estimatedDistance: formData.estimatedDistance,
           estimatedDuration: formData.estimatedDuration,
           description: formData.description

           })
           toast.success('New Route Created Successfully')
           setShowForm(false)
           const response = await API.get('/journeys')
           setJourney(response.data)
          

        }catch(error){
            console.log(error.response?.data)
            toast.error('Error Creating New Route')
        }
      }

      const handleEdit = (journey) =>{
           
           setEditId(journey._id)
           
           setEditMode(true)
           setShowForm(true)
           setFormData({

           from: journey.from,
           to: journey.to,
           estimatedDistance: journey.estimatedDistance,
           estimatedDuration: journey.estimatedDuration,
           description: journey.description
         


           })

         

      }

      const handleUpdate = async(e) =>
      {
        e.preventDefault()
      
        try{
            await API.put(`/journeys/${editId}`,
            {   from: formData.from,
                to: formData.to,
                 estimatedDistance: formData.estimatedDistance,
                 estimatedDuration: formData.estimatedDuration,
                description: formData.description
            }

            )
            toast.success('Route data updated successfully')
            setShowForm(false)
            setEditMode(false)
            const response = await API.get('/journeys')
            setJourney(response.data)
        }catch(error){
            console.log(error)
            toast.error('Error Updating the Route')
        }
    }


      const handleDelete = async (id) =>{
         const result = await swal.fire({
                title: 'Are you sure?',
                text: 'Are you sure you want to delete this route?',
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
            await API.delete(`/journeys/${id}`)
            setJourney(journey.filter(journeys => journeys._id !== id))
        }catch(error){
         console.log(error)
         toast.error('Error Deleting the Route')
        }
        
       }
      }

      const resetFrom = () =>{
      setEditMode(false)
      setEditId(null)
      setFormData({

        to:'',
        from:'',
        estimatedDistance:'',
        estimatedDuration:'',
        description:''
      })
      setShowForm(!showForm)
      }

      useEffect(() =>{

        const fetchJourneys = async () =>{
            try{
                const response = await API.get('/journeys')
                setJourney(response.data)
            }catch(error){
                console.log(error)
                toast.error('Error Fetching the Routes')
            }
        }
        fetchJourneys()
    },[])

    return(
        <AdminLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Routes</h2>

            <button 
          onClick={resetFrom}
          className="bg-green-500 text-white px-4 py-2 rounded">
          Add Route
            </button>
            {showForm && (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">{editMode ? 'Update Route Data':'Create New Route'}</h3>
        <input type="text" name="from" placeholder="From" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="to" placeholder="To" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="estimatedDistance" placeholder="Estimated Distance" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="estimatedDuration" placeholder="Estimated Time" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} className="border p-2 rounded w-full mb-3" />

        
        <button onClick={editMode ? handleUpdate : handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">{editMode ? 'Update Vehicle':'Create Vehicle'}</button>
       
    </div>
)}
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">From</th>
                        <th className="p-3 text-left">To</th>
                        <th className="p-3 text-left">Estimated Distance</th>
                        <th className="p-3 text-left">Estimated Duration</th>
                        <th className="p-3 text-left">Actions</th>
                       

                    </tr>
                </thead>
                <tbody>
                    {journey.map(journeys => (
                        <tr key={journeys._id} className="border-b">
                            <td className="p-3">{journeys.from}</td>
                            <td className="p-3">{journeys.to}</td>
                            <td className="p-3">{journeys.estimatedDistance}</td>
                             <td className="p-3">{journeys.estimatedDuration}</td>
                            
                            <td className="p-3">
                                <button onClick={() => handleEdit(journeys)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(journeys._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AdminLayout>

    )
}

export default Journey