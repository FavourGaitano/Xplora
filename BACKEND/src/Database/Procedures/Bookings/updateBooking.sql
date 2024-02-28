CREATE PROCEDURE updateBooking(
        @booking_id VARCHAR(100), 
        @user_id VARCHAR(200),
        @tour_id VARCHAR(255)
        
      
    )
AS
BEGIN
    UPDATE Bookings SET 
        booking_id=@booking_id, 
        user_id=@user_id, 
        tour_id=@tour_id 
        
       
        
    WHERE booking_id = @booking_id
END