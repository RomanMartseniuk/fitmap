import styles from './AccPage.module.scss';

export const AccPage = () => {
   return (
      <div className={styles.page}>
         <div className={styles.container}>
            <div className={styles.content}>
               <h1 className={styles.title}>Personal info</h1>
               <div className={styles.name}>
                  <div className={styles.f_name}>
                     <h2>Legal first name</h2>
                     <input type="text" name="" id="" />
                  </div>
                  <div className={styles.l_name}>
                     <h2>Legal last name</h2>
                     <input type="text" name="" id="" />
                  </div>
               </div>
               <button className={styles.save_btn}>Save</button>
               <div className={styles.info} id="email">
                  <div className={styles.info_cnt}>
                     <h2>Email adress</h2>
                     <p>email@gmail.com</p>
                  </div>
                  <button>
                     <p>Edit</p>
                     <img src="/images/other/icons/black-plus-icon.svg" alt="Edit" />
                  </button>
               </div>
               <div className={styles.info} id="phone">
                  <div className={styles.info_cnt}>
                     <h2>Phone number</h2>
                     <p>+380608324877</p>
                  </div>
                  <button>
                     <p>Edit</p>
                     <img src="/images/other/icons/black-plus-icon.svg" alt="Edit" />
                  </button>
               </div>
               <div className={styles.info} id="adress">
                  <div className={styles.info_cnt}>
                     <h2>Adress</h2>
                     <p>Not provided</p>
                  </div>
                  <button>
                     <p>Edit</p>
                     <img src="/images/other/icons/black-plus-icon.svg" alt="Edit" />
                  </button>
               </div>
               <button className={styles.logout_btn}>Logout</button>
            </div>
         </div>
      </div>
   );
};
