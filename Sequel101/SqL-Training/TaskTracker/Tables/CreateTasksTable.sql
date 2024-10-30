IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tasks')
BEGIN
    CREATE TABLE Tasks
    (
        id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
		userId INT NOT NULL,
		clientName VARCHAR(50) NOT NULL,
		projectName VARCHAR(50) NOT NULL,
		taskTitle VARCHAR(50) NOT NULL,
		hours DECIMAL(4, 2) NOT NULL,
        dateTime DATETIME NOT NULL,
		assignedTo VARCHAR(50) NOT NULL, 
		assignedBy VARCHAR(50) NOT NULL,
		supportType VARCHAR(50),
		priority VARCHAR(25),
		description VARCHAR(200)
        FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
    );
END;