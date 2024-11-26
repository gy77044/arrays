export const getGeolocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise(async (resolve, reject) => {
      if ("geolocation" in navigator) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
  
          if (permissionStatus.state === "denied") {
            // toast.error("Location permission is denied. Please enable it in your browser settings to proceed.",{toastId:"permission"});
            // store.dispatch( setToolTipModal({
            //     state: true,
            //     title: "Permission denied",
            //     content: `Location access denied. Please enable permissions in your browser settings or search for a location to proceed.`,
            //   }))
            const inp = document.querySelector(".esri-search__input-container");
            if (inp) {
              const inputElement:any = inp.querySelector(".esri-search__input");
              if (inputElement) {
                inputElement.focus()
              } else {
                console.log('Input element with class "esri-search__input" not found.');
              };
            } else {
              console.log("Container with class 'esri-search__input-container' not found.");
            };
            // Optionally, provide further instructions for users to reset permissions.
            return;
          }
  
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              console.error("Error getting geolocation:", error.message);
              reject(error);
              // resolve(globalLayers.getDefaultCoordinates()); // You can provide default coordinates if needed.
            }
          );
        } catch (error) {
          console.error("Error checking geolocation permission:", error);
          reject(error);
        }
      } else {
        console.error("Geolocation is not supported by your browser");
        // resolve(globalLayers.getDefaultCoordinates()); // Provide default coordinates if needed.
      }
    });
  };