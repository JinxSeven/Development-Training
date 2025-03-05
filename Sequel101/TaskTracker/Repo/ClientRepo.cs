using Microsoft.Data.SqlClient;
using TaskTracker.Data;
using TaskTracker.Models;

namespace TaskTracker.Repo
{
    public class ClientRepo
    {
        private readonly IDataAccess _dataAccess;

        public ClientRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async Task<List<object>?> GetAllClientNames()
        {
            List<object> clientList = new List<object>();

            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                var getClientsCmd = new SqlCommand("SELECT client_name, id FROM Clients", connection);
                var reader = await getClientsCmd.ExecuteReaderAsync();


                while (await reader.ReadAsync())
                {
                    clientList.Add(new
                    {
                        Id = Guid.Parse(reader["id"].ToString()!),
                        ClientName = reader["client_name"].ToString()!,
                    });
                }
            }

            return clientList;
        }

        public async Task<List<object>?> GetProjectsByClientId(Guid clientId)
        {
            List<object> projectsByClient = [];
            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                SqlCommand getProjectsCmd = new SqlCommand("SELECT id, project_name FROM Projects WHERE client_id = @client_id", connection);
                getProjectsCmd.Parameters.AddWithValue("@client_id", clientId);
                var reader = await getProjectsCmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    projectsByClient.Add(new
                    {
                        id = Guid.Parse(reader["id"].ToString()!),
                        projectName = reader["project_name"].ToString()!
                    });
                }
            }

            return projectsByClient;
        }

        public async Task<List<Client>> GetAllClients()
        {
            List<Client> clientData = [];
            using (var connection = _dataAccess.ReturnConn())
            {

            }
        }
    }
}