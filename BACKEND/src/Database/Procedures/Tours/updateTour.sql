CREATE PROCEDURE updateTour(
    @tour_id VARCHAR(100), 
        @title VARCHAR(200),
        @image VARCHAR(255),
        @description VARCHAR(200),
        @location VARCHAR(200),
        @start_date VARCHAR(200),
        @end_date VARCHAR(200),
        @price VARCHAR(200),
        @category_id VARCHAR(200)
    )
AS
BEGIN
    UPDATE Tours SET 
        title=@title, 
        image=@image, 
        description=@description, 
        location=@location,
        start_date=@start_date,
        end_date=@end_date,
        price=@price,
        category_id=@category_id
        
    WHERE tour_id = @tour_id
END