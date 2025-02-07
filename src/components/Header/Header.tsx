import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/user-icon.svg';
import classNames from 'classnames';
import { useState } from 'react';

export const Header = () => {
   const [showMenu, setShowMenu] = useState(false);
   const [logedIn] = useState(false);

   return (
      <header className="header">
         <div className="header__container">
            <div className="header__logo">Logo/Name</div>
            <nav className="header__nav">
               <NavLink
                  className={({ isActive }) => {
                     return classNames('header__link', {
                        active: isActive,
                     });
                  }}
                  to={'/'}
               >
                  Home
               </NavLink>
               <NavLink
                  className={({ isActive }) => {
                     return classNames('header__link', {
                        active: isActive,
                     });
                  }}
                  to={'/map'}
               >
                  Map
               </NavLink>
            </nav>
            <div
               className="header__acc-link"
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
               className={classNames('header__popup-menu', {
                  hidden: !showMenu,
               })}
            >
               {!logedIn ? (
                  <div className="header__popup-menu--not-loged-in">
                     <NavLink to="/log-in">Log in</NavLink>
                     <NavLink to="/sign-up">Sign up</NavLink>
                     <NavLink to="/help">Help Centre</NavLink>
                  </div>
               ) : (
                  <div className="header__popup-menu--loged-in">
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
