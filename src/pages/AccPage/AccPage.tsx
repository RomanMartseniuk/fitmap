import { MessagesContext } from '../../app/store/MessageContext';
import { UserContext } from '../../app/store/UserContext';
import { Message } from '../../app/types/Message';
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
   handleSave,
   id,
}: {
   title: string;
   val: string;
   setVal: (arg: string) => void;
   handleSave: () => void;
   id: string;
}) => {
   const [isChanging, setIsChanging] = useState(false);
   const [defVal, setDefVal] = useState('');

   useEffect(() => {
      if (defVal === '') {
         setDefVal(val);
      }
   }, [val]);

   return (
      <div className={styles.info} id={id}>
         <div className={styles.info_cnt}>
            <h2>{title}</h2>
            {isChanging ? (
               <input
                  type="text"
                  name=""
                  id=""
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
               />
            ) : (
               <p>{val}</p>
            )}
         </div>
         {isChanging ? (
            <div className="">
               <button
                  onClick={() => {
                     setIsChanging(!isChanging);
                     handleSave();
                  }}
               >
                  <p>Save</p>
               </button>
               <button
                  onClick={() => {
                     setIsChanging(!isChanging);
                     setVal(defVal);
                  }}
               >
                  <p>Cancel</p>
                  <img src="/images/other/icons/white-close-icon.svg" alt="" />
               </button>
            </div>
         ) : (
            <button onClick={() => setIsChanging(!isChanging)}>
               <p>Edit</p>
               <img src="/images/other/icons/black-plus-icon.svg" alt="Edit" />
            </button>
         )}
      </div>
   );
};

export const AccPage = () => {
   const { user, updateUser } = useContext(UserContext);
   const { addMessage } = useContext(MessagesContext);

   //const [isLoading, setIsLoading] = useState(false);

   const [first_name, setFirstName] = useState(user?.first_name || '');
   const [last_name, setLastName] = useState(user?.last_name || '');
   const [email, setEmail] = useState(user?.email || '');

   useEffect(() => {
      if (user) {
         setFirstName(user.first_name);
         setLastName(user.last_name);
         setEmail(user.email);
      }
   }, [user]);

   const handleSaveName = async () => {
      if (first_name === '' || last_name === '') {
         const error: Message = { type: 'error', text: 'Please fill in all fields' };
         addMessage(error);
         return;
      }

      if (first_name === user?.first_name && last_name === user?.last_name) {
         return;
      }

      updateUser({ first_name, last_name: last_name, email })
         .then((res) => {
            if (res === '200') {
               // Assuming `updateUser` returns a string
               const success: Message = { type: 'success', text: 'User updated successfully' };
               addMessage(success);
            }
         })
         .catch(() => {
            const error: Message = { type: 'error', text: 'Cannot update user...' };
            addMessage(error);
         });
   };

   const handleUpdateEmail = async () => {
      if (email === '') {
         const error: Message = { type: 'error', text: 'Please fill in all fields' };
         addMessage(error);
         setEmail(user?.email || '');
         return;
      }
      
      if (email === user?.email) {
         return;
      }

      updateUser({ email })
         .then((res) => {
            if (res === '200') {
               // Assuming `updateUser` returns a string
               const success: Message = { type: 'success', text: 'User updated successfully' };
               addMessage(success);
            }
         })
         .catch(() => {
            const error: Message = { type: 'error', text: 'Cannot update user...' };
            addMessage(error);
            setEmail(user?.email || '');
         });
   };

   return (
      <div className={styles.page}>
         <div className={styles.container}>
            <div className={styles.content}>
               <h1 className={styles.title}>Personal info</h1>
               <div className={styles.name}>
                  <NameBlock val={first_name} setVal={setFirstName}>
                     Legal first name
                  </NameBlock>
                  <NameBlock val={last_name} setVal={setLastName}>
                     Legal last name
                  </NameBlock>
               </div>
               <button className={styles.save_btn} onClick={() => handleSaveName()}>
                  Save
               </button>
               <AdditionalInfoBlock
                  title="Email adress"
                  val={email}
                  setVal={setEmail}
                  handleSave={handleUpdateEmail}
                  id="email"
               />

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
