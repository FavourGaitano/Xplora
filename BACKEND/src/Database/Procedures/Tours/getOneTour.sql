CREATE OR ALTER PROCEDURE getOneTour(@tour_id VARCHAR(50))
AS
BEGIN
    SELECT * FROM Tours WHERE tour_id = @tour_id;

   
END