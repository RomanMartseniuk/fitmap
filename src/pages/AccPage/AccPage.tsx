import styles from './AccPage.module.scss';

import { ReactNode } from 'react';

const NameBlock = ({ children }: { children: ReactNode }) => {
   return (
      <div className={styles.f_name}>
         <h2>{children}</h2>
         <input type="text" name="" id="" />
      </div>
   );
};

const AdditionalInfoBlock = ({ title, val, id }: { title: string; val: string; id: string }) => {
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
   return (
      <div className={styles.page}>
         <div className={styles.container}>
            <div className={styles.content}>
               <h1 className={styles.title}>Personal info</h1>
               <div className={styles.name}>
                  <NameBlock>Legal first name</NameBlock>
                  <NameBlock>Legal last name</NameBlock>
               </div>
               <button className={styles.save_btn}>Save</button>
               <AdditionalInfoBlock title="Email adress" val="email@gmail.com" id="email" />
               
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
