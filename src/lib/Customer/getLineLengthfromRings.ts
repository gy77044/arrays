var ringsObject = {} as any 
/**
 * The function calculates the length of each ring in a polygon and returns an object containing the
 * length and the coordinates of the first two points in each ring.
 * @param {any[]} rings - An array of arrays representing the coordinates of the rings of a polygon.
 * Each inner array contains the longitude and latitude values of a point on the ring.
 * @param geodesicUtils - The `geodesicUtils` parameter is an object that provides utility functions
 * for performing geodesic calculations. It is expected to have a method called `geodesicDistance` that
 * calculates the distance between two points on the Earth's surface.
 * @param {any} Point - The `Point` parameter is a class or object representing a point on a map. It
 * typically has properties for latitude and longitude, and may have additional properties or methods
 * depending on the specific implementation or library being used.
 * @param {any} polygonring - The parameter `polygonring` is an array that contains the coordinates of
 * each ring in a polygon. Each ring is represented as an array of coordinate pairs, where each pair
 * represents a point on the ring.
 * @returns an object `ringsObject` which contains the length of each ring and an array of points for
 * each ring.
 */
export function getRingsLengthPointsGeom(rings: any[], geodesicUtils: __esri.geodesicUtils, Point: any, polygonring: any){
    for(let i = 0; i< rings.length; i++){
        let ring = rings[i]
        let ring_1 = polygonring[i]

        const point1 = {
            latitude: ring[0][1],
            longitude: ring[0][0],
            type: "point"
        };

        const point2 = {
            latitude: ring[1][1],
            longitude: ring[1][0],
            type: "point"
        };

        const poly1 = {
            latitude: ring_1[0][1],
            longitude: ring_1[0][0],
            type: "point"
        };

        const poly2 = {
            latitude: ring_1[1][1],
            longitude: ring_1[1][0],
            type: "point"
        };

        const join = geodesicUtils.geodesicDistance(
            new Point({ x: point1.longitude, y: point1.latitude }),
            new Point({ x: point2.longitude, y: point2.latitude }),
            "meters"
        );

        ringsObject[i] = {length: join.distance, pointsArrya: [poly1, poly2]}
    }
    return ringsObject
}

/**
 * The function calculates the length of each ring in an array of coordinates using geodesic distance
 * and returns an object with the length and the points array for each ring.
 * @param {any[]} rings - An array of rings, where each ring is represented as an array of coordinates.
 * Each coordinate is represented as an array with two elements: longitude and latitude.
 * @param geodesicUtils - The `geodesicUtils` parameter is an object that provides geodesic
 * calculations, such as calculating distances between two points on the Earth's surface.
 * @param {any} Point - The `Point` parameter is an object that represents a point on a map. It
 * typically has properties for `latitude` and `longitude` to specify the coordinates of the point.
 * @returns an object `ringsObject` which contains the length of each ring and an array of points for
 * each ring.
 */
export function getRingsLengtwithCoordinates(rings: any[], geodesicUtils: __esri.geodesicUtils, Point: any){
    for(let i = 0; i < rings.length; i++){
        let ring = rings[i]
        const point1 = {
            latitude: ring[0][1],
            longitude: ring[0][0],
            type: "point"
        };
        const point2 = {
            latitude: ring[1][1],
            longitude: ring[1][0],
            type: "point"
        };
        const join = geodesicUtils.geodesicDistance(
            new Point({ x: point1.longitude, y: point1.latitude }),
            new Point({ x: point2.longitude, y: point2.latitude }),
            "meters"
        );

        ringsObject[i] = {length: join.distance, pointsArrya: [point1, point2]}
    }
    return ringsObject
}