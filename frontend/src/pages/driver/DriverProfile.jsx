import {useState,useEffect} from 'react'
import API from '../../api/axios'
import DriverLayout from './DriverLayout'
import LoadSpinner from '../../components/loadspinner'

const DriverProfile = () =>{

    const [profile,setProfile] = useState(null)
    const [passwordData,setPasswordData] = useState({
        password:'',
        confirmPassword:''
    })
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        const fetchProfile = async () =>{
            try{
                const response = await API.get('/drivers/me')
                setProfile(response.data)
                setLoading(false)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
       fetchProfile()
    },[])

    const handlePasswordChange = (e) =>{
        setPasswordData({...passwordData,[e.target.name]: e.target.value})
    }
    const handlePasswordSubmit = async (e) =>{
       e.preventDefault()
       if(passwordData.password !== passwordData.confirmPassword){
        alert('Passwords do not match')
       return 
    }
    
    try{
        await API.put(`/users/${profile.userID._id}`,{
            password: passwordData.password
        })
        alert('Password Updated Successfully')
        setPasswordData({password:'',confirmPassword:''})
    }catch(error){
     console.log(error)
     alert('Error updating password')
    }
}

 if (loading) return <LoadSpinner layout='driver'/>
    return (
        <DriverLayout>
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>

                {/* Profile Info */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500 text-sm">Name</p>
                            <p className="font-medium">{profile?.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Phone</p>
                            <p className="font-medium">{profile?.phone}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">License Number</p>
                            <p className="font-medium">{profile?.licenseNumber}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Email</p>
                            <p className="font-medium">{profile?.userID?.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Unique ID</p>
                            <p className="font-medium">{profile?.userID?.uniqueId}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Status</p>
                            <span className={`px-2 py-1 rounded text-sm ${
                                profile?.status === 'available' ? 'bg-green-100 text-green-800' :
                                profile?.status === 'on trip' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {profile?.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-4">Change Password</h3>
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={passwordData.password}
                        onChange={handlePasswordChange}
                        className="border p-2 rounded w-full mb-3"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="border p-2 rounded w-full mb-3"
                    />
                    <button
                        onClick={handlePasswordSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Password
                    </button>
                </div>
            </div>
        </DriverLayout>
    )
}

export default DriverProfile

 