export const downloadFileAnchor = (filestring: string) => {
    // Create a blob for the file
    const blob = new Blob([filestring], { type: "application/json" });

    // Create a link element for download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "heatmap.geojson"; // Set the file name

    // Trigger the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
