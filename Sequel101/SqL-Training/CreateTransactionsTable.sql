IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Transactions')
BEGIN
    CREATE TABLE Transactions
    (
        UserId INT NOT NULL,
        Type VARCHAR(8) NOT NULL,
        Amount INT NOT NULL,
        Category VARCHAR(15) NOT NULL,
		DateTime VARCHAR(25) NOT NULL,
		Id INT IDENTITY(1, 1) PRIMARY KEY,
        FOREIGN KEY (UserId) REFERENCES Users(Id)
    );
END;
