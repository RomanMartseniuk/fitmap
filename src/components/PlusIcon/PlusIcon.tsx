import React from 'react';
import styles from './PlusIcon.module.scss';
import classNames from 'classnames';

type Props = {
   className?: string;
};

const PlusIcon: React.FC<Props> = ({ className }) => {
   return (
      <div className={classNames(styles.icon, className)}>
         <span className={styles.hor}></span>
         <span className={styles.vert}></span>
      </div>
   );
};

export default PlusIcon;
