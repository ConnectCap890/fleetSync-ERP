import { useEffect, useState, useRef } from 'react';
import API from '../../api/axios';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';
import swal from 'sweetalert2';
import LoadSpinner from '../../components/loadspinner';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icons for Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map clicks
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const Cities = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cityName: '',
    lat: '',
    lng: '',
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCities = async () => {
    const response = await API.get('/cities');
    setCities(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/cities/create', {
        cityName: formData.cityName,
        cordinates: {
          lat: Number(formData.lat),
          lng: Number(formData.lng),
        },
      });
      toast.success('City created successfully');
      setShowForm(false);
      setFormData({ cityName: '', lat: '', lng: '' });
      await fetchCities();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating city');
    }
  };

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
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/cities/${id}`);
      setCities(cities.filter((c) => c._id !== id));
      toast.success('City deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting city');
    }
  };

  const resetForm = () => {
    setFormData({ cityName: '', lat: '', lng: '' });
    setShowForm(!showForm);
  };

  // Handle map click to fill lat/lng
const handleMapClick = async (latlng) => {
    if (!showForm) {
      toast('Click "Add City" first to enable coordinate picking', { icon: 'ℹ️' });
      return;
    }

    const toastId = toast.loading('Fetching city name...');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=10&addressdetails=1`
      );
      const data = await response.json();

      let cityName = '';
      if (data && data.address) {
        cityName = data.address.city || 
                   data.address.town || 
                   data.address.village || 
                   data.address.hamlet || 
                   data.address.county ||
                   data.address.state ||
                   'Unknown location';
      }

      setFormData({
        ...formData,
        cityName: cityName,
        lat: latlng.lat.toFixed(6),
        lng: latlng.lng.toFixed(6),
      });

      toast.dismiss(toastId);
      toast.success(`City name set to "${cityName}"`);
    } catch (error) {
      toast.dismiss(toastId);
      setFormData({
        ...formData,
        lat: latlng.lat.toFixed(6),
        lng: latlng.lng.toFixed(6),
      });
      toast.error('Could not fetch city name, but coordinates filled.');
    }
  };

  // ... rest of the component unchanged ...

  useEffect(() => {
    const init = async () => {
      try {
        await fetchCities();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) return <LoadSpinner layout="admin" />;

  // Center map on first city or default
  const center =
    cities.length > 0
      ? [cities[0].cordinates.lat, cities[0].cordinates.lng]
      : [51.5, -0.1]; //its UK centered by default

  return (
    <AdminLayout>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Cities</h2>

        <button
          onClick={resetForm}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add City
        </button>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6 mt-4">
            <h3 className="text-lg font-bold mb-4">Create New City</h3>
            <input
              type="text"
              name="cityName"
              placeholder="City name"
              value={formData.cityName}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="number"
              name="lat"
              placeholder="Latitude"
              value={formData.lat}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="number"
              name="lng"
              placeholder="Longitude"
              value={formData.lng}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-3"
            />
            <p className="text-sm text-gray-500 mb-3">
              💡 You can also click on the map below to fill coordinates.
            </p>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create City
            </button>
          </div>
        )}

        {/* City Table */}
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

        {/* Leaflet Map */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-3">City Locations on Map</h3>
          {cities.length === 0 ? (
            <p className="text-gray-500">No cities to display.</p>
          ) : (
            <MapContainer
              center={center}
              zoom={4}
              style={{ height: '500px', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapClickHandler onMapClick={handleMapClick} />
              {cities.map((city) => (
                <Marker
                  key={city._id}
                  position={[city.cordinates.lat, city.cordinates.lng]}
                >
                  <Popup>
                    <strong>{city.cityName}</strong>
                    <br />
                    Lat: {city.cordinates.lat}
                    <br />
                    Lng: {city.cordinates.lng}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Cities;