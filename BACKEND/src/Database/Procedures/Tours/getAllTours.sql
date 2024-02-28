CREATE OR ALTER PROCEDURE getAllTours
AS
BEGIN
    SELECT 
        T.*,
        C.name AS CategoryName 
    FROM 
        Tours T
        INNER JOIN Categories C ON T.category_id = C.category_id
    WHERE 
        T.isDelete = 0
END
