
export interface bookingsResponse {
  bookings: [
    {

      user_id: string;
      tour_id: string;
      booking_date: string;
      iscancelled: string;
      isreviewsopen: string;

    }
  ];
  error: {
    name: string;
    message: string;
  };
}

export interface bookingsResponse0 {
  booking: [
    {
      booking_id: string;
      user_id: string;
      tour_id: string;
      booking_date: string;
      iscancelled: string;
      isreviewsopen: string;

    }
  ];
  error: {
    name: string;
    message: string;
  };
}
