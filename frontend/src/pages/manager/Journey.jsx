import {useState,useEffect} from 'react'
import API from '../../api/axios'
import ManagerLayout from './ManagerLayout'

const Journey =  () =>{
      
      
      
      
      const [journey,setJourney] = useState([])

      

      useEffect(() =>{

        const fetchJourneys = async () =>{
            try{
                const response = await API.get('/journeys')
                setJourney(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchJourneys()
    },[])

    return(
        <ManagerLayout>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Routes</h2>

            
        
      <div>
            <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">From</th>
                        <th className="p-3 text-left">To</th>
                        <th className="p-3 text-left">Estimated Distance</th>
                        <th className="p-3 text-left">Estimated Duration</th>
                        
                       

                    </tr>
                </thead>
                <tbody>
                    {journey.map(journeys => (
                        <tr key={journeys._id} className="border-b">
                            <td className="p-3">{journeys.from}</td>
                            <td className="p-3">{journeys.to}</td>
                            <td className="p-3">{journeys.estimatedDistance}</td>
                             <td className="p-3">{journeys.estimatedDuration}</td>
                            
                          
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>    
        </ManagerLayout>

    )
}

export default Journey