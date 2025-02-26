import styles from "./MapPage.module.scss";

import { GymList } from "../../components/GymList";
import { Map } from "../../components/Map";
import { SearchForm } from "../../components/SearchForm";

export const MapPage = () => {
   return <div className={styles.mapPage}>
      <SearchForm className={styles.search} />
      <div className={styles.container}>
         <GymList />
         <Map />
      </div>
   </div>;
};
