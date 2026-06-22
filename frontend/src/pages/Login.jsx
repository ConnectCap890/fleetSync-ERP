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
    <div>
        <h2>FleetSync Login</h2>
        <label>UniqueId</label>
        <input 
        type='text'
        name = 'uniqueId'
        placeholder='Enter your ID'
        value={formData.uniqueId}
        onChange={handleChange}

        />
        <label>password</label>
        <input
        type='password'
        name='password'
        placeholder='Enter your password'
        value={formData.password}
        onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
    </div>
)
}

export default Login