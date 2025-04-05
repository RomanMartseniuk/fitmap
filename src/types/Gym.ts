export interface Gym {
   id: number;
   title: string;
   rate?: string;
   adress: {
      str: string;
      city: string;
   };
   categories: string[];
   contacts: {
      web?: string;
      tel?: string;
      mail?: string;
   };
   price?: string;
   pos: [number, number];
   img_url?: string;
}
