import { Link } from 'react-router-dom';
import { UserAPI } from '../../api/userApi';
import styles from './Login.module.scss';
import { Loader } from '../Loader';
import { useState } from 'react';

const data = {
   email: 'mmm@gmail.com',
   password: 'mmm123',
};

export const Login = () => {
   const [isLoading, setIsLoading] = useState(false);

   const getUser = () => {
      UserAPI.login('mmm@gmail.com', 'mmm123')
         .then((res) => res.json())
         .then((data) => console.log(data))
         .catch()
         .finally();
   };

   return (
      <div className={styles.login}>
         {isLoading ? (
            <Loader />
         ) : (
            <form className={styles.form}>
               <div className={styles.title}>
                  <h1>Log In</h1>
                  <div className={styles.close_btn}>
                     <img src="/images/other/icons/white-close-icon.svg" alt="Close Form" />
                  </div>
               </div>
               <h2>Email Adress</h2>
               <input type="email" placeholder="Enter your email here..." name="" id="" />
               <h2>Password</h2>
               <input type="password" placeholder="Enter your password here..." name="" id="" />
               <button
                  onClick={(e) => {
                     e.preventDefault();
                  }}
                  className={styles.send_btn}
               >
                  Continue
               </button>
               <div className={styles.br}>
                  <p>or</p>
               </div>
               <p className={styles.reg}>
                  If you don't have an account, just <Link to="">register here!</Link>
               </p>
            </form>
         )}
      </div>
   );
};
