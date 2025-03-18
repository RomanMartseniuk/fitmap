import { Link } from 'react-router-dom';
//import { UserAPI } from '../../api/userApi';
import styles from './Login.module.scss';
import { Loader } from '../Loader';
import { useState } from 'react';

// const data = {
//    email: 'mmm@gmail.com',
//    password: 'mmm123',
// };

enum ValidationError {
   none = '',
   email = 'Please enter your email',
   password = 'Please enter your password',
   all = 'Please enter required information',
}

export const Login = () => {
   //const [isLoading, setIsLoading] = useState(false);
   const [isLoading] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [errorMessage, setErrorMessage] = useState<ValidationError>(ValidationError.none);

   // const getUser = () => {
   //    UserAPI.login('mmm@gmail.com', 'mmm123')
   //       .then((res) => res.json())
   //       .then((data) => console.log(data))
   //       .catch()
   //       .finally();
   // };

   const validateInputs = () => {
      if (email === '' && password === '') {
         setErrorMessage(ValidationError.all);
      } else if (email === '') {
         setErrorMessage(ValidationError.email);
      } else if (password === '') {
         setErrorMessage(ValidationError.password);
      }
      setTimeout(() => setErrorMessage(ValidationError.none), 2000);

      return;
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
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  id="email"
               />
               <h2>Password</h2>
               <input
                  type="password"
                  placeholder="Enter your password here..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id="password"
                  autoComplete='false'
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
               <p className={styles.reg}>
                  If you don't have an account, just <Link to="/sign-up">register here!</Link>
               </p>
            </form>
         )}
      </div>
   );
};
