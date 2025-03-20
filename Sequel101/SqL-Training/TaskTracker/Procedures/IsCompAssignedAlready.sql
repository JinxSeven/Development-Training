CREATE PROCEDURE usp_IsComplianceAlreadyAssigned
    @user_id UNIQUEIDENTIFIER,
    @comp_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON; -- Prevents returning the number of rows affected

    IF EXISTS (SELECT 1 FROM UserCompliances WHERE user_id = @user_id AND comp_id = @comp_id)
    BEGIN
        SELECT 1;
    END
    ELSE
    BEGIN
        SELECT 0;
    END
END;