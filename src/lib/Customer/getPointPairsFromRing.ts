/**
 * The function takes in a ring and returns an array of point pairs.
 * @param {any} ring - The `ring` parameter is an array that represents a closed ring or loop. Each
 * element in the array represents a point in the ring.
 * @returns an array of point pairs.
 */
export function getPointPairsFromRing(ring: any): any[] {
    const pointPairs = [];
    for (let i = 0; i < ring.length - 1; i++) {
        const pointPair = [ring[i], ring[i + 1]];
        pointPairs.push(pointPair);
    }
    return pointPairs;
}


