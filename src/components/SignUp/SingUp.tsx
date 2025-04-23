import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './SignUp.module.scss';

import { Loader } from '../Loader';

import { ValidationError } from '../../app/types/Errors';

import { register } from '../../api/userApi';
import { UserContext } from '../../app/store/UserContext';

export const SingUp = () => {
   const { setTokens } = useContext(UserContext);

   const [isLoading, setIsLoading] = useState(false);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [fNErr, setFNErr] = useState(false);
   const [lNErr, setLNErr] = useState(false);
   const [emailErr, setEmailErr] = useState(false);
   const [passwordErr, setPasswordErr] = useState(false);

   const [errorMessage, setErrorMessage] = useState<ValidationError | string>(ValidationError.none);

   const validateInputs = () => {
      const errors = {
         email: false,
         password: false,
         firstName: false,
         lastName: false,
      };
      let errorMessage = ValidationError.none;

      if (!email) {
         errors.email = true;
         errorMessage = ValidationError.email;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         errors.email = true;
         errorMessage = ValidationError.email;
      }

      if (!password) {
         errors.password = true;
         errorMessage = ValidationError.password;
      } else if (password.length < 5) {
         errors.password = true;
         errorMessage = ValidationError.passwordLength;
      }

      if (!firstName) {
         errors.firstName = true;
         errorMessage = ValidationError.firstName;
      }

      if (!lastName) {
         errors.lastName = true;
         errorMessage = ValidationError.lastName;
      }

      const hasErrors = Object.values(errors).some(Boolean);
      if (hasErrors) {
         if (Object.values(errors).filter(Boolean).length > 1) {
            errorMessage = ValidationError.all;
         }

         setErrorMessage(errorMessage);
         setEmailErr(errors.email);
         setPasswordErr(errors.password);
         setFNErr(errors.firstName);
         setLNErr(errors.lastName);

         setTimeout(() => setErrorMessage(ValidationError.none), 2000);
         return false;
      }

      return true;
   };

   const handleError = (arg: string = '') => {
      setErrorMessage(arg);
      setTimeout(() => setErrorMessage(ValidationError.none), 2000);
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
                     register(
                        setIsLoading,
                        validateInputs(),
                        firstName,
                        lastName,
                        email,
                        password,
                        setTokens,
                        handleError,
                     );
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
