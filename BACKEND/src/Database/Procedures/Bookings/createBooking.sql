CREATE OR ALTER PROCEDURE createBooking(
    
        @booking_id VARCHAR(100),
        @user_id VARCHAR(200),
        @tour_id VARCHAR(255) 
        

    )
AS
BEGIN
    INSERT INTO Bookings(booking_id, tour_id, user_id)
    VALUES( @booking_id, @tour_id ,@user_id)
END

