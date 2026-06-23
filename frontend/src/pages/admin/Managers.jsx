import {useState,useEffect} from 'react'
import API from '../../api/axios'

const Managers =  () =>{
      const [showForm,setShowForm] = useState(false)
      const [formData, setFormData] = useState({
        uniqueId: '',
        email:'',
        password:'',
        name:'',
        phone:'',
        address:'',
        department:''
      })

      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
      }
      const [managers,setManagers] = useState([])

      const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
          const userResponse = await API.post('/auth/register',
          {
            
            email:formData.email,
          password: formData.password,
          userType: 'Manager'})
          console.log('User Created:',userResponse.data)

          await API.post('/managers/create',{
            uniqueId: userResponse.data.uniqueId,
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            department: formData.department

           })
           alert('Manager Created Successfully')
           setShowForm(false)
           const response = await API.get('/managers')
           setManagers(response.data)
          

        }catch(error){
            console.log(error.response?.data)
            alert('Error Creating Manager')
        }
      }

      const handleDelete = async (id) =>{

       if(window.confirm('Are you sure want to Delete this manager?')){
        try{
            await API.delete(`/managers/${id}`)
            setManagers(managers.filter(manager => manager._id !== id))
        }catch(error){
         console.log(error)
         alert('Error Deleting the Manager')
        }
        
       }
      }

      useEffect(() =>{

        const fetchManager = async () =>{
            try{
                const response = await API.get('/managers')
                setManagers(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchManager()
    },[])

    return(

        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Managers</h2>

            <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded">
          Add Manager
            </button>
            {showForm && (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">Create New Manager</h3>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Create Manager</button>
    </div>
)}
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Department</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map(manager => (
                        <tr key={manager._id} className="border-b">
                            <td className="p-3">{manager.name}</td>
                            <td className="p-3">{manager.phone}</td>
                            <td className="p-3">{manager.department}</td>
                            <td className="p-3">{manager.userID?.email}</td>
                            <td className="p-3">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(manager._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Managers

    
    
            
        
      
    

