using Microsoft.Data.SqlClient;
using System;
using TaskTracker.Models;

namespace TaskTracker.Data
{
    public class TasksRepo
    {
        private readonly IDataAccess _dataAccess;
        public TasksRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public List<TaskData> GetTasks(Guid userId)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand getTasksCmd = new SqlCommand("SELECT * FROM Tasks WHERE user_id = @user_id", connection);
                getTasksCmd.Parameters.AddWithValue("@user_id", userId);
                var reader = getTasksCmd.ExecuteReader();

                var userTasks = new List<TaskData>();
                while (reader.Read())
                {
                    userTasks.Add(new TaskData
                    {
                        Id = Guid.Parse(reader["id"].ToString()!),
                        UserId = Guid.Parse(reader["user_id"].ToString()!),
                        ClientName = reader["client_name"].ToString()!,
                        ProjectName = reader["project_name"].ToString()!,
                        TaskTitle = reader["task_title"].ToString()!,
                        Hours = (decimal)reader["hours"],
                        DateTime = (DateTime)reader["date_time"],
                        AssignedTo = reader["assigned_to"].ToString()!,
                        AssignedBy = reader["assigned_by"].ToString()!,
                        TaskState = reader["task_state"].ToString()!,
                        Priority = reader["priority"].ToString()!,
                        Description = reader["description"].ToString()!,
                    });
                }

                reader.Close();
                connection.Close();

                return userTasks;
            }
        }

        public Guid AddNewTask(Models.TaskData taskData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand addNewTaskCmd = new SqlCommand("usp_AddTask", connection);
                addNewTaskCmd.CommandType = System.Data.CommandType.StoredProcedure;
                addNewTaskCmd.Parameters.AddWithValue("@user_id", taskData.UserId);
                addNewTaskCmd.Parameters.AddWithValue("@client_name", taskData.ClientName);
                addNewTaskCmd.Parameters.AddWithValue("@project_name", taskData.ProjectName);
                addNewTaskCmd.Parameters.AddWithValue("@task_title", taskData.TaskTitle);
                addNewTaskCmd.Parameters.AddWithValue("@hours", taskData.Hours);
                addNewTaskCmd.Parameters.AddWithValue("@date_time", taskData.DateTime);
                addNewTaskCmd.Parameters.AddWithValue("@assigned_to", taskData.AssignedTo);
                addNewTaskCmd.Parameters.AddWithValue("@assigned_by", taskData.AssignedBy);
                addNewTaskCmd.Parameters.AddWithValue("@task_state", taskData.TaskState);
                addNewTaskCmd.Parameters.AddWithValue("@priority", taskData.Priority);
                addNewTaskCmd.Parameters.AddWithValue("@description", taskData.Description);

                SqlParameter outputIdParam = new SqlParameter("@task_id", System.Data.SqlDbType.UniqueIdentifier)
                {
                    Direction = System.Data.ParameterDirection.Output
                };
                addNewTaskCmd.Parameters.Add(outputIdParam);

                addNewTaskCmd.ExecuteNonQuery();

                Guid newTaskId = (Guid)outputIdParam.Value;

                return newTaskId;
            }
        }

        public void EditTask(Models.TaskData taskData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand editTaskCmd = new SqlCommand("usp_EditTask", connection);
                editTaskCmd.CommandType = System.Data.CommandType.StoredProcedure;
                editTaskCmd.Parameters.AddWithValue("@task_id", taskData.Id);
                editTaskCmd.Parameters.AddWithValue("@client_name", taskData.ClientName);
                editTaskCmd.Parameters.AddWithValue("@project_name", taskData.ProjectName);
                editTaskCmd.Parameters.AddWithValue("@task_title", taskData.TaskTitle);
                editTaskCmd.Parameters.AddWithValue("@hours", taskData.Hours);
                editTaskCmd.Parameters.AddWithValue("@date_time", taskData.DateTime);
                editTaskCmd.Parameters.AddWithValue("@assigned_to", taskData.AssignedTo);
                editTaskCmd.Parameters.AddWithValue("@assigned_by", taskData.AssignedBy);
                editTaskCmd.Parameters.AddWithValue("@task_state", taskData.TaskState);
                editTaskCmd.Parameters.AddWithValue("@priority", taskData.Priority);
                editTaskCmd.Parameters.AddWithValue("@description", taskData.Description);
                editTaskCmd.ExecuteNonQuery();

                connection.Close();
            }
        }

        // public void DeleteTask(int taskId)
        // {
        //     using (var connection = _dataAccess.ReturnConn())
        //     {
        //         connection.Open();

        //         var deleteTaskCmd = new SqlCommand("spDeleteTask", connection);
        //         deleteTaskCmd.CommandType = System.Data.CommandType.StoredProcedure;
        //         deleteTaskCmd.Parameters.AddWithValue("@task_id", taskId);
        //         deleteTaskCmd.ExecuteNonQuery();

        //         connection.Close();
        //     }
        // }
    }
}
