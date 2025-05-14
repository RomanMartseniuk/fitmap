import React from 'react';

import styles from './Loader.module.scss';
import classNames from 'classnames';

type Props = {
   className?: string;
};

export const Loader: React.FC<Props> = ({ className = '' }) => {
   return (
      <div className={styles.loaderContainer}>
         <span className={classNames(styles.loader, className)}></span>
      </div>
   );
};
