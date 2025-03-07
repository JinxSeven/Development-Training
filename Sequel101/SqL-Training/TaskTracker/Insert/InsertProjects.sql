USE [TaskTracker]
GO
--
-- Projects for GreenGrocers Ltd (Client ID: ab57039b-d1bf-4f1c-9d3b-3502f7e7ec25)
INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'GreenGrocers Online Store', 'Develop an online store for GreenGrocers.', '2024-10-01', '2024-12-15', 'ab57039b-d1bf-4f1c-9d3b-3502f7e7ec25');

INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'GreenGrocers Inventory System', 'Implement an inventory management system.', '2024-11-15', '2025-01-30', 'ab57039b-d1bf-4f1c-9d3b-3502f7e7ec25');

INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'GreenGrocers Loyalty Program', 'Create a customer loyalty program.', '2024-12-01', '2025-02-28', 'ab57039b-d1bf-4f1c-9d3b-3502f7e7ec25');

-- Projects for TechSolutions Ltd (Client ID: 945d534c-e291-45f8-870c-48c476587c6d)
INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'TechSolutions Cloud Migration', 'Migrate TechSolutions services to the cloud.', '2024-09-15', '2024-11-30', '945d534c-e291-45f8-870c-48c476587c6d');

INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'TechSolutions Data Analytics Platform', 'Develop a data analytics platform.', '2024-10-15', '2025-01-15', '945d534c-e291-45f8-870c-48c476587c6d');

INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'TechSolutions Security Audit', 'Conduct a comprehensive security audit.', '2024-11-01', '2024-12-31', '945d534c-e291-45f8-870c-48c476587c6d');

-- Projects for BrightDesigns Ltd (Client ID: fec9125a-fa1a-4cb4-9d81-99b47373da0d)
INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'BrightDesigns Website Refresh', 'Refresh the BrightDesigns company website.', '2024-11-01', '2025-01-31', 'fec9125a-fa1a-4cb4-9d81-99b47373da0d');

INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'BrightDesigns Social Media Campaign', 'Launch a social media marketing campaign.', '2024-12-15', '2025-03-15', 'fec9125a-fa1a-4cb4-9d81-99b47373da0d');

INSERT INTO [dbo].[Projects] ([id], [project_name], [description], [start_date], [end_date], [client_id])
VALUES (NEWID(), 'BrightDesigns Product Packaging Design', 'Design new product packaging.', '2025-01-01', '2025-03-31', 'fec9125a-fa1a-4cb4-9d81-99b47373da0d');

GO