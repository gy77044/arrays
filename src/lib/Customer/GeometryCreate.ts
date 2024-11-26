/**
 * The `calculateEndPoint` function calculates the latitude and longitude of an end point given a
 * starting point, a distance, and the radius of the Earth.
 * @param {number} startLat - The starting latitude in degrees.
 * @param {number} startLng - The `startLng` parameter represents the longitude of the starting point.
 * @param {number} length - The `length` parameter represents the distance in meters from the starting
 * point to the desired end point.
 * @returns an object with the latitude and longitude of the calculated end point.
 */
export function calculateEndPoint(startLat: number, startLng: number, length: number) {
    // Radius of the Earth in meters
    const earthRadius = 6371000;
    // Convert length from meters to radians
    const distanceRad = length / earthRadius;

    // Convert latitude and longitude to radians
    const startLatRad = startLat * (Math.PI / 180);
    const startLngRad = startLng * (Math.PI / 180);

    // Calculate the end point's latitude and longitude using the Haversine formula
    const endLatRad = Math.asin(Math.sin(startLatRad) * Math.cos(distanceRad) +
        Math.cos(startLatRad) * Math.sin(distanceRad) * Math.cos(0));
    const endLngRad = startLngRad + Math.atan2(Math.sin(0) * Math.sin(distanceRad) * Math.cos(startLatRad),
        Math.cos(distanceRad) - Math.sin(startLatRad) * Math.sin(endLatRad));

    // Convert end point's latitude and longitude back to degrees
    const endLat = endLatRad * (180 / Math.PI);
    const endLng = endLngRad * (180 / Math.PI);

    return { latitude: endLat, longitude: endLng };
}