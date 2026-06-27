import {useState,useEffect} from 'react'
import API from '../../api/axios'
import ManagerLayout from './ManagerLayout'

const Drivers =  () =>{
      
      
      
      

      
      const [drivers,setDrivers] = useState([])

      

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
        <ManagerLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Drivers</h2>

            
          
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">License Number</th>
                        <th className="p-3 text-left">Email</th>
                        
                        <th className="p-3 text-left">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {drivers.map(drivers => (
                        <tr key={drivers._id} className="border-b">
                            <td className="p-3">{drivers.name}</td>
                            <td className="p-3">{drivers.phone}</td>
                            <td className="p-3">{drivers.licenseNumber}</td>
                            <td className="p-3">{drivers.userID?.email}</td>
                            
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
        </ManagerLayout>
    )
}

export default Drivers