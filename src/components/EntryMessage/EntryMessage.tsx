import styles from './EntryMessage.module.scss';

type Props = {
   setFirstTime: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EntryMessage: React.FC<Props> = ({setFirstTime}) => {
   const handleClick = () => {
      localStorage.setItem('isFirstTime', 'false');
      setFirstTime(false);
   }

   return (
      <div className={styles.block}>
         <div className={styles.message}>
            <h1>
               Welcome to <span>FitMap!</span>
            </h1>
            <p>
               Your personal assistant for finding the best sports and wellness spots around you.
               Discover gyms, outdoor workout areas, group classes, and more on an interactive map.
               Stay active and healthy with FitMap!
            </p>
            <button onClick={(e) => {
               e.preventDefault();
               handleClick();
            }}>Get started</button>
         </div>
      </div>
   );
};
