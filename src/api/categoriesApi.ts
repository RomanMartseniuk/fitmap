//const getCategories = () => fetch('/json/categories.json');

import { client } from '../app/utils/fetchClient';

const getCategories = () => {
   return client.get('/categories/');
};

export default getCategories;
