import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip, useMap, ZoomControl } from 'react-leaflet';
import { Gym } from '../../app/types/Gym';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useLocation, useNavigate } from 'react-router-dom';

type Coords = [number, number];

type Props = {
   pos?: Coords;
   userPos?: Coords;
   gyms?: Gym[];
};

const userIcon = L.icon({
   iconUrl: '/images/other/icons/blue-user-marker-icon.svg', // Шлях до зображення
   iconSize: [32, 32], // Розмір іконки
   iconAnchor: [16, 32], // Точка прив’язки (центр низу іконки)
   popupAnchor: [0, -32], // Точка відкриття попапа
});

const gymIcon = L.icon({
   iconUrl: '/images/other/icons/blue-marker-icon.svg', // Шлях до зображення
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

export const Map: React.FC<Props> = ({ pos = [0, 0], userPos, gyms = [] }) => {
   const navigate = useNavigate();
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const city = searchParams.get('city'); // Отримуємо параметр city з URL

   // Формуємо шлях до переходу з параметром city, якщо він є
   const getGymLink = (gymId: string) => {
      return city ? `/map/${gymId}?city=${city}` : `/map/${gymId}`;
   };

   const defCenter: Coords = [49.014294193038175, 31.186705317899435];

   const [center, setCenter] = useState<[number, number]>(defCenter);
   const [isDef, setIsDef] = useState(false);
   useEffect(() => {
      if (pos[0] !== 0 || pos[1] !== 0) {
         setCenter(pos);
         setIsDef(false);
      } else {
         setCenter(defCenter);
         setIsDef(true);
      }
   }, [pos]);

   return (
      <MapContainer className={styles.map} zoomControl={false}>
         <ChangeView center={center} zoom={isDef ? 5 : 13} />

         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />

         <ZoomControl position="topright" />

         {userPos && <Marker position={userPos} icon={userIcon} />}
         {gyms && (
            <MarkerClusterGroup chunkedLoading showCoverageOnHover={false}>
               {gyms.map((gym, index) => (
                  <Marker
                     key={index}
                     position={gym.coordinates as [number, number]}
                     icon={gymIcon}
                     eventHandlers={{
                        click: () => {
                           navigate(getGymLink(gym.id));
                        },
                     }}
                  >
                     <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
                        {gym.title}
                     </Tooltip>
                  </Marker>
               ))}
            </MarkerClusterGroup>
         )}
      </MapContainer>
   );
};
