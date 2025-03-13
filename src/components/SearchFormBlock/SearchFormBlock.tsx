import classNames from 'classnames';
import styles from './SearchFormBlock.module.scss';
import { City } from '../../types/City';
import { Category } from '../../types/Category';

type Props2 = {
   type: 'city' | 'category';

   id: number;

   title: string;
   subtitle: string;

   param: string;
   setParam: (arg: string) => void;

   selBlock: number;
   setSelBlock: (arg: number) => void;

   selInp: number;
   setSelInp: (arg: number) => void;

   input: string;
   setInput: (arg: string) => void;

   array: City[] | Category[];
   updateURL: (arg1: string, arg2: string) => void;
};

export const SearchFormBlock: React.FC<Props2> = ({
   type,
   id,
   title,
   subtitle,
   param,
   setParam,
   selBlock,
   setSelBlock,
   selInp,
   setSelInp,
   input,
   setInput,
   array,
   updateURL,
}) => {
   return (
      <div className={classNames(styles.block, 'sfb_popup')} id={`${id}`}>
         {param === '' ? (
            <div className={styles.title}>
               <h3>{title}</h3>
               <p>{subtitle}</p>
            </div>
         ) : (
            <div className={styles.title}>
               <h3>{param}</h3>
            </div>
         )}

         <div
            className={classNames(styles.popup, {
               [styles.popup_active]: selBlock === id,
            })}
         >
            <div className={styles.popup_content}>
               <label
                  className={classNames(styles.popup_label, {
                     [styles.popup_label_active]: selInp === id,
                  })}
               >
                  <span>
                     <img src="/images/other/icons/black-search-icon.svg" alt="Search" />
                  </span>
                  <input
                     type="text"
                     name="city"
                     placeholder="Start writing the city"
                     autoComplete="off"
                     onChange={(e) => setInput(e.target.value)}
                     onFocus={() => setSelInp(id)}
                     onBlur={() => {
                        setSelInp(-1);
                     }}
                     value={input}
                     id={`${id}`}
                  />
               </label>
               <ul className={styles.popup_list}>
                  {array
                     .filter((item: City | Category) =>
                        item.title.toLowerCase().includes(input.toLowerCase()),
                     )
                     .map((item: City | Category) => (
                        <li
                           className={classNames(styles.popup_item, {
                              [styles.popup_item_cat]: type === 'category',
                           })}
                           onClick={() => {
                              setParam(item.title);
                              setInput('');
                              setTimeout(() => setSelBlock(-1), 1);
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
   );
};
