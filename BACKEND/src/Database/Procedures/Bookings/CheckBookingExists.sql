CREATE OR ALTER PROCEDURE CheckBookingExists
    @user_id VARCHAR(255),
    @tour_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM Bookings
    WHERE user_id = @user_id AND tour_id = @tour_id;
END


