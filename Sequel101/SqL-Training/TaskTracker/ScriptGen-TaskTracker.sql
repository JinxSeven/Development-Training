USE [master]
GO
/****** Object:  Database [TaskTracker]    Script Date: 22-03-2025 02:23:10 AM ******/
CREATE DATABASE [TaskTracker]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TaskTracker', FILENAME = N'C:\Users\samuel.koilraj\TaskTracker.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TaskTracker_log', FILENAME = N'C:\Users\samuel.koilraj\TaskTracker_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [TaskTracker] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TaskTracker].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TaskTracker] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TaskTracker] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TaskTracker] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TaskTracker] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TaskTracker] SET ARITHABORT OFF 
GO
ALTER DATABASE [TaskTracker] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TaskTracker] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TaskTracker] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TaskTracker] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TaskTracker] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TaskTracker] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TaskTracker] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TaskTracker] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TaskTracker] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TaskTracker] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TaskTracker] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TaskTracker] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TaskTracker] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TaskTracker] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TaskTracker] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TaskTracker] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TaskTracker] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TaskTracker] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [TaskTracker] SET  MULTI_USER 
GO
ALTER DATABASE [TaskTracker] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TaskTracker] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TaskTracker] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TaskTracker] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TaskTracker] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TaskTracker] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [TaskTracker] SET QUERY_STORE = OFF
GO
USE [TaskTracker]
GO
/****** Object:  Table [dbo].[Activities]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Activities](
	[id] [uniqueidentifier] NOT NULL,
	[task_id] [uniqueidentifier] NOT NULL,
	[activity_title] [varchar](50) NOT NULL,
	[description] [varchar](200) NOT NULL,
	[hours] [decimal](4, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[id] [uniqueidentifier] NOT NULL,
	[client_name] [nvarchar](100) NOT NULL,
	[contact_mail] [nvarchar](255) NULL,
	[contact_phone] [nvarchar](20) NULL,
	[created_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Compliances]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Compliances](
	[id] [uniqueidentifier] NOT NULL,
	[comp_name] [nvarchar](200) NOT NULL,
	[comp_description] [nvarchar](500) NULL,
	[req_percentage] [decimal](5, 2) NULL,
	[created_by] [nvarchar](100) NULL,
	[created_date] [datetime] NULL,
 CONSTRAINT [PK__Complian__3213E83F43D8FBB7] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Options]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Options](
	[id] [uniqueidentifier] NOT NULL,
	[quest_id] [uniqueidentifier] NULL,
	[option_txt] [nvarchar](200) NOT NULL,
	[is_correct] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Presentations]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Presentations](
	[id] [uniqueidentifier] NOT NULL,
	[comp_id] [uniqueidentifier] NULL,
	[file_name] [nvarchar](255) NULL,
	[file_data] [varbinary](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[id] [uniqueidentifier] NOT NULL,
	[project_name] [nvarchar](100) NOT NULL,
	[description] [nvarchar](max) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[client_id] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Questions]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Questions](
	[id] [uniqueidentifier] NOT NULL,
	[comp_id] [uniqueidentifier] NULL,
	[question_txt] [nvarchar](500) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tasks]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[id] [uniqueidentifier] NOT NULL,
	[user_id] [uniqueidentifier] NOT NULL,
	[client_name] [varchar](50) NOT NULL,
	[project_name] [varchar](50) NOT NULL,
	[task_title] [varchar](50) NOT NULL,
	[hours] [decimal](4, 2) NOT NULL,
	[date_time] [datetime] NOT NULL,
	[assigned_to] [varchar](50) NOT NULL,
	[assigned_by] [varchar](50) NOT NULL,
	[task_state] [varchar](50) NULL,
	[priority] [varchar](25) NULL,
	[description] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserCompliances]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserCompliances](
	[id] [uniqueidentifier] NOT NULL,
	[user_id] [uniqueidentifier] NOT NULL,
	[comp_id] [uniqueidentifier] NOT NULL,
	[assigned_date] [datetime] NULL,
	[is_complete] [bit] NOT NULL,
	[score] [decimal](5, 2) NULL,
	[completed_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [uniqueidentifier] NOT NULL,
	[username] [varchar](25) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[is_admin] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Activities] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[Compliances] ADD  CONSTRAINT [DF__Compliance__id__5CD6CB2B]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Options] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Presentations] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Questions] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Tasks] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[UserCompliances] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[UserCompliances] ADD  DEFAULT (getdate()) FOR [assigned_date]
GO
ALTER TABLE [dbo].[UserCompliances] ADD  DEFAULT ((0)) FOR [is_complete]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Activities]  WITH CHECK ADD FOREIGN KEY([task_id])
REFERENCES [dbo].[Tasks] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Options]  WITH CHECK ADD FOREIGN KEY([quest_id])
REFERENCES [dbo].[Questions] ([id])
GO
ALTER TABLE [dbo].[Presentations]  WITH CHECK ADD  CONSTRAINT [FK__Presentat__comp___60A75C0F] FOREIGN KEY([comp_id])
REFERENCES [dbo].[Compliances] ([id])
GO
ALTER TABLE [dbo].[Presentations] CHECK CONSTRAINT [FK__Presentat__comp___60A75C0F]
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Clients] FOREIGN KEY([client_id])
REFERENCES [dbo].[Clients] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Projects] CHECK CONSTRAINT [FK_Projects_Clients]
GO
ALTER TABLE [dbo].[Questions]  WITH CHECK ADD  CONSTRAINT [FK__Questions__comp___6477ECF3] FOREIGN KEY([comp_id])
REFERENCES [dbo].[Compliances] ([id])
GO
ALTER TABLE [dbo].[Questions] CHECK CONSTRAINT [FK__Questions__comp___6477ECF3]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserCompliances]  WITH CHECK ADD  CONSTRAINT [FK_UserCompliances_Compliances] FOREIGN KEY([comp_id])
REFERENCES [dbo].[Compliances] ([id])
GO
ALTER TABLE [dbo].[UserCompliances] CHECK CONSTRAINT [FK_UserCompliances_Compliances]
GO
ALTER TABLE [dbo].[UserCompliances]  WITH CHECK ADD  CONSTRAINT [FK_UserCompliances_Users] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[UserCompliances] CHECK CONSTRAINT [FK_UserCompliances_Users]
GO
ALTER TABLE [dbo].[Options]  WITH CHECK ADD  CONSTRAINT [CK_Options_CorrectAnswer] CHECK  (([is_correct]=(1) OR [is_correct]=(0)))
GO
ALTER TABLE [dbo].[Options] CHECK CONSTRAINT [CK_Options_CorrectAnswer]
GO
/****** Object:  StoredProcedure [dbo].[usp_AddActivity]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_AddActivity]
@task_id UNIQUEIDENTIFIER,
@activity_title VARCHAR(50),
@description VARCHAR(200),
@hours DECIMAL(4, 2)
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM Tasks WHERE id = @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		INSERT INTO Activities (task_id, activity_title, description, hours)
		VALUES (@task_id, @activity_title, @description, @hours)
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_AddCompliance]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_AddCompliance]
    @comp_name NVARCHAR(200),
    @comp_description NVARCHAR(500),
    @req_percentage DECIMAL(5,2),
    @created_by NVARCHAR(100),
    @file_name NVARCHAR(255),
    @file_data VARBINARY(MAX),
    @questions NVARCHAR(MAX) -- JSON format
AS
BEGIN
    SET NOCOUNT ON;

    -- Declare necessary variables
    DECLARE @comp_id UNIQUEIDENTIFIER = NEWID();
    DECLARE @presentation_id UNIQUEIDENTIFIER;
    DECLARE @question_id UNIQUEIDENTIFIER;
    DECLARE @option_id UNIQUEIDENTIFIER;
    DECLARE @question_txt NVARCHAR(500);
    DECLARE @options NVARCHAR(MAX);
    DECLARE @option_txt NVARCHAR(200);
    DECLARE @is_correct BIT;

    -- Insert into Compliance table
    INSERT INTO Compliances (id, comp_name, comp_description, req_percentage, created_by, created_date)
    VALUES (@comp_id, @comp_name, @comp_description, @req_percentage, @created_by, GETDATE());

    -- Insert into Presentations table if file is provided
    IF @file_name IS NOT NULL AND @file_data IS NOT NULL
    BEGIN
        SET @presentation_id = NEWID();
        INSERT INTO Presentations (id, comp_id, file_name, file_data)
        VALUES (@presentation_id, @comp_id, @file_name, @file_data);
    END;

    -- Insert Questions and Options from JSON data
    DECLARE @jsonQuestions TABLE (question_txt NVARCHAR(500), options NVARCHAR(MAX));

    INSERT INTO @jsonQuestions (question_txt, options)
    SELECT 
        JSON_VALUE(q.value, '$.QuestionText'),
        JSON_QUERY(q.value, '$.Options')
    FROM OPENJSON(@questions) AS q;

    DECLARE question_cursor CURSOR FOR 
    SELECT question_txt, options FROM @jsonQuestions;

    OPEN question_cursor;

    FETCH NEXT FROM question_cursor INTO @question_txt, @options;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @question_id = NEWID();

        -- Insert into Questions table
        INSERT INTO Questions (id, comp_id, question_txt)
        VALUES (@question_id, @comp_id, @question_txt);

        -- ✅ Instead of using a table variable, we use a temporary table for **each question**
        CREATE TABLE #jsonOptions (option_txt NVARCHAR(200), is_correct BIT);
        
        INSERT INTO #jsonOptions (option_txt, is_correct)
        SELECT 
            JSON_VALUE(opt.value, '$.OptionText'),
            JSON_VALUE(opt.value, '$.IsCorrect')
        FROM OPENJSON(@options) AS opt;

        -- Declare and use the cursor for options
        DECLARE option_cursor CURSOR FOR 
        SELECT option_txt, is_correct FROM #jsonOptions;

        OPEN option_cursor;

        FETCH NEXT FROM option_cursor INTO @option_txt, @is_correct;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            SET @option_id = NEWID();

            -- Insert into Options table
            INSERT INTO Options (id, quest_id, option_txt, is_correct)
            VALUES (@option_id, @question_id, @option_txt, @is_correct);

            FETCH NEXT FROM option_cursor INTO @option_txt, @is_correct;
        END;

        CLOSE option_cursor;
        DEALLOCATE option_cursor;

        -- ✅ Drop temporary table after inserting options for the current question
        DROP TABLE #jsonOptions;

        FETCH NEXT FROM question_cursor INTO @question_txt, @options;
    END;

    CLOSE question_cursor;
    DEALLOCATE question_cursor;

    PRINT 'Compliance added successfully!';
END;

GO
/****** Object:  StoredProcedure [dbo].[usp_AddTask]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_AddTask]
@user_id UNIQUEIDENTIFIER,
@client_name VARCHAR(50),
@project_name VARCHAR(50),
@task_title VARCHAR(50),
@hours DECIMAL(4, 2),
@date_time DATETIME,
@assigned_to VARCHAR(50), 
@assigned_by VARCHAR(50),
@task_state VARCHAR(50),
@priority VARCHAR(25),
@description VARCHAR(200),
@task_id UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
	IF NOT EXISTS
	(
		SELECT 1 FROM Users WHERE id = @user_id 
	)
	BEGIN
		RAISERROR('User does not exist!', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		DECLARE @InsertedTask TABLE (task_id UNIQUEIDENTIFIER)
		INSERT INTO Tasks 
		( 
			user_id, client_name, project_name,
			task_title, hours, date_time,
			assigned_to, assigned_by, task_state,
			priority, description
		)
		OUTPUT INSERTED.id INTO @InsertedTask
		VALUES
		(
			@user_id, @client_name, @project_name,
			@task_title, @hours, @date_time,
			@assigned_to, @assigned_by, @task_state,
			@priority, @description
		)
		SELECT @task_id = task_id FROM @InsertedTask;
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_AddUser]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_AddUser]
@username VARCHAR(25),
@email VARCHAR(50),
@password VARCHAR(255),
@is_admin BIT
AS
BEGIN
	SET XACT_ABORT ON;
	IF NOT EXISTS
	(
		SELECT 1 FROM Users 
		WHERE email = @email OR username = @username
	)
	BEGIN
		INSERT INTO Users (userName, email, password, is_admin)
		VALUES (@username, @email, @password, @is_admin);
	END
	ELSE
	BEGIN
		RAISERROR('Email or username already taken!', 16, 1);
		RETURN;
	END
END
GO
/****** Object:  StoredProcedure [dbo].[usp_DeleteTask]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_DeleteTask]
@task_id UNIQUEIDENTIFIER
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Tasks WHERE id =  @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		DELETE Tasks
		WHERE id = @task_id;
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EditTask]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_EditTask]
@task_id UNIQUEIDENTIFIER,
@client_name VARCHAR(50),
@project_name VARCHAR(50),
@task_title VARCHAR(50),
@hours DECIMAL(10, 2),
@date_time DATETIME,
@assigned_to VARCHAR(50), 
@assigned_by VARCHAR(50),
@task_state VARCHAR(50),
@priority VARCHAR(25),
@description VARCHAR(200)
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Tasks WHERE id = @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		UPDATE Tasks
		SET
			client_name = ISNULL(@client_name, client_name),
			project_name = ISNULL(@project_name, project_name),
			task_title = ISNULL(@task_title, task_title),
			hours = ISNULL(@hours, hours),
			date_time = ISNULL(@date_time, date_time),
			assigned_to = ISNULL(@assigned_to, assigned_to),
			assigned_by = ISNULL(@assigned_by, assigned_by),
			task_state = ISNULL(@task_state, task_state),
			priority = ISNULL(@priority, priority),
			description = ISNULL(@description, description)
		WHERE id = @task_id;
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetAdmins]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_GetAdmins]
AS
BEGIN
	SELECT username, id FROM Users
	WHERE is_admin = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetComplianceDetails]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[usp_GetComplianceDetails]
AS
BEGIN
	SELECT c.*,
		(SELECT COUNT(*) FROM Questions q WHERE q.comp_id = c.id) AS quest_count
	FROM Compliances c;
END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetLoggedUser]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_GetLoggedUser]
@username VARCHAR(50),
@password VARCHAR(255)
AS
BEGIN
	IF EXISTS 
	(
		SELECT 1 FROM Users WHERE username = @username
		AND password = @password
	)
	BEGIN
		SELECT * FROM Users WHERE username = @username
		AND password = @password	
	END
	ELSE
	BEGIN
		RAISERROR('Invalid credentials', 16, 1);
		RETURN;
	END
END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUsers]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_GetUsers]
AS
BEGIN
	SELECT username, id FROM Users
	WHERE is_admin = 0;
END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUserStatsById]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetUserStatsById]
    @UserId uniqueidentifier
AS
BEGIN
    -- Total Tasks Assigned
    DECLARE @TotalTasks INT;
    SELECT @TotalTasks = COUNT(*)
    FROM Tasks
    WHERE user_id = @UserId;

    -- Task Status Breakdown
    DECLARE @NewTasks INT, @ActiveTasks INT, @CompletedTasks INT;
    SELECT @NewTasks = COUNT(*)
    FROM Tasks
    WHERE user_id = @UserId AND task_state = 'New';

    SELECT @ActiveTasks = COUNT(*)
    FROM Tasks
    WHERE user_id = @UserId AND task_state = 'Active';

    SELECT @CompletedTasks = COUNT(*)
    FROM Tasks
    WHERE user_id = @UserId AND task_state = 'Complete';

    DECLARE @NewTasksPercentage DECIMAL(5, 2), @ActiveTasksPercentage DECIMAL(5, 2), @CompletedTasksPercentage DECIMAL(5, 2);
    
    -- Handle division by zero for task percentages
    SET @NewTasksPercentage = CASE 
                                WHEN @TotalTasks = 0 THEN 0 
                                ELSE (CAST(@NewTasks AS DECIMAL) / @TotalTasks) * 100 
                              END;
    SET @ActiveTasksPercentage = CASE 
                                   WHEN @TotalTasks = 0 THEN 0 
                                   ELSE (CAST(@ActiveTasks AS DECIMAL) / @TotalTasks) * 100 
                                 END;
    SET @CompletedTasksPercentage = CASE 
                                      WHEN @TotalTasks = 0 THEN 0 
                                      ELSE (CAST(@CompletedTasks AS DECIMAL) / @TotalTasks) * 100 
                                    END;

    -- Assigned Compliances
    DECLARE @TotalCompliances INT, @CompletedCompliances INT;
    SELECT @TotalCompliances = COUNT(*)
    FROM UserCompliances
    WHERE user_id = @UserId;

    SELECT @CompletedCompliances = COUNT(*)
    FROM UserCompliances
    WHERE user_id = @UserId AND is_complete = 1;

    -- Total Hours Logged (All Time)
    DECLARE @TotalHoursLogged DECIMAL(10, 2);
    SELECT @TotalHoursLogged = ISNULL(SUM(hours), 0)
    FROM Tasks
    WHERE user_id = @UserId;

    -- Total Hours Worked for the Week
    DECLARE @TotalHoursWorkedForWeek DECIMAL(10, 2);
    SELECT @TotalHoursWorkedForWeek = ISNULL(SUM(hours), 0)
    FROM Tasks
    WHERE user_id = @UserId
      AND date_time >= DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0) -- Start of the week
      AND date_time < DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()) + 1, 0); -- End of the week

    -- Total Hours Worked for the Day
    DECLARE @TotalHoursWorkedForDay DECIMAL(10, 2);
    SELECT @TotalHoursWorkedForDay = ISNULL(SUM(hours), 0)
    FROM Tasks
    WHERE user_id = @UserId
      AND date_time >= CAST(GETDATE() AS DATE) -- Start of the day
      AND date_time < DATEADD(DAY, 1, CAST(GETDATE() AS DATE)); -- End of the day

    -- Output the results
    SELECT 
        @TotalTasks AS TotalTasks,
        @NewTasksPercentage AS NewTasksPercentage,
        @ActiveTasksPercentage AS ActiveTasksPercentage,
        @CompletedTasksPercentage AS CompletedTasksPercentage,
        @TotalCompliances AS TotalCompliances,
        @CompletedCompliances AS CompletedCompliances,
        @TotalHoursLogged AS TotalHoursLogged,
        @TotalHoursWorkedForWeek AS TotalHoursWorkedForWeek,
        @TotalHoursWorkedForDay AS TotalHoursWorkedForDay;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUserTaskState]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_GetUserTaskState]
AS
BEGIN
	SELECT usr.id, usr.username, usr.email, tsk.task_state
	FROM Users AS usr
	JOIN Tasks AS tsk ON usr.id = tsk.user_id;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUserTaskStats]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetUserTaskStats]
AS
BEGIN
    WITH TaskSummary AS (
        SELECT 
            user_id, 
            COUNT(*) AS total_tasks,
            SUM(CASE WHEN task_state = 'new' THEN 1 ELSE 0 END) AS new_tasks,
            SUM(CASE WHEN task_state = 'complete' THEN 1 ELSE 0 END) AS complete_tasks,
            SUM(CASE WHEN task_state = 'active' THEN 1 ELSE 0 END) AS active_tasks
        FROM Tasks
        GROUP BY user_id
    )
    SELECT 
        U.username, 
        U.email, 
        U.is_admin, 
        ISNULL(T.user_id, U.id) AS user_id, -- Use user ID from Users table if no tasks exist
        ISNULL(T.total_tasks, 0) AS total_tasks, -- Default to 0 if no tasks
        ISNULL((T.new_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS new_percentage, -- Handle division by zero
        ISNULL((T.complete_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS complete_percentage, -- Handle division by zero
        ISNULL((T.active_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS active_percentage -- Handle division by zero
    FROM Users U
    LEFT JOIN TaskSummary T ON U.id = T.user_id; -- Include all users, even those with no tasks
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_HasDuplicate]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[usp_HasDuplicate]
    @TableName NVARCHAR(128),
    @ColumnName NVARCHAR(128),
    @InputString NVARCHAR(MAX),
    @IsDuplicate BIT OUTPUT
AS
BEGIN
    -- Declare a variable to hold the dynamic SQL query
    DECLARE @SQLQuery NVARCHAR(MAX)

    -- Construct the dynamic SQL query
    SET @SQLQuery = N'SELECT @IsDuplicate = CASE WHEN EXISTS (
                          SELECT 1 
                          FROM ' + QUOTENAME(@TableName) + '
                          WHERE ' + QUOTENAME(@ColumnName) + ' = @InputString
                      ) THEN 1 ELSE 0 END'

    -- Execute the dynamic SQL query
    EXEC sp_executesql @SQLQuery, 
                       N'@InputString NVARCHAR(MAX), @IsDuplicate BIT OUTPUT', 
                       @InputString, @IsDuplicate OUTPUT
END
GO
/****** Object:  StoredProcedure [dbo].[usp_IsComplianceAlreadyAssigned]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_IsComplianceAlreadyAssigned]
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
GO
/****** Object:  StoredProcedure [dbo].[usp_UpdateTaskState]    Script Date: 22-03-2025 02:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_UpdateTaskState]
@id UNIQUEIDENTIFIER,
@task_state varchar(50)
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Tasks WHERE id = @id)
	BEGIN
		UPDATE Tasks
			SET task_state = ISNULL(@task_state, task_state)
			WHERE id = @id;
	END
	ELSE
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
	END
END
GO
USE [master]
GO
ALTER DATABASE [TaskTracker] SET  READ_WRITE 
GO
