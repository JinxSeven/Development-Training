CREATE TABLE user_transactions
	(
	UserID INT IDENTITY(101, 1),
	TransactionDate VARCHAR(10),
	TransactionType VARCHAR(7),
	TransactionCategory VARCHAR(15),
	TransactionAmount INT
	);