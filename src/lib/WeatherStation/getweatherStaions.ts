/**
 * The function `getNearestWeatherStations` takes in a radius, position, and optional source parameter
 * and returns the nearest weather stations.
 * @param {number} radius - The radius parameter is a number that represents the distance in meters
 * from the given position within which you want to find the nearest weather stations.
 * @param postion - The `postion` parameter is an object that represents the latitude and longitude
 * coordinates of a location. It has two properties:
 * @param {string} [source] - The `source` parameter is an optional parameter that specifies the source
 * of the weather station data. It is a string that can be used to filter the weather stations based on
 * their source.
 */
export const getNearestWeatherStations = (radius: number, postion: { lat: number, lng: number }, source?: string) => {
    if(source){
        // conditionally get the stations data from the provided source 
    }
    else {
        // get station data and format that accoprding to it
    }
}