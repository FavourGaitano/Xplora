CREATE OR ALTER PROCEDURE CheckReviewExists
    @booking_id VARCHAR(255)
AS
BEGIN
    
    SELECT * FROM Reviews WHERE booking_id = @booking_id;

    
END;

