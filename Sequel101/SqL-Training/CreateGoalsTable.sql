IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Goals')
BEGIN
    CREATE TABLE Goals
    (
        UserId INT NOT NULL,
        Name VARCHAR(15) NOT NULL,
        Target INT NOT NULL,
        Amount INT DEFAULT 0,
		Id INT IDENTITY(1, 1) PRIMARY KEY,
        FOREIGN KEY (UserId) REFERENCES Users(Id)
    );
END;

EXEC addGoalProcedure 
@user_id = 101, @name = 'expense',
@target = 2500, @amount = 250;
