import { useEffect, useState } from 'react'
import API from '../../api/axios'
import AdminLayout from './AdminLayout'
import toast from 'react-hot-toast'
import swal from 'sweetalert2'
import LoadSpinner from '../../components/loadspinner'

const Cities = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    cityName: '',
    lat: '',
    lng: '',
  })

  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const fetchCities = async () => {
    const response = await API.get('/cities')
    setCities(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/cities/create', {
        cityName: formData.cityName,
        cordinates: {
          lat: Number(formData.lat),
          lng: Number(formData.lng),
        },
      })
      toast.success('City created successfully')
      setShowForm(false)
      setFormData({ cityName: '', lat: '', lng: '' })
      await fetchCities()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating city')
    }
  }

  const handleDelete = async (id) => {
    const result = await swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this city?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded mr-2',
        cancelButton: 'bg-gray-500 text-white px-4 py-2 rounded',
      },
    })

    if (!result.isConfirmed) return

    try {
      await API.delete(`/cities/${id}`)
      setCities(cities.filter((c) => c._id !== id))
      toast.success('City deleted')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting city')
    }
  }

  const resetForm = () => {
    setFormData({ cityName: '', lat: '', lng: '' })
    setShowForm(!showForm)
  }

  useEffect(() => {
    const init = async () => {
      try {
        await fetchCities()
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  if (loading) return <LoadSpinner layout="admin" />

  return (
    <AdminLayout>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Cities</h2>

        <button onClick={resetForm} className="bg-green-500 text-white px-4 py-2 rounded">
          Add City
        </button>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6 mt-4">
            <h3 className="text-lg font-bold mb-4">Create New City</h3>
            <input
              type="text"
              name="cityName"
              placeholder="City name"
              onChange={handleChange}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="number"
              name="lat"
              placeholder="Latitude"
              onChange={handleChange}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="number"
              name="lng"
              placeholder="Longitude"
              onChange={handleChange}
              className="border p-2 rounded w-full mb-3"
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Create City
            </button>
          </div>
        )}

        <table className="w-full bg-white rounded-lg shadow mt-6">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Latitude</th>
              <th className="p-3 text-left">Longitude</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="p-3">{c.cityName}</td>
                <td className="p-3">{c.cordinates?.lat}</td>
                <td className="p-3">{c.cordinates?.lng}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default Cities

