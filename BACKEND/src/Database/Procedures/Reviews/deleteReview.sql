CREATE OR ALTER PROCEDURE deleteReview(@review_id VARCHAR(100))
AS
BEGIN
    UPDATE Reviews SET isDelete = 1 WHERE review_id = @review_id
END