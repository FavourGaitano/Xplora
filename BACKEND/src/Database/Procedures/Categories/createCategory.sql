CREATE OR ALTER PROCEDURE createCategory(
        @category_id VARCHAR(100), 
        @name VARCHAR(200),
        @description VARCHAR(255)
       
       

    )
AS
BEGIN
    INSERT INTO Categories(category_id, name, description)
    VALUES(@category_id, @name, @description)
END

SELECT * FROM Categories