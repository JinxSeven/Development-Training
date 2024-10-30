IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Activities')
BEGIN
    CREATE TABLE Activities
    (
        id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		taskId INT NOT NULL,
		activityTitle VARCHAR(50) NOT NULL,
		description VARCHAR(200) NOT NULL,
		hours DECIMAL(2, 2) NOT NULL
        FOREIGN KEY (taskId) REFERENCES Tasks(id) ON DELETE CASCADE
    );
END;