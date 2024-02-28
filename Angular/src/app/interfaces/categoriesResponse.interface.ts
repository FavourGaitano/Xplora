export interface categoriesResponse {
  categories: [
    {
      category_id: string;
      name: string;
      
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
