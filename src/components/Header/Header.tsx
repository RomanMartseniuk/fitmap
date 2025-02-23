import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/user-icon.svg';
import classNames from 'classnames';
import { useState } from 'react';

export const Header = () => {
   const [showMenu, setShowMenu] = useState(false);
   const [logedIn] = useState(false);

   return (
      <header className={styles.header}>
         <div className={styles.container}>
            <div className={styles.logo}>Logo/Name</div>
            <nav className={styles.nav}>
               <NavLink
                  className={({ isActive }) => {
                     return classNames(styles.link, {
                        [styles.link_active]: isActive,
                     });
                  }}
                  to={'/'}
               >
                  Home
               </NavLink>
               <NavLink
                  className={({ isActive }) => {
                     return classNames(styles.link, {
                        [styles.link_active]: isActive,
                     });
                  }}
                  to={'/map'}
               >
                  Map
               </NavLink>
            </nav>
            <div
               className={styles.menuBtn}
               tabIndex={0}
               onFocus={() => setShowMenu(true)}
               onBlur={() => setTimeout(() => setShowMenu(false), 200)}
               onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                     setShowMenu(false);
                     (e.target as HTMLDivElement).blur();
                  }
               }}
            >
               <img src={logo} alt="Account" />
            </div>
            <div
               className={classNames(styles.menu, {
                  [styles.menu_hidden]: !showMenu,
               })}
            >
               {!logedIn ? (
                  <div className={styles.menu_notLogedIn}>
                     <NavLink to="/log-in">Log in</NavLink>
                     <NavLink to="/sign-up">Sign up</NavLink>
                     <NavLink to="/help">Help Centre</NavLink>
                  </div>
               ) : (
                  <div className={styles.menu_logedIn}>
                     <NavLink to="/acc">Account</NavLink>
                     <NavLink to="/notif">Notifications</NavLink>
                     <NavLink to="/saved">Saved places</NavLink>
                     <NavLink to="/help">Help Centre </NavLink>
                     <NavLink to="/log-out">Log out</NavLink>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
};
