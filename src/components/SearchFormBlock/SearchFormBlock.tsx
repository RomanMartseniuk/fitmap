import React, { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './SearchFormBlock.module.scss';
import { City } from '../../types/City';
import { Category } from '../../types/Category';
import { useSearchParams } from 'react-router-dom';

type Props = {
   type: 'category' | 'city';
   children: ReactNode;
   arr: City[] | Category[];
   updateURL: (arg1: string, arg2: string) => void;
   className?: string;
};

export const SearchFormBlock: React.FC<Props> = ({ type, children, arr, updateURL, className }) => {
   // Popup state
   const [isOpen, setIsOpen] = useState(false);
   const popupRef = useRef<HTMLDivElement | null>(null);

   const onClose = useCallback(() => setIsOpen(false), [isOpen]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isOpen, onClose]);

   // Work with Children elements
   const childrenArray = React.Children.toArray(children) as ReactElement<{
      id?: string;
      className?: string;
   }>[];

   // Handle 'title' element from children, clone it and add class
   const titleElement = childrenArray
      .filter(
         (child): child is ReactElement<{ id: string; className: string }> =>
            child.props?.id === 'title',
      ) // Filter children by 'title' id
      .map((child) =>
         React.cloneElement(child, {
            className: `${child.props.className || ''} ${styles.title}`.trim(), // Add custom class to title element
         }),
      );

   // Data state
   const [searchParams] = useSearchParams();

   const [param, setParam] = useState('');
   const [isWriting, setIsWriting] = useState(false);
   const [val, setVal] = useState('');

   useEffect(() => {
      const param = searchParams.get(type);
      setParam(param || '');
   }, []);

   return (
      <>
         <div
            className={classNames(styles.block, className)}
            ref={popupRef}
            onClick={() => setIsOpen(true)}
         >
            {param === '' ? (
               titleElement // Render filtered and styled title
            ) : (
               <div className={styles.title}>
                  <h1>
                     {param}
                     <div
                        className={styles.close_btn}
                        onClick={() => {
                           updateURL(`${type}`, '');
                           setParam('');
                        }}
                     >
                        <img src="/images/other/icons/white-close-icon.svg" alt="close" />
                     </div>
                  </h1>
               </div>
            )}

            <div
               className={classNames(styles.popup, {
                  [styles.popup_active]: isOpen, // Conditionally show popup
               })}
            >
               <div className={styles.popup_content}>
                  <label
                     className={classNames(styles.popup_label, {
                        [styles.popup_label_active]: isWriting, // Add active class when writing
                     })}
                  >
                     <span>
                        <img src="/images/other/icons/black-search-icon.svg" alt="Search" />
                     </span>
                     <input
                        type="text"
                        name={type}
                        placeholder={`Start writing the ${type}`}
                        autoComplete="off"
                        onChange={(e) => setVal(e.target.value)}
                        onFocus={() => setIsWriting(true)}
                        onBlur={() => setIsWriting(false)}
                        value={val}
                     />
                  </label>
                  <ul className={styles.popup_list}>
                     {arr
                        .filter((item: City | Category) =>
                           item.title.toLowerCase().includes(val.toLowerCase()),
                        )
                        .map((item: City | Category) => (
                           <li
                              className={classNames(styles.popup_item, {
                                 [styles.popup_item_cat]: type === 'category',
                              })}
                              onClick={() => {
                                 setParam(item.title);
                                 setVal('');
                                 setTimeout(() => onClose(), 1); // Close the popup after selection
                                 updateURL(`${type}`, item.title);
                              }}
                              key={item.id}
                           >
                              {type === 'city' ? (
                                 <img src={item.img_url} alt={item.title} />
                              ) : (
                                 <img src={(item as Category).icon_url} alt={item.title} />
                              )}

                              <h3>{item.title}</h3>
                           </li>
                        ))}
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
};
