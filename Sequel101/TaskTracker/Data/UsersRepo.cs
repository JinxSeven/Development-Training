using Microsoft.Data.SqlClient;
using System.Data;
using TaskTracker.Models;

namespace TaskTracker.Data
{
    public class UsersRepo
    {
        private readonly IDataAccess _dataAccess;
        //private UserData loggerUser;

        public UsersRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public UserData GetLoggerUser(string username, string password)
        {
            UserData loggerUser = null;

            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                using (SqlCommand getLoggedUserCmd = new SqlCommand("spGetLoggedUser", connection))
                {
                    getLoggedUserCmd.CommandType = CommandType.StoredProcedure;
                    getLoggedUserCmd.Parameters.AddWithValue("@username", username);
                    getLoggedUserCmd.Parameters.AddWithValue("@password", password);

                    var reader = getLoggedUserCmd.ExecuteReader();

                    if (reader.Read())
                    {
                        loggerUser = new UserData
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Username = reader["userName"].ToString()!,
                            Email = reader["email"].ToString()!
                        };
                    }

                    reader.Close();
                }
            }

            return loggerUser;
        }


        public void AddNewUser(UserData userData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand addNewUSerCmd = new SqlCommand("spAddUser", connection);
                addNewUSerCmd.CommandType = CommandType.StoredProcedure;
                addNewUSerCmd.Parameters.AddWithValue("@username", userData.Username);
                addNewUSerCmd.Parameters.AddWithValue("@email", userData.Email);
                addNewUSerCmd.Parameters.AddWithValue("@password", userData.Password);
                addNewUSerCmd.ExecuteNonQuery();

                connection.Close();
            }
        }

        public void DeleteUser(int user_id)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand deleteUSerCmd = new SqlCommand("spDeleteUser", connection);
                deleteUSerCmd.CommandType = CommandType.StoredProcedure;
                deleteUSerCmd.Parameters.AddWithValue("@user_id", user_id);
                deleteUSerCmd.ExecuteNonQuery();

                connection.Close();
            }
        }
    }
}
