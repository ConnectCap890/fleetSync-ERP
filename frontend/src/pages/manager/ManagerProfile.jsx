import {useState,useEffect} from 'react'
import API from '../../api/axios'
import ManagerLayout from './ManagerLayout'

const ManagerProifile = () =>{

    const [profile,setProfile] = useState(null)
    const [passwordData,setPasswordData] = useState({
        password:'',
        confirmPassword:''
    })
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        const fetchProfile = async () =>{
            try{
                const response = await API.get('/managers/me')
                setProfile(response.data)
                setLoading(false)
            }catch(error){
                console.log(error)
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

    if (loading) return <ManagerLayout><div className="p-8">Loading...</div></ManagerLayout>
    return (
        <ManagerLayout>
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
                            <p className="text-gray-500 text-sm">Adress</p>
                            <p className="font-medium">{profile?.address}</p>
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
                            <p className="text-gray-500 text-sm">Department</p>
                            <p className="font-medium">{profile?.department}</p>
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
        </ManagerLayout>
    )
}

export default ManagerProifile