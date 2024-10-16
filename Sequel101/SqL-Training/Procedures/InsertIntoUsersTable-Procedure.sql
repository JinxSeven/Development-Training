/*CREATE PROCEDURE addUserProcedure
@email VARCHAR(50),
@name VARCHAR(25),
@password NVARCHAR(255)
AS
BEGIN
	INSERT INTO Users 
	(Name, Email, Password) VALUES (@name, @email, @password);
END;

EXEC addUserProcedure
@name = 'Carl Johnson', @email = 'cj.grovest@email.com', 
@password = testPass101;*/