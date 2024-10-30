using Microsoft.Data.SqlClient;
using System;

namespace TaskTracker.Data
{
    public class TasksRepo
    {
        private readonly IDataAccess _dataAccess;
        public TasksRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public List<Object> GetTasks(int user_id)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand getTasksCmd = new SqlCommand("SELECT * FROM fnGetUserTasks(@user_id)", connection);
                getTasksCmd.Parameters.AddWithValue("@user_id", user_id);
                var reader = getTasksCmd.ExecuteReader();

                var userTasks = new List<Object>();
                while (reader.Read())
                {
                    userTasks.Add(new
                    {
                        Id = reader["id"],
                        UserId = reader["userId"],
                        ClientName = reader["clientName"],
                        ProjectName = reader["projectName"],
                        TaskTitle = reader["taskTitle"],
                        Hours = reader["hours"],
                        DateTime = reader["dateTime"],
                        AssignedTo = reader["assignedTo"],
                        AssignedBy = reader["assignedBy"],
                        SupportType = reader["supportType"],
                        Priority = reader["priority"],
                        Description = reader["description"],
                    });
                }

                reader.Close();
                connection.Close();

                return userTasks;
            }
        }

        public int AddNewTask(Models.TaskData taskData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand addNewTaskCmd = new SqlCommand("spAddTask", connection);
                addNewTaskCmd.CommandType = System.Data.CommandType.StoredProcedure;
                addNewTaskCmd.Parameters.AddWithValue("@user_id", taskData.UserId);
                addNewTaskCmd.Parameters.AddWithValue("@client_name", taskData.ClientName);
                addNewTaskCmd.Parameters.AddWithValue("@project_name", taskData.ProjectName);
                addNewTaskCmd.Parameters.AddWithValue("@task_title", taskData.TaskTitle);
                addNewTaskCmd.Parameters.AddWithValue("@hours", taskData.Hours);
                addNewTaskCmd.Parameters.AddWithValue("@date_time", taskData.DateTime);
                addNewTaskCmd.Parameters.AddWithValue("@assigned_to", taskData.AssignedTo);
                addNewTaskCmd.Parameters.AddWithValue("@assigned_by", taskData.AssignedBy);
                addNewTaskCmd.Parameters.AddWithValue("@support_type", taskData.supportType);
                addNewTaskCmd.Parameters.AddWithValue("@priority", taskData.Priority);
                addNewTaskCmd.Parameters.AddWithValue("@description", taskData.Description);

                var response = Convert.ToInt32(addNewTaskCmd.ExecuteScalar());
                connection.Close();

                return response;
            }
        }

        public void EditTask(Models.TaskData taskData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand editTaskCmd = new SqlCommand("spEditTask", connection);
                editTaskCmd.CommandType = System.Data.CommandType.StoredProcedure;
                editTaskCmd.Parameters.AddWithValue("@task_id", taskData.Id);
                editTaskCmd.Parameters.AddWithValue("@client_name", taskData.ClientName);
                editTaskCmd.Parameters.AddWithValue("@project_name", taskData.ProjectName);
                editTaskCmd.Parameters.AddWithValue("@task_title", taskData.TaskTitle);
                editTaskCmd.Parameters.AddWithValue("@hours", taskData.Hours);
                editTaskCmd.Parameters.AddWithValue("@date_time", taskData.DateTime);
                editTaskCmd.Parameters.AddWithValue("@assigned_to", taskData.AssignedTo);
                editTaskCmd.Parameters.AddWithValue("@assigned_by", taskData.AssignedBy);
                editTaskCmd.Parameters.AddWithValue("@support_type", taskData.supportType);
                editTaskCmd.Parameters.AddWithValue("@priority", taskData.Priority);
                editTaskCmd.Parameters.AddWithValue("@description", taskData.Description);
                editTaskCmd.ExecuteNonQuery();

                connection.Close();
            }
        }

        public void DeleteTask(int taskId)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                var deleteTaskCmd = new SqlCommand("spDeleteTask", connection);
                deleteTaskCmd.CommandType = System.Data.CommandType.StoredProcedure;
                deleteTaskCmd.Parameters.AddWithValue("@task_id", taskId);
                deleteTaskCmd.ExecuteNonQuery();

                connection.Close();
            }
        }
    }
}
