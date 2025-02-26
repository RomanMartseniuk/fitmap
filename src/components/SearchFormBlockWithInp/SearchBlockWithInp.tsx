import { useState } from 'react';
import styles from './SearchBlockWithInp.module.scss';
import classNames from 'classnames';

type BlockProps = {
   id: number;

   title: string;
   description: string;
   inputText: string;

   chooseHandler: (arg: any) => void;

   selected: string;

   selectedBlock: number;
   selectedInput: number;

   setSelectedInput: (arg: number) => void;
   setSelectedBlock: (arg: number) => void;

   array: { id: number; title: string; img_url?: string; icon_url?: string }[];
};

export const SearchBlockWithInp: React.FC<BlockProps> = ({
   title,
   description,
   inputText,

   id,

   selected,

   selectedBlock,
   selectedInput,
   setSelectedInput,
   setSelectedBlock,

   chooseHandler,

   array,
}) => {
   const [inputVal, setInputVal] = useState('');

   return (
      <div className={styles.block} id="0">
         <div className={styles.title}>
            {selected === '' ? (
               <>
                  <h3>{title}</h3>
                  <p>{description}</p>
               </>
            ) : (
               <>
                  <h3>{selected}</h3>
               </>
            )}
         </div>

         <div className={classNames(styles.popup, { [styles.popup_active]: selectedBlock === id })}>
            <div className={styles.content}>
               <label
                  className={classNames(styles.label, {
                     [styles.label_active]: selectedInput === id,
                  })}
               >
                  <span>
                     <img src={search_icon} alt="Search" />
                  </span>
                  <input
                     type="text"
                     placeholder={inputText}
                     autoComplete="off"
                     onChange={(e) => setInputVal(e.target.value)}
                     onFocus={() => setSelectedInput(id)}
                     onBlur={() => {
                        setSelectedInput(-1);
                     }}
                     value={inputVal}
                     id={`${id}`}
                  />
               </label>
               <ul className={styles.list}>
                  {array
                     .filter((item) => item.title.toLowerCase().includes(inputVal.toLowerCase()))
                     .map((item) => (
                        <li
                           className={styles.item}
                           onClick={() => {
                              setInputVal('');
                              chooseHandler(item);
                           }}
                           key={item.id}
                        >
                           <img src={item.img_url || item.icon_url} alt={item.title} />
                           <h3>{item.title}</h3>
                        </li>
                     ))}
               </ul>
            </div>
         </div>
      </div>
   );
};
