import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = () => {
  // Use the desired coordinates for the static marker
  const staticMarkerPosition: [number, number] = [4.730348953753619, -74.25918307301835]; // Replace with your desired coordinates

  return (
    <>
      
      <MapContainer
        center={staticMarkerPosition}
        zoom={30}
        style={{ height: "30vh", width: "100%" }}
      >
        {/* Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Static Marker */}
        <Marker position={staticMarkerPosition}>
          <Popup>
            Static Marker:
            <br />
            {staticMarkerPosition[0].toFixed(3)}&#176;,&nbsp;
            {staticMarkerPosition[1].toFixed(3)}&#176;
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Map;

