import { useState } from 'react';
import styles from './SignUp.module.scss';
import { Loader } from '../Loader';
import { Link } from 'react-router-dom';
import { ValidationError } from '../../types/ValidationError';
import classNames from 'classnames';

export const SingUp = () => {
   const [isLoading] = useState(false);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [fNErr, setFNErr] = useState(false);
   const [lNErr, setLNErr] = useState(false);
   const [emailErr, setEmailErr] = useState(false);
   const [passwordErr, setPasswordErr] = useState(false);

   const [errorMessage, setErrorMessage] = useState<ValidationError>(ValidationError.none);

   const validateInputs = () => {
      let n = 0;

      if (email.length === 0) {
         n++;
         setErrorMessage(ValidationError.email);
         setEmailErr(true);
      }

      if (password.length === 0) {
         n++;
         setErrorMessage(ValidationError.email);
         setPasswordErr(true);
      }

      if (firstName.length === 0) {
         n++;
         setErrorMessage(ValidationError.firstName);
         setFNErr(true);
      }

      if (lastName.length === 0) {
         n++;
         setErrorMessage(ValidationError.lastName);
         setLNErr(true);
      }

      if (n > 1) {
         setErrorMessage(ValidationError.all);
      }

      setTimeout(() => setErrorMessage(ValidationError.none), 2000);

      return;
   };

   return (
      <div className={styles.signup}>
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
                  <h1>Sign Up</h1>
                  <Link className={styles.close_btn} to="/">
                     <img src="/images/other/icons/white-close-icon.svg" alt="Close Form" />
                  </Link>
               </div>
               <h2>First Name</h2>
               <input
                  type="text"
                  placeholder="Enter your first name here..."
                  value={firstName}
                  onChange={(e) => {
                     setFirstName(e.target.value);
                     if (e.target.value.length > 0) {
                        setFNErr(false);
                     }
                  }}
                  name=""
                  id="firstName"
                  className={classNames({ [styles.empty]: fNErr })}
                  autoComplete="off"
               />
               <h2>Last Name</h2>
               <input
                  type="text"
                  placeholder="Enter your last name here..."
                  value={lastName}
                  onChange={(e) => {
                     setLastName(e.target.value);
                     if (e.target.value.length > 0) {
                        setLNErr(false);
                     }
                  }}
                  name=""
                  id="lastName"
                  className={classNames({ [styles.empty]: lNErr })}
                  autoComplete="off"
               />
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
                  }}
                  className={styles.send_btn}
               >
                  Continue
               </button>
               <div className={styles.br}>
                  <p>or</p>
               </div>
               <p className={styles.log}>
                  If you already have an account, just <Link to="/login">log in here!</Link>
               </p>
            </form>
         )}
      </div>
   );
};
