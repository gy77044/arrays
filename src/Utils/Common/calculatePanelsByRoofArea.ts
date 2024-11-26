/**
 * Calculates the number of solar panels that can fit on a given roof area.
 * @param roofArea - The total roof area available in square meters (m²).
 * @param panelWidth - The width of each solar panel in meters (m).
 * @param panelHeight - The height of each solar panel in meters (m).
 * @returns The number of solar panels that can fit on the roof.
 */
export function calculatePanelsByRoofArea(roofArea: number, panelWidth: number, panelHeight: number): number {
    // Calculate the area of one solar panel
    const panelArea = panelWidth * panelHeight;

    // Calculate the number of panels that can fit on the roof
    const numberOfPanels = roofArea / panelArea;

    // Round down to ensure we only count full panels that fit
    return Math.floor(numberOfPanels);
}