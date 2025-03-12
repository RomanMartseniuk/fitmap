import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from 'react-leaflet';

type Coords = [number, number];

type Props = {
   pos?: Coords;
   isUser?: boolean;
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

export const Map: React.FC<Props> = ({ pos = [0, 0], isUser = false }) => {
   const defCenter: Coords = [49.014294193038175, 31.186705317899435];

   const [center, setCenter] = useState<[number, number]>(defCenter);
   console.log(pos);
   useEffect(() => {
      if (pos[0] !== 0 || pos[1] !== 0) {
         setCenter(pos);
      } else {
         setCenter(defCenter);
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

         {isUser && <Marker position={center} icon={userIcon} />}
      </MapContainer>
   );
};
