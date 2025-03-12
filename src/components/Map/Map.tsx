import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from 'react-leaflet';

type Coords = [number, number];

type Props = {
   pos: Coords;
};

const userIcon = L.icon({
   iconUrl: '/images/other/icons/blue-user-marker-icon.svg', // Шлях до зображення
   iconSize: [32, 32], // Розмір іконки
   iconAnchor: [16, 32], // Точка прив’язки (центр низу іконки)
   popupAnchor: [0, -32], // Точка відкриття попапа
});

const ChangeView = ({ center, zoom = 5 }: { center: [number, number]; zoom?: number }) => {
   const map = useMap();

   useEffect(() => {
      map.setView(center); // Updates the view when center changes
      map.setZoom(zoom);
   }, [center, map, zoom]);

   return null;
};

export const Map: React.FC<Props> = ({ pos }) => {
   const defCenter: Coords = [49.014294193038175, 31.186705317899435];
   const [allowedGeo, setAllowedGeo] = useState(false);

   const [center, setCenter] = useState<[number, number]>(defCenter);

   useEffect(() => {
      if (pos[1] !== 0 && pos[0] !== 0) {
         setCenter(pos);
         setAllowedGeo(true);
      } else {
         setCenter(defCenter);
         setAllowedGeo(false);
      }
   }, [pos]);

   return (
      <MapContainer className={styles.map} zoomControl={false}>
         <ChangeView center={center} zoom={center !== defCenter ? 13 : 5} />

         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />

         <ZoomControl position="topright" />

         {allowedGeo && <Marker position={center} icon={userIcon} />}
      </MapContainer>
   );
};
