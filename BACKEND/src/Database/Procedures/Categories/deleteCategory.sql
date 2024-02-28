CREATE OR ALTER PROCEDURE deleteCategory(@category_id VARCHAR(100))
AS
BEGIN
    UPDATE Categories SET isDelete = 1 WHERE category_id = @category_id
END