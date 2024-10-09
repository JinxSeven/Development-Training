CREATE TABLE user_goals
	(
	UserID INT IDENTITY(101, 1),
	GoalName VARCHAR(15),
	GoalTarget INT,
	GoalAmount INT DEFAULT 0
	);