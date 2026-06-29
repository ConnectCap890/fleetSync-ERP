import {useState,useEffect} from 'react'
import API from '../../api/axios'
import AdminLayout from './AdminLayout'

const Users =  () =>{
      const [editId,setEditId] = useState(null)
      const [editMode,setEditMode] = useState(false)
      const [showForm,setShowForm] = useState(false)
      
      const [formData, setFormData] = useState({
        uniqueId: '',
        email:'',
        password:'',
        userType:'',
       
      })

      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
      }
      const [users,setUsers] = useState([])

      
      const handleEdit = (users) =>{
           
           setEditId(users._id)
           setEditMode(true)
           setShowForm(true)
           setFormData({

         
           userType: users.userType

           })

         

      }

      const handleUpdate = async(e) =>
      {
        e.preventDefault()
       
        try{
            await API.put(`/users/${editId}`,
               { 
                
                email : formData.email,
                userType: formData.userType
            }

            )
            alert('User updated successfully')
            setShowForm(false)
            setEditMode(false)
            const response = await API.get('/users')
            setUsers(response.data)
        }catch(error){
            console.log(error)
            alert('Error Updating the User')
        }
    }


      const handleDelete = async (id) =>{

       if(window.confirm('Are you sure want to Delete this User?')){
        try{
            await API.delete(`/users/${id}`)
            setUsers(users.filter(users => users._id !== id))
        }catch(error){
         console.log(error)
         alert('Error Deleting the User')
        }
        
       }
      }

      

      useEffect(() =>{

        const fetchUser = async () =>{
            try{
                const response = await API.get('/users')
                setUsers(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchUser()
    },[])

    return(
        <AdminLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Users</h2>

           
            {showForm && (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">Update User</h3>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input type="text" name="userType" placeholder="User Type" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
              
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update User</button>
       
    </div>
)}
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">User Type</th>
                        <th className="p-3 text-left">Actions</th>


                        

                    </tr>
                </thead>
                <tbody>
                    {users.map(users => (
                        <tr key={users._id} className="border-b">
                            <td className="p-3">{users.email}</td>
                            <td className="p-3">{users.userType}</td>
                           
                            <td className="p-3">
                                <button onClick={() => handleEdit(users)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(users._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AdminLayout>
    )
}

export default Users