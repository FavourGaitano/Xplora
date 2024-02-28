CREATE OR ALTER PROCEDURE createTour(
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
    INSERT INTO Tours(tour_id, title, image,description,location,start_date,end_date,price,category_id)
    VALUES(@tour_id, @title, @image, @description, @location, @start_date, @end_date, @price, @category_id)
END

