export function mouseMoveCoordinates(event: MouseEvent): { x: number, y: number }{
    var clientX = event.clientX;
    var clientY = event.clientY;
    return {x: clientX, y: clientY}
}