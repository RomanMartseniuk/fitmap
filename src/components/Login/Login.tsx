import { Link } from 'react-router-dom';
//import { UserAPI } from '../../api/userApi';
import styles from './Login.module.scss';
import { Loader } from '../Loader';
import { useState } from 'react';
import classNames from 'classnames';
import { ValidationError } from '../../types/ValidationError';
import { user } from '../../api/userApi';

// const data = {
//    email: 'mmm@gmail.com',
//    password: 'mmm123',
// };

enum LoginError {
   none = '',
   Err401 = 'Invalid email or password',
   Err500 = 'Server error',
}

export const Login = () => {
   //const [isLoading, setIsLoading] = useState(false);
   const [isLoading] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [emailErr, setEmailErr] = useState(false);
   const [passwordErr, setPasswordErr] = useState(false);

   const [errorMessage, setErrorMessage] = useState<ValidationError | LoginError>(
      ValidationError.none,
   );

   // const getUser = () => {
   //    UserAPI.login('mmm@gmail.com', 'mmm123')
   //       .then((res) => res.json())
   //       .then((data) => console.log(data))
   //       .catch()
   //       .finally();
   // };

   const validateInputs = () => {
      let err = 0;
      if (email === '' && password === '') {
         setErrorMessage(ValidationError.all);
         setEmailErr(true);
         setPasswordErr(true);
         err++;
      } else if (email === '') {
         setErrorMessage(ValidationError.email);
         setEmailErr(true);
         err++;
      } else if (password === '') {
         setErrorMessage(ValidationError.password);
         setPasswordErr(true);
         err++;
      }
      setTimeout(() => setErrorMessage(ValidationError.none), 2000);

      return err===0;
   };

   const login = () => {
      if (!validateInputs()) return;

      user
         .login(email, password)
         .then((res) => {
            if (res.status === 200) {
               return res.json();
            } else if (res.status === 401) {
               throw new Error('401');
            }
         })
         .then((data) => {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
         })
         .catch((err) => {
            if (err.message === '401') {
               setErrorMessage(LoginError.Err401);
            } else if (err.message === '500') {
               setErrorMessage(LoginError.Err500);
            }
         })
         .finally();
   };

   return (
      <div className={styles.login}>
         {errorMessage !== '' && (
            <div className={styles.error}>
               <p>{errorMessage}</p>
            </div>
         )}
         {isLoading ? (
            <Loader />
         ) : (
            <form className={styles.form}>
               <div className={styles.title}>
                  <h1>Log In</h1>
                  <Link className={styles.close_btn} to="/">
                     <img src="/images/other/icons/white-close-icon.svg" alt="Close Form" />
                  </Link>
               </div>
               <h2>Email Adress</h2>
               <input
                  type="email"
                  placeholder="Enter your email here..."
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                     if (e.target.value.length > 0) {
                        setEmailErr(false);
                     }
                  }}
                  name=""
                  id="email"
                  className={classNames({ [styles.empty]: emailErr })}
               />
               <h2>Password</h2>
               <input
                  type="password"
                  placeholder="Enter your password here..."
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value);
                     if (e.target.value.length > 0) {
                        setPasswordErr(false);
                     }
                  }}
                  name=""
                  id="password"
                  autoComplete="false"
                  className={classNames({ [styles.empty]: passwordErr })}
               />
               <button
                  onClick={(e) => {
                     e.preventDefault();
                     validateInputs();
                     login();
                  }}
                  className={styles.send_btn}
               >
                  Continue
               </button>
               <div className={styles.br}>
                  <p>or</p>
               </div>
               <p className={styles.reg}>
                  If you don't have an account, just <Link to="/sign-up">register here!</Link>
               </p>
            </form>
         )}
      </div>
   );
};
