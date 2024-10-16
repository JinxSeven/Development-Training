IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Details')
BEGIN
    CREATE TABLE Details
    (
        UserId INT NOT NULL,
        Income INT DEFAULT 0,
        Expense INT DEFAULT 0,
        Balance INT DEFAULT 0,
        TransactionCount INT DEFAULT 0,
        GoalCount INT DEFAULT 0,
        FOREIGN KEY (UserId) REFERENCES Users(Id)
    );
END;

EXEC addDetailProcedure
@user_id = 101, @income = 2500, @expense = 250;