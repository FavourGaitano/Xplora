CREATE OR ALTER PROCEDURE getOneReview(@review_id VARCHAR(50))
AS
BEGIN
    SELECT * FROM Reviews WHERE review_id = @review_id;

   
END