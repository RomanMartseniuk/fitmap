import { useCallback, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import styles from './SearchForm.module.scss';

import { CitiesContext } from '../../app/store/CitiesContext';
import { CategoriesContext } from '../../app/store/CategoriesContext';
import { SearchFormBlock } from '../SearchFormBlock';

type Props = {
   className?: string;
   onSearch?: () => void;
};

export const SearchForm: React.FC<Props> = ({ className, onSearch = () => {} }) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const { cities } = useContext(CitiesContext);
   const { categories } = useContext(CategoriesContext);

   // Updates URL Search Params
   const updateURL = useCallback(
      (key: string, val: string) => {
         setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            if (newParams.has(key)) {
               newParams.delete(key);
            }
            newParams.append(key, val);

            if (newParams.get(key) === '') {
               newParams.delete(key);
            }
            return newParams;
         });
      },
      [searchParams],
   );

   return (
      <div className={classNames(className, styles.searchForm)}>
         <div className={styles.content}>
            <SearchFormBlock
               type="city"
               arr={cities}
               updateURL={updateURL}
               className={styles.block}
            >
               <div id="title">
                  <h1>Where</h1>
                  <p>Search destination</p>
               </div>
            </SearchFormBlock>
            <SearchFormBlock
               type="category"
               arr={categories}
               updateURL={updateURL}
               className={styles.block}
            >
               <div id="title">
                  <h1>What</h1>
                  <p>Search category</p>
               </div>
            </SearchFormBlock>
            <Link
               to={{ pathname: '../map/', search: searchParams.toString() }}
               className={styles.button}
               onClick={onSearch}
            >
               <img src="/images/other/icons/black-search-icon.svg" alt="Search" />
            </Link>
         </div>
      </div>
   );
};
