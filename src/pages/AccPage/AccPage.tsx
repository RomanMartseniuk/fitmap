import { UserContext } from '../../app/store/UserContext';
import styles from './AccPage.module.scss';

import { ReactNode, useContext, useEffect, useState } from 'react';

const NameBlock = ({
   children,
   val,
   setVal,
}: {
   children: ReactNode;
   val: string;
   setVal: (arg: string) => void;
}) => {
   return (
      <div className={styles.f_name}>
         <h2>{children}</h2>
         <input type="text" name="" id="" value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
   );
};

const AdditionalInfoBlock = ({
   title,
   val,
   setVal,
   id,
}: {
   title: string;
   val: string;
   setVal: (arg: string) => void;
   id: string;
}) => {
   return (
      <div className={styles.info} id={id}>
         <div className={styles.info_cnt}>
            <h2>{title}</h2>
            <p>{val}</p>
         </div>
         <button>
            <p>Edit</p>
            <img src="/images/other/icons/black-plus-icon.svg" alt="Edit" />
         </button>
      </div>
   );
};

export const AccPage = () => {
   const { user, updateUser } = useContext(UserContext);

   const [firstName, setFirstName] = useState(user?.first_name || '');
   const [lastName, setLastName] = useState(user?.last_name || '');
   const [email, setEmail] = useState(user?.email || '');

   useEffect(() => {
      if (user) {
         setFirstName(user.first_name);
         setLastName(user.last_name);
         setEmail(user.email);
      }
   }, [user]);

   return (
      <div className={styles.page}>
         <div className={styles.container}>
            <div className={styles.content}>
               <h1 className={styles.title}>Personal info</h1>
               <div className={styles.name}>
                  <NameBlock val={firstName} setVal={setFirstName}>
                     Legal first name
                  </NameBlock>
                  <NameBlock val={lastName} setVal={setLastName}>
                     Legal last name
                  </NameBlock>
               </div>
               <button className={styles.save_btn}>Save</button>
               <AdditionalInfoBlock title="Email adress" val={email} setVal={setEmail} id="email" />

               {/* 
               <AdditionalInfoBlock title="Phone number" val="+380608324877" id="phone" />
               <AdditionalInfoBlock title="Adress" val="Not provided" id="adress" />
               */}

               <button className={styles.logout_btn}>Logout</button>
            </div>
         </div>
      </div>
   );
};
