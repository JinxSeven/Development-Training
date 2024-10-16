using BudgetTrackerApp.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Transactions;

namespace BudgetTrackerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        public readonly IDataAccess _dataAccess;
        public TransactionsController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }
    
        [HttpGet]
        public IActionResult GetUserTransactions(int user_id)
        {
            try
            {
                SqlConnection con = _dataAccess.Conn();
                con.Open();
                SqlCommand getUserTransactsCmd = new SqlCommand("SELECT * FROM dbo.fnGetUserTransactions(@user_id);", con);
                getUserTransactsCmd.Parameters.AddWithValue("@user_id", user_id);
                SqlDataReader reader = getUserTransactsCmd.ExecuteReader();

                var userTransacts = new List<object>();
                while (reader.Read())
                {
                    userTransacts.Add(new
                    {
                        UserId = reader["UserId"],
                        Type = reader["Type"],
                        Amount = reader["Amount"],
                        Category = reader["Category"],
                        DateTime = reader["DateTime"],
                        Id = reader["Id"]
                    });
                }
                reader.CloseAsync();
                con.CloseAsync();

                var result = new {userTransacts = userTransacts};

                return Ok(result);
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            catch (IndexOutOfRangeException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Column not found: " + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AddUserTransaction([FromBody] Models.Transaction transact)
        {
            if (string.IsNullOrWhiteSpace(transact.Type) || (transact.Type != "income" && transact.Type != "expense"))
            {
                return BadRequest("Type must be either 'income' or 'expense'!");
            }
            try
            {
                SqlConnection con = _dataAccess.Conn();
                con.Open();
                SqlCommand addUserTransactCmd = new SqlCommand("addTransactionProcedure", con);
                DateTime now = DateTime.Now;
                string dateTime = now.ToString("yyyy-MM-dd HH:mm:ss");
                addUserTransactCmd.CommandType = System.Data.CommandType.StoredProcedure;
                addUserTransactCmd.Parameters.AddWithValue("@user_id", transact.UserId);
                addUserTransactCmd.Parameters.AddWithValue("@type", transact.Type);
                addUserTransactCmd.Parameters.AddWithValue("@amount", transact.Amount);
                addUserTransactCmd.Parameters.AddWithValue("@category", transact.Category);
                addUserTransactCmd.Parameters.AddWithValue("@date_and_time", dateTime);
                addUserTransactCmd.ExecuteNonQuery();
                return Ok("Add Transaction Procedure successfull!");
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
