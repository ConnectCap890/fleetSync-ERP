import { useEffect, useState } from 'react'
import API from '../../api/axios'
import ManagerLayout from './ManagerLayout'
import LoadSpinner from '../../components/loadspinner'

const Cities = () => {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await API.get('/cities')
        setCities(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [])

  if (loading) return <LoadSpinner layout="manager" />

  return (
    <ManagerLayout>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Cities</h2>

        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Latitude</th>
              <th className="p-3 text-left">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="p-3">{c.cityName}</td>
                <td className="p-3">{c.cordinates?.lat}</td>
                <td className="p-3">{c.cordinates?.lng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ManagerLayout>
  )
}

export default Cities

