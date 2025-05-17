//import { client } from '../app/utils/fetchClient';
//
// const getCategories = () => {
//    return client.get('/categories/');
// };

const getCategories = () => {
   return fetch('/json/categories.json');
};

export default getCategories;
