CREATE OR ALTER PROCEDURE GetBookingsByUserId (@user_id VARCHAR(200) )
    
AS
BEGIN
    SELECT 
    b.booking_id, 
    t.title AS tour_name, 
    t.image AS tour_image,  
    u.name AS user_name, 
    b.booking_date, 
    b.iscancelled
    FROM 
    Bookings b
    JOIN 
    Tours t ON b.tour_id = t.tour_id
    JOIN 
    Users u ON b.user_id = u.user_id

    
    WHERE u.user_id = @user_id AND
     b.iscancelled = 0;
END;
