CREATE OR ALTER PROCEDURE getOneBooking(@booking_id VARCHAR(50))
AS
BEGIN
    SELECT * FROM Bookings WHERE booking_id = @booking_id;

   
END