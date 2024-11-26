/**
 * The getRandomHexColor function generates a random hexadecimal color code.
 * @returns a randomly generated hexadecimal color code in the format "#RRGGBB", where RR, GG, and BB
 * are two-digit hexadecimal values representing the red, green, and blue components of the color
 * respectively.
 */
export function getRandomHexColor() {
    // Generate a random number between 0 and 16777215 (decimal equivalent of FFFFFF)
    var randomColor = Math.floor(Math.random() * 16777215);
    // Convert the decimal number to hexadecimal
    var hexColor = randomColor.toString(16);
    // Prepend zeros to the hex code if it is less than 6 characters long
    while (hexColor.length < 6) {
        hexColor = "0" + hexColor;
    }
    // Prepend a hash symbol to the hex code
    hexColor = "#" + hexColor;
    return hexColor;
} 

/**
 * The getRandomColorArray function generates a random color array with red, green, blue, and alpha
 * components.
 * @returns The function getRandomColorArray() returns an array containing four elements: the randomly
 * generated values for the red, green, and blue components of a color (ranging from 0 to 255), and a
 * fixed alpha value of 0.7.
 */
export function getRandomColorArray() {
    var red = Math.floor(Math.random() * 256); // Random value between 0 and 255 for red component
    var green = Math.floor(Math.random() * 256); // Random value between 0 and 255 for green component
    var blue = Math.floor(Math.random() * 256); // Random value between 0 and 255 for blue component

    return [red, green, blue, 0.7];
}
