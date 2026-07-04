export const getVehiclePosition = (trip) => {
    const now = new Date();
    const start = new Date(trip.startDateTime);
    const end = new Date(trip.endDateTime);

    if (!trip.routeCoordinates || trip.routeCoordinates.length === 0) {
        return [trip.departure.lat, trip.departure.lng];
    }

    if (now <= start) {
        const coords = trip.routeCoordinates[0];
        return [coords[1], coords[0]];
    }

    if (now >= end) {
        const coords = trip.routeCoordinates[trip.routeCoordinates.length - 1];
        return [coords[1], coords[0]];
    }

    const progress = (now - start) / (end - start);

    const index = Math.min(
        Math.floor(progress * (trip.routeCoordinates.length - 1)),
        trip.routeCoordinates.length - 1
    );

    const coords = trip.routeCoordinates[index];

    return [coords[1], coords[0]];
};