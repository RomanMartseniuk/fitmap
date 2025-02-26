import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from 'react-leaflet';

export const Map = () => {
   return (
      <MapContainer center={[49.23335961878462, 28.470661486706124]} zoom={13}>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
      </MapContainer>
   );
};
