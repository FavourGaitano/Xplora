CREATE OR ALTER PROCEDURE getOneCategory(@category_id VARCHAR(50))
AS
BEGIN
    SELECT * FROM Categories WHERE category_id = @category_id;

   
END