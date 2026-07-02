import {useState,useEffect} from 'react'
import API from '../../api/axios'
import ManagerLayout from './ManagerLayout'

const Vehicles =  () =>{
      
      
      const [vehicles,setVehicles] = useState([])

      useEffect(() =>{

        const fetchVehicle = async () =>{
            try{
                const response = await API.get('/vehicles')
                setVehicles(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchVehicle()
    },[])

    return(
        <ManagerLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Vehicles</h2>

         
        
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Make</th>
                        <th className="p-3 text-left">Model</th>
                        <th className="p-3 text-left">Model Year</th>
                        <th className="p-3 text-left">License Plate</th>
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
        </ManagerLayout>

    )
}

export default Vehicles