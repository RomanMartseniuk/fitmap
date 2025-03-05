import PlusIcon from '../PlusIcon/PlusIcon';
import styles from './GymList.module.scss';
import styles2 from './GymListItem.module.scss';


const item = {
   id: 0,
   title: 'Gym',
   descr: '...',
   rate: 4.6,
   price: '200-400₴',
   category: 'Gym',
   img_url: '/images/category_images/gym.jpg',
};

type Gym = typeof item

type ItemProps = {
   item: Gym;
}

const Item: React.FC<ItemProps> = ({item}) => {
   return (
      <div className={styles2.item}>
         <div className={styles2.img}>
            <img src={item.img_url} alt={item.title} />
         </div>
         <h1 className={styles2.title}>{item.title}</h1>
         <span className={styles2.rate}>
            <p>{item.rate}</p>
            <img src="/images/other/icons/black-rate-star-icon.svg" alt="Rate" />
         </span>
         <span className={styles2.price}>{item.price}</span>
         <div className={styles2.button}>
            <p>See Details</p>
            <PlusIcon className={styles2.btn_icon} />
         </div>
      </div>
   );
};

export const GymList = () => {
   return (
      <div className="gym_list">
         <nav className="nav">
            <div className="filters"><img src="" alt="Filters" /></div>
         </nav>
         <ul className="list">
            <Item item={item}/>
         </ul>
      </div>
   );
};
