/*CREATE PROCEDURE deleteTransactionProcedure
@user_id INT,
@nth INT
AS
BEGIN
	BEGIN TRY
		DELETE FROM Transactions
		WHERE UserId = @user_id AND Nth = @nth;
	END TRY
	BEGIN CATCH
		PRINT 'deleteTransactionProcedure: ' + ERROR_MESSAGE();
	END CATCH
END;

EXEC deleteTransactionProcedure @user_id = 111, @nth = 1*/
