export const getRoute = async (depCity,arrCity) =>{
    try {
        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${depCity.cordinates.lng},${depCity.cordinates.lat};${arrCity.cordinates.lng},${arrCity.cordinates.lat}?overview=full&geometries=geojson`
        )
        const data = await response.json()
        if(!data.routes || data.routes.length === 0) {
            throw new Error('No route found')
        }
         const route = data.routes[0]
         const distanceKM = (route.distance / 1000).toFixed(1)
         const durationHours = (route.duration / 3600).toFixed(2)
         const coordinates = route.geometry.coordinates
         return {distanceKM,durationHours,coordinates} 
    } catch (error) {
        console.log('OSRM error:',error)
        return null
    }
}