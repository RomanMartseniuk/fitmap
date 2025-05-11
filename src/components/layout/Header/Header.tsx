import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../app/store/UserContext';

export const Header = () => {
   const [showMenu, setShowMenu] = useState(false);

   const { user, logout } = useContext(UserContext);
   const [logedIn, setLogedIn] = useState(false);

   useEffect(() => {
      setLogedIn(user !== null);
   }, [user]);

   return (
      <header className={styles.header}>
         <div className={styles.container}>
            <div className={styles.logo}>
               <img src="/images/other/logo.png" alt="logo" />
            </div>
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
               className={styles.menu_btn}
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
               <img
                  className={styles.menu_img}
                  src="/images/other/icons/white-menu-icon.svg"
                  alt="Menu"
               />
               {logedIn ? (
                  <span>{user?.first_name[0].toUpperCase()}</span>
               ) : (
                  <img
                     className={styles.acc_img}
                     src={'/images/other/icons/white-acc-icon.svg'}
                     alt="Account"
                  />
               )}
            </div>
            <div
               className={classNames(styles.menu, {
                  [styles.menu_hidden]: !showMenu,
               })}
            >
               {!logedIn ? (
                  <div className={styles.menu_notLogedIn}>
                     <NavLink to="/login">Log in</NavLink>
                     <NavLink to="/sign-up">Sign up</NavLink>
                     {/* <NavLink to="/help">Help Centre</NavLink> */}
                  </div>
               ) : (
                  <div className={styles.menu_logedIn}>
                     <NavLink to="/acc">Account</NavLink>
                     {/* <NavLink to="/notif">Notifications</NavLink> */}
                     <NavLink to="/saved">Saved places</NavLink>
                     {/* <NavLink to="/help">Help Centre </NavLink> */}
                     <NavLink to="/" onClick={() => logout()}>Log out</NavLink>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
};
