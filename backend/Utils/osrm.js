
const getRoute = async (depCity, arrCity) => {
    try {
        console.log('Calling OSRM for:', depCity.cityName, '→', arrCity.cityName)
        console.log('Coordinates:', depCity.cordinates, arrCity.cordinates)
        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${depCity.cordinates.lng},${depCity.cordinates.lat};${arrCity.cordinates.lng},${arrCity.cordinates.lat}?overview=full&geometries=geojson`
        );

        const data = await response.json();

        if (!data.routes || data.routes.length === 0) {
            throw new Error("No route found");
        }

        const route = data.routes[0];

        const distanceKm = (route.distance / 1000).toFixed(1);
        const durationHours = (route.duration / 3600).toFixed(2);
        const coordinates = route.geometry.coordinates;

        return {
            distanceKm,
            durationHours,
            coordinates,
        };
    } catch (error) {
        console.error("OSRM error:", error);
        return null;
    }
};

module.exports = { getRoute }