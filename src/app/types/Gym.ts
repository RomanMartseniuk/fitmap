export type Gym = {
   id: string;
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
