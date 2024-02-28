CREATE PROCEDURE updateCategory(
    @category_id VARCHAR(100),
    @name VARCHAR(200), 
    @description VARCHAR(200)
   
    )
AS
BEGIN
    UPDATE Categories SET 
        name=@name, 
        description=@description
        
        
    WHERE category_id = @category_id
END