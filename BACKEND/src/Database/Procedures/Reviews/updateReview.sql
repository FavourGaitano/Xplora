CREATE PROCEDURE updateReview(
        @review_id VARCHAR(100), 
        @booking_id VARCHAR(200),
        @rating VARCHAR(255),
        @comment VARCHAR(200),
        @user_id VARCHAR(200)
      
    )
AS
BEGIN
    UPDATE Reviews SET 
        review_id=@review_id, 
        booking_id=@booking_id, 
        rating=@rating, 
        comment=@comment,
        user_id=@user_id
        
        
    WHERE review_id = @review_id
END