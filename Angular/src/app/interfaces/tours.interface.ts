export interface Tour{
  tour_id:string;
  title:string;
  image:string;
  description:string;
  location:string;
  start_date:string;
  end_date:string;
  price:string;
  category_id?:string;


}

export interface updateTour{
  title:string;
  image:string;
  description:string;
  location:string;
  start_date:string;
  end_date:string;
  price:string;
  category_id?:string;

}
