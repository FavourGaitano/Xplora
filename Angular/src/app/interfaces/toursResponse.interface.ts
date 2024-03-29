

export interface tourResponse {
  tours: [
    {
      tour_id: string;
      title: string;
      image: string;
      description: string;
      location: string;
      start_date: string;
      end_date: string;
      price: string;
      created_at: string;
      category_id: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
