import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/user-icon.svg';
import classNames from 'classnames';
import { useState } from 'react';

export const Header = () => {
   const [showMenu, setShowMenu] = useState(false);
   const [logedIn, setLogedIn] = useState(true);

   return (
      <header className={styles.header}>
         <div className={styles.header__container}>
            <div className={styles.logo}>Logo/Name</div>
            <nav className={styles.header__nav}>
               <NavLink
                  className={({ isActive }) => {
                     return classNames(styles.header__link, {
                        [styles.header__link_active]: isActive,
                     });
                  }}
                  to={'/'}
               >
                  Home
               </NavLink>
               <NavLink
                  className={({ isActive }) => {
                     return classNames(styles.header__link, {
                        [styles.header__link_active]: isActive,
                     });
                  }}
                  to={'/map'}
               >
                  Map
               </NavLink>
            </nav>
            <div
               className={styles.account__link}
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
               className={classNames(styles.popup_menu, {
                  [styles.popup_menu_hidden]: !showMenu,
               })}
            >
               {!logedIn ? (
                  <div className={styles.non_loged_menu}>
                     <NavLink to="/log-in">Log in</NavLink>
                     <NavLink to="/sign-up">Sign up</NavLink>
                     <NavLink to="/help">Help Centre</NavLink>
                  </div>
               ) : (
                  <div className={styles.loged_menu}>
                     <NavLink to="/acc">Account</NavLink>
                     <NavLink to="/notif">Notifications</NavLink>
                     <NavLink to="/saved">Saved places</NavLink>
                     <NavLink to="/hrlp">Help Centre </NavLink>
                     <NavLink to="/log-out">Log out</NavLink>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
};
