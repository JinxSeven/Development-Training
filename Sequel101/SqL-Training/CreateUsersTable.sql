IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users')
BEGIN
    CREATE TABLE Users
    (
        Id INT IDENTITY(101, 1) PRIMARY KEY,
        Name VARCHAR(25),
        Email VARCHAR(50),
        Password VARCHAR(255)
    );
END;

