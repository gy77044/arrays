/**
 * Calculates the number of solar panels needed for a given solar power plant capacity.
 * @param plantCapacity - The total power capacity required for the solar plant in kilowatts (kW).
 * @param panelOutput - The power output of each solar panel in watts (W).
 * @returns The number of solar panels required.
 */
export function calculateNumberOfPanels(plantCapacity: number, panelOutput: number): number {
    // Convert plant capacity from kW to watts
    const plantCapacityInWatts = plantCapacity * 1000;

    // Calculate the number of panels needed
    const numberOfPanels = plantCapacityInWatts / panelOutput;

    // Round up to ensure we have enough panels
    return Math.ceil(numberOfPanels);
}

// Example usage:
const plantCapacity = 2; // in kW
const panelOutput = 300; // in watts for sningle panel output 