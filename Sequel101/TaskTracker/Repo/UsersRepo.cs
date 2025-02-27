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
                            Username = reader["username"].ToString()!,
                            Email = reader["email"].ToString()!,
                            Password = reader["is_admin"].ToString()!
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

        public async Task<List<object?>> GetAllAdminNames() {
            List<object> adminUsers = [];

            using (var connection = _dataAccess.ReturnConn()) {
                await connection.OpenAsync();

                SqlCommand getAdmins = new SqlCommand("usp_GetAdmins", connection);
                getAdmins.CommandType = CommandType.StoredProcedure;
                var reader = await getAdmins.ExecuteReaderAsync();


                while (reader.Read()) {
                    adminUsers.Add(new {
                        username = reader["username"].ToString()!,
                        id = reader["id"].ToString()!,
                    });
                }

                await connection.CloseAsync();
            }

            return adminUsers!;
        }

        public async Task<List<object?>> GetAllUserNames()
        {
            List<object> userUsers = [];

            using (var connection = _dataAccess.ReturnConn()) {
                await connection.OpenAsync();

                SqlCommand getAdmins = new SqlCommand("usp_GetUsers", connection);
                getAdmins.CommandType = CommandType.StoredProcedure;
                var reader = await getAdmins.ExecuteReaderAsync();


                while (reader.Read()) {
                    userUsers.Add(new {
                        username = reader["username"].ToString()!,
                        id = reader["id"].ToString()!
                    });
                }

                await connection.CloseAsync();
            }

            return userUsers!;
        }
    }
}
