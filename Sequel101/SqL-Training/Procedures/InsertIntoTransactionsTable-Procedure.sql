/*CREATE PROCEDURE addTransactionProcedure
@user_id INT,
@type VARCHAR(8),
@amount INT,
@category VARCHAR(15),
@date_and_time DATETIME
AS
BEGIN
	INSERT INTO Transactions 
	(UserId, Type, Amount, Category, DateTime, Nth)
	VALUES (@user_id, @type, @amount, @category, @date_and_time,
	(SELECT TransactionCount FROM Details WHERE UserId = @user_id) + 1);
END;

EXEC addTransactionProcedure 
@user_id = 101, @type = 'expense',
@amount = 250, @category = 'entertainment', @date_and_time = '2024-10-14 10:45:00';*/