import React, { useEffect, useRef, useState } from "react";
import Fire from "../assets/fire.svg";

const apiKey = import.meta.env.VITE_MAPS_API_KEY;

const nasaApiUrl = import.meta.env.VITE_WILDFIRE_NASA_API;

function Map() {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [error, setError] = useState(null);
  const [wildfires, setWildfires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFire, setSelectedFire] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchWildfires = async () => {
      try {
        const response = await fetch(nasaApiUrl);
        const data = await response.json();
        const wildfireEvents = data.events.filter((event) =>
          event.categories.some((category) => category.title === "Wildfires")
        );
        setWildfires(wildfireEvents);
      } catch (err) {
        console.error("Error fetching wildfire data:", err);
        setError("Failed to fetch wildfire data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWildfires();
  }, []);

  useEffect(() => {
    let markers = [];

    const initMap = () => {
      if (
        !mapInstance.current &&
        mapContainer.current &&
        window.H &&
        !isLoading
      ) {
        try {
          const platform = new window.H.service.Platform({
            apikey: apiKey,
          });

          const defaultLayers = platform.createDefaultLayers();

          const map = new window.H.Map(
            mapContainer.current,
            defaultLayers.vector.normal.map,
            {
              center: { lat: 0, lng: 0 },
              zoom: 2,
              pixelRatio: window.devicePixelRatio || 1,
            }
          );

          const ui = new window.H.ui.UI.createDefault(map, defaultLayers);
          const mapEvents = new window.H.mapevents.MapEvents(map);
          new window.H.mapevents.Behavior(mapEvents);

          mapInstance.current = map;

          // Create a marker group
          const markerGroup = new window.H.map.Group();
          map.addObject(markerGroup);

          // Add markers
          wildfires.forEach((wildfire) => {
            const { coordinates } = wildfire.geometries[0];
            const icon = new window.H.map.Icon(Fire, {
              size: { w: 24, h: 24 },
            });
            const marker = new window.H.map.Marker(
              { lat: coordinates[1], lng: coordinates[0] },
              { icon: icon, data: wildfire }
            );

            markerGroup.addObject(marker);
            markers.push(marker);
          });

          markerGroup.addEventListener("tap", (evt) => {
            if (evt.target instanceof window.H.map.Marker) {
              const marker = evt.target;
              const wildfire = marker.getData();
              const point = marker.getGeometry();

              ui.getBubbles().forEach((bubble) => ui.removeBubble(bubble));

              // CHANGE: Create a custom style for the info bubble
              const customBubbleStyle = `
              .H_ib_close {
                font-size: 12px !important;
                width: 20px !important;
                height: 20px !important;
                line-height: 20px !important;
              }
            `;

              // CHANGE: Create a style element and append it to the document head
              const styleElement = document.createElement("style");
              styleElement.textContent = customBubbleStyle;
              document.head.appendChild(styleElement);

              const bubble = new window.H.ui.InfoBubble(point, {
                content: `
                  <div style="padding: 10px; max-width: 200px;background-color: white; padding: 10px; border-radius: 20px ">
                    <h3 style="margin: 0 0 5px; font-size: 14px; font-weight: bold;">${
                      wildfire.title
                    }</h3>
                    <p style="margin: 0; font-size: 12px;">Started: ${new Date(
                      wildfire.geometries[0].date
                    ).toLocaleDateString()}</p>
                  </div>
                `,
              });

              ui.addBubble(bubble);
              setSelectedFire(wildfire);

              // CHANGE: Remove the style element when the bubble is closed
              bubble.addEventListener("statechange", (evt) => {
                if (evt.target.getState() === "closed") {
                  document.head.removeChild(styleElement);
                }
              });
            }
          });

          const handleResize = () => {
            if (mapInstance.current) {
              mapInstance.current.getViewPort().resize();
            }
          };

          window.addEventListener("resize", handleResize);

          return () => {
            window.removeEventListener("resize", handleResize);
            markers.forEach((marker) => markerGroup.removeObject(marker));
            markers = [];
            if (mapInstance.current) {
              mapInstance.current.dispose();
              mapInstance.current = null;
            }
          };
        } catch (err) {
          console.error("Error initializing map:", err);
          setError("Failed to initialize map");
        }
      }
      setReload(false);
    };

    const cleanup = initMap();
    return cleanup;
  }, [wildfires, isLoading, reload]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 mb-4 rounded-full bg-gray-200"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <p className="mt-4 text-gray-600">Loading wildfire data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Global Wildfire Tracker
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* <div className="flex flex-col w-full"> */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              ref={mapContainer}
              className="w-full h-[70vh]"
              style={{ minHeight: "500px" }}
            />
          </div>
          {/* <div
            className="bg-black text-white py-2 px-2 cursor-pointer w-20 rounded-md text-center mt-3"
            onClick={() => setReload(true)}
          >
            Refresh
          </div> */}
        </div>
        {/* </div> */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Wildfire Details</h2>
            {selectedFire ? (
              <div>
                <h3 className="font-bold text-lg mb-2">{selectedFire.title}</h3>
                <p className="text-gray-600 mb-2">
                  Started:{" "}
                  {new Date(
                    selectedFire.geometries[0].date
                  ).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Coordinates:{" "}
                  {selectedFire.geometries[0].coordinates[1].toFixed(4)},
                  {selectedFire.geometries[0].coordinates[0].toFixed(4)}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">
                Click on a fire icon to see details
              </p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
            <p className="text-sm text-gray-600">
              Displaying {wildfires.length} active wildfires worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
