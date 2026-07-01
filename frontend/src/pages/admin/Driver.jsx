import {useState,useEffect} from 'react'
import API from '../../api/axios'
import AdminLayout from './AdminLayout'

const Drivers =  () =>{
      const [editOriginalStatus,setEditOriginalStatus] = useState('')
      const [editId,setEditId] = useState(null)
      const [editMode,setEditMode] = useState(false)
      const [showForm,setShowForm] = useState(false)
      
      const [formData, setFormData] = useState({
        uniqueId: '',
        email:'',
        password:'',
        name:'',
        phone:'',
        licenseNumber:'',
        status: ''
      })

      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
      }
      const [drivers,setDrivers] = useState([])

      const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
          const userResponse = await API.post('/auth/register',
          {
            
            email:formData.email,
          password: formData.password,
          userType: 'Driver'})
          console.log('User Created:',userResponse.data)

          await API.post('/drivers/create',{
            uniqueId: userResponse.data.uniqueId,
            name: formData.name,
            phone: formData.phone,
            licenseNumber : formData.licenseNumber,
            status: formData.status

           })
           alert('Driver Created Successfully')
           setShowForm(false)
           const response = await API.get('/drivers')
           setDrivers(response.data)
          

        }catch(error){
            console.log(error.response?.data)
            alert('Error Creating Driver')
        }
      }

      const handleEdit = (driver) =>{
           
           setEditId(driver._id)
           setEditOriginalStatus(driver.status)
           setEditMode(true)
           setShowForm(true)
           setFormData({

           email:driver.userID?.email || '',
           password:'',
           name: driver.name,
           phone :driver.phone,
           licenseNumber: driver.licenseNumber,
           status: driver.status

           })

         

      }

      const handleUpdate = async(e) =>
      {
        e.preventDefault()
        if (formData.status !== editOriginalStatus){
            const confirm = window.confirm('Driver status automatically changes when a trip is completed or cancelled. Only change manually in case of emergencies. Are you sure you want to continue?'
            )
            if(!confirm) return 
        }
        try{
            await API.put(`/drivers/${editId}`,
               { name: formData.name,
                phone: formData.phone,
                licenseNumber: formData.licenseNumber,
                status : formData.status
            }

            )
            alert('Driver updated successfully')
            setShowForm(false)
            setEditMode(false)
            const response = await API.get('/drivers')
            setDrivers(response.data)
        }catch(error){
            console.log(error)
            alert('Error Updating the Driver')
        }
    }


      const handleDelete = async (id) =>{

       if(window.confirm('Are you sure want to Delete this driver?')){
        try{
            await API.delete(`/drivers/${id}`)
            setDrivers(drivers.filter(drivers => drivers._id !== id))
        }catch(error){
         console.log(error)
         alert('Error Deleting the Driver')
        }
        
       }
      }

      const resetFrom = () =>{
      setEditMode(false)
      setEditId(null)
      setFormData({

        email:'',
        password:'',
        name:'',
        phone:'',
        licenseNumber: '',
        status: ''
      })
      setShowForm(!showForm)
      }

      useEffect(() =>{

        const fetchDriver = async () =>{
            try{
                const response = await API.get('/drivers')
                setDrivers(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchDriver()
    },[])

    return(
        <AdminLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Drivers</h2>

            <button 
          onClick={resetFrom}
          className="bg-green-500 text-white px-4 py-2 rounded">
          Add Driver
            </button>
            {showForm && (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">{editMode ? 'Update Driver':'Create New Driver'}</h3>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="licenseNumber" placeholder="License Number" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <select name="status" onChange={handleChange} className="border p-2 rounded w-full mb-3">
           <option value="">Select Status</option>
           <option value="available">Available</option>
           <option value="on trip">On Trip</option>
           <option value="off duty">Off Duty</option>
        </select>        
        <button onClick={editMode ? handleUpdate : handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">{editMode ? 'Update Driver':'Create Driver'}</button>
       
    </div>
)}
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">License Number</th>
                        <th className="p-3 text-left">Unique ID</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Actions</th>
                        <th className="p-3 text-left">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {drivers.map(drivers => (
                        <tr key={drivers._id} className="border-b">
                            <td className="p-3">{drivers.name}</td>
                            <td className="p-3">{drivers.phone}</td>
                            <td className="p-3">{drivers.licenseNumber}</td>
                            <td className="p-3">{drivers.userID?.uniqueId}</td>
                            <td className="p-3">{drivers.userID?.email}</td>
                            <td className="p-3">
                                <button onClick={() => handleEdit(drivers)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(drivers._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                            <td className="p-3">
                               <span className={`px-2 py-1 rounded text-sm ${
                                 drivers.status === 'available' ? 'bg-green-100 text-green-800' :
                                 drivers.status === 'on trip' ? 'bg-blue-100 text-blue-800' :
                                            'bg-red-100 text-red-800'
                                 }`}>
                                 {drivers.status}
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

export default Drivers