CREATE OR ALTER PROCEDURE getAllUsers
AS
BEGIN
    SELECT * FROM Users WHERE isDelete = 0
END