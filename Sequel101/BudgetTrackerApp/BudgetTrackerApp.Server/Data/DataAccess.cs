using Microsoft.Data.SqlClient;

namespace BudgetTrackerApp.Server.Data
{
    public interface IDataAccess
    {
        SqlConnection Conn();
    }
    public class DataAccess: IDataAccess
    {
        SqlConnection conn;
        private string? connStr;

        public DataAccess(string? connStr)
        {
            this.conn = new SqlConnection(connStr);
        }

        public SqlConnection Conn()
        {
            return conn;
        }
    }
}
