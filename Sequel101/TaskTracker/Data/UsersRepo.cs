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

        public UserData? GetLoggedUser(string username, string password)
        {
            UserData? loggedUser = null;

            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                using (SqlCommand getLoggedUserCmd = new SqlCommand("usp_GetLoggedUser", connection))
                {
                    getLoggedUserCmd.CommandType = CommandType.StoredProcedure;
                    getLoggedUserCmd.Parameters.AddWithValue("@username", username);
                    getLoggedUserCmd.Parameters.AddWithValue("@password", password);

                    var reader = getLoggedUserCmd.ExecuteReader();

                    if (reader.Read())
                    {
                        loggedUser = new UserData
                        {
                            Id = Guid.Parse(reader["id"].ToString()!),
                            Username = reader["userName"].ToString()!,
                            Email = reader["email"].ToString()!
                        };
                    }

                    reader.Close();
                }
            }

            return loggedUser;
        }


        public void AddNewUser(UserData userData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand addNewUSerCmd = new SqlCommand("usp_AddUser", connection);
                addNewUSerCmd.CommandType = CommandType.StoredProcedure;
                addNewUSerCmd.Parameters.AddWithValue("@username", userData.Username);
                addNewUSerCmd.Parameters.AddWithValue("@email", userData.Email);
                addNewUSerCmd.Parameters.AddWithValue("@password", userData.Password);
                addNewUSerCmd.ExecuteNonQuery();

                connection.Close();
            }
        }
    }
}
