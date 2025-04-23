// export type Gym = {
//    title: string;
//    city: string;
//    address_label: string;
//    categories: string[];
//    coordinates: [number, number] | string;
//    distance: number;
//    weekly_schedule: string;
//    telephone_number: string;
//    site: string;
//    email: string;
//    street: string;
//    house_number: string;
//    district: string;
// }

            /*
"title"
"city"
"address_label"
"categories"
"coordinates"
"distance"
"weekly_schedule"
"telephone_number"
"site"
"email"
"street"
"house_number"
"district"
            */


export type Gym = {
   title: string;
   city: string | null;
   categories: string[];
   coordinates: [number, number] | null;
   weekly_schedule: any[];
   contacts: {
      email: string | null;
      phone: string | null;
      web: string | null;
   };
   address: string;
};
