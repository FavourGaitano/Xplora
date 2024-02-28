CREATE OR ALTER PROCEDURE CheckUserExists
    @email VARCHAR(255)
AS
BEGIN
    
    SELECT * FROM Users WHERE email = @email;

    
END;