

CREATE OR ALTER PROCEDURE createReview(
        @review_id VARCHAR(100), 
        @booking_id VARCHAR(200),
        @rating VARCHAR(255),
        @comment VARCHAR(200),
        @user_id VARCHAR(200)
        

    )
AS
BEGIN
    INSERT INTO Reviews(review_id, booking_id, rating, comment, user_id)
    VALUES(@review_id, @booking_id, @rating ,@comment, @user_id)
END

