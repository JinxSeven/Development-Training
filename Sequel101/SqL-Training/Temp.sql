SELECT name AS procedure_name
FROM sys.objects
WHERE type_desc = 'SQL_STORED_PROCEDURE' AND name = 'procedureOne';

EXEC addUserProcedure
@name = 'Michael Townley', @email = 'michael.townley@mproduction.com', 
@password = testPass108;

INSERT INTO Details VALUES (101, 250);

EXEC addTransactionProcedure 
@user_id = 102, @type = 'expense',
@amount = 5550, @category = 'travel', @date_and_time = '2024-11-03 08:25:00';

EXEC addTransactionProcedure 
@user_id = 102, @type = 'expense',
@amount = 2050, @category = 'food', @date_and_time = '2024-11-03 11:55:20';

EXEC addGoalProcedure 
@user_id = 105, @name = 'Test-Goal1',
@target = 2500, @amount = 250;

SELECT *
FROM Transactions t
WHERE UserId = 102;

DELETE FROM Details;
DELETE FROM Transactions;
DELETE FROM Goals;
DELETE FROM Users;

EXEC getUserDetailsProcedure @user_id = 102;
EXEC getUserTransactionsProcedure @user_id = 110;
EXEC getUserExpensesProcedure @user_id = 110;
EXEC getUserIncomesProcedure @user_id = 110;

ALTER TABLE Users  
ADD employee_name string;  

EXEC sp_rename 'Transactions.Nth', 'Id', 'COLUMN';

SELECT * FROM dbo.fnGetUserTransactions(102);

EXEC addGoalContributionProcedure @goal_id = 6,
@amount_to_add = 250;
SELECT * FROM Users;
EXEC deleteGoalProcedure @goal_id = 6;
SELECT * FROM Details;
SELECT * FROM Transactions;
SELECT * FROM Goals;


