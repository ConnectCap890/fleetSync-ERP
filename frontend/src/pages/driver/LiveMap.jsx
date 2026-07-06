import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import API from '../../api/axios';
import LoadSpinner from '../../components/loadspinner';
import toast from 'react-hot-toast';
import DriverLayout from './DriverLayout';
// Fix default marker icons (required for Webpack)

import { getVehiclePosition } from '../../utils/vehiclePosition'
// const DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// })
const departurIcon = L.divIcon({

    html: '🏁',
    iconSize: [30, 30],
    className: 'departure-icon'
})
const arrivalIcon = L.divIcon({

    html: '📍',
    iconSize: [30, 30],
    className: 'arrival-Icon'
})
const truckIcon = L.divIcon({
    html: '🚛',
    iconSize: [30, 30],
    className: 'truck-icon'
});
L.Marker.prototype.options.icon = truckIcon;

const LiveMap = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchActiveTrips = async () => {
            try {
                const res = await API.get('/trips/active-for-map');
                console.log(res.data)
                setTrips(res.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load trip data');
            } finally {
                setLoading(false);
            }
        };
        fetchActiveTrips();

        // Map refreshes every 30 seconds
        const interval = setInterval(fetchActiveTrips, 30000)
        // gets cleanup on un mount
        return () => clearInterval(interval)
    }, []);

    const [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    })

    const handleShowDetails = async (tripId) => {
        try {
            const res = await API.get(`/trips/${tripId}`);
            setSelectedTrip(res.data);
            setShowModal(true);
        } catch (error) {
            toast.error('Error fetching trip details');
        }
    };

    if (loading) return <LoadSpinner layout="driver" />;

    // Center map on first trip's departure or fallback
    const center = trips.length > 0
        ? [trips[0].departure.lat, trips[0].departure.lng]
        : [51.5, -0.1];

    return (
        <DriverLayout>
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Live Fleet Tracking</h2>
                {trips.length === 0 ? (
                    <p>No active trips (Scheduled or In Progress) to display.</p>
                ) : (
                    <MapContainer
                        center={center}
                        zoom={5}
                        style={{ height: '70vh', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {trips.map((trip) => {
                            if (!trip.departure?.lat || !trip.arrival?.lat) return null

                            const dep = [trip.departure.lat, trip.departure.lng]
                            const arr = [trip.arrival.lat, trip.arrival.lng]
                            const routeCoords = trip.routeCoordinates?.length > 0
                                ? trip.routeCoordinates.map(c => [c[1], c[0]])
                                : [dep, arr]
                            const vehiclePos = trip.routeCoordinates?.length > 0
                                ? getVehiclePosition(trip, currentTime)
                                : dep

                            return (
                                <React.Fragment key={trip._id}>
                                    {/* Route line */}
                                    <Polyline
                                        positions={routeCoords}
                                        color={trip.status === 'In Progress' ? 'green' : 'blue'}
                                        weight={3}
                                    />

                                    {/* Departure marker */}
                                    <Marker position={dep} icon={departurIcon}>
                                        <Popup>{trip.departure.cityName}</Popup>
                                    </Marker>

                                    {/* Arrival marker */}
                                    <Marker position={arr} icon={arrivalIcon}>
                                        <Popup>{trip.arrival.cityName}</Popup>
                                    </Marker>

                                    {/* Vehicle marker — only show if In Progress */}
                                    {trip.status === 'In Progress' && vehiclePos && (
                                        <Marker position={vehiclePos} icon={truckIcon}>
                                            <Popup>
                                                <strong>🚛 {trip.vehicle?.make} {trip.vehicle?.model}</strong><br />
                                                Driver: {trip.driver?.name}<br />
                                                {trip.departure.cityName} → {trip.arrival.cityName}<br />
                                                Status: {trip.status}<br />
                                                <button
                                                    onClick={() => handleShowDetails(trip._id)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
                                                    View Details
                                                </button>
                                            </Popup>
                                        </Marker>
                                    )}
                                </React.Fragment>

                            );
                        })}
                    </MapContainer>
                )}

                {/* Modal for Trip Details */}
                {showModal && selectedTrip && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className="bg-white p-6 rounded-lg max-w-lg w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold mb-4">Trip Details</h3>
                            <p>
                                <strong>Vehicle:</strong> {selectedTrip.vehicle?.make}{' '}
                                {selectedTrip.vehicle?.model} ({selectedTrip.vehicle?.licensePlate})
                            </p>
                            <p>
                                <strong>Driver:</strong> {selectedTrip.driver?.name}
                            </p>
                            <p>
                                <strong>From:</strong> {selectedTrip.departureCity?.cityName} →{' '}
                                {selectedTrip.arrivalCity?.cityName}
                            </p>
                            <p>
                                <strong>Start:</strong> {new Date(selectedTrip.startDateTime).toLocaleString()}
                            </p>
                            <p>
                                <strong>End:</strong> {new Date(selectedTrip.endDateTime).toLocaleString()}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedTrip.status}
                            </p>
                            <p>
                                <strong>Created by:</strong> {selectedTrip.createdBy?.email}
                            </p>
                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DriverLayout>
    );
};

export default LiveMap;