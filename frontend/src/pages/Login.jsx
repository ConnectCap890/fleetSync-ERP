import { useState } from "react";
import API from "../api/axios";
import { useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

const Login = () =>{
    const {login} = useAuth()
    const navigate = useNavigate()
    
    const [formData,setFormData] = useState(
        {
            uniqueId:'',
            password: ''
        }
    )
    const handleChange = (e) =>
    {
        setFormData({...formData,[e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>
    {
         
 
        e.preventDefault()
        try{
            
            const response = await API.post('/auth/login',formData)
            const {token,userType} = response.data
            login ({userType},token)
            if(userType === 'Admin') navigate('/admin/dashboard')
            else if(userType === 'Manager') navigate('/manager/dashboard')
            else if (userType === 'Driver') navigate('/driver/dashboard')    

        }
        catch(error){
            console.log(error)
            alert('Invalid Credentials')
            
        }
    }

return(
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">🚛 FleetSync</h1>
                <p className="text-gray-500 mt-2">Transport Management System</p>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Sign In</h2>
            <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">Unique ID</label>
                <input
                    type='text'
                    name='uniqueId'
                    placeholder='Enter your unique ID'
                    value={formData.uniqueId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-600 text-sm mb-1">Password</label>
                <input
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold">
                Sign In
            </button>
            <p className="text-center text-gray-400 text-sm mt-4">FleetSync ERP v1.0</p>
        </div>
    </div>
)
}

export default Login