CREATE OR ALTER PROCEDURE registerUser(
        @user_id VARCHAR(100), 
        @name VARCHAR(200),
        @email VARCHAR(255),
        @password VARCHAR(200)
       

    )
AS
BEGIN
    INSERT INTO Users(user_id, name, email,password)
    VALUES(@user_id, @name, @email,@password)
END

SELECT * FROM Users