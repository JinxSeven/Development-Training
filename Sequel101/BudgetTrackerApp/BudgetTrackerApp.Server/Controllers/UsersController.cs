using BudgetTrackerApp.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace BudgetTrackerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;

        public UsersController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [HttpGet]
        public IActionResult GetUserDetails(int user_id)
        {
            try
            {
                SqlConnection con = _dataAccess.Conn();
                con.Open();

                SqlCommand getUserDetailsCmd = new SqlCommand("SELECT * FROM dbo.fnGetUserDetails(@user_id);", con);
                getUserDetailsCmd.Parameters.AddWithValue("@user_id", user_id);
                SqlDataReader reader = getUserDetailsCmd.ExecuteReader();

                var userDetails = new List<object>();
                while (reader.Read())
                {
                    userDetails.Add(new
                    {
                        Name = reader["Name"],
                        Email = reader["Email"],
                        Income = reader["Income"],
                        Expense = reader["Expense"],
                        Balance = reader["Balance"],
                        TransactionCount = reader["TransactionCount"],
                        GoalCount = reader["GoalCount"]
                    });
                }
                reader.Close();
                con.Close();

                var result = new {UserDetails = userDetails};

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
        public IActionResult AddUser([FromBody] Models.User user)
        {
            try
            {
                SqlConnection con = _dataAccess.Conn();
                con.Open();
                SqlCommand addUserCmd = new SqlCommand("addUserProcedure", con);
                addUserCmd.CommandType = System.Data.CommandType.StoredProcedure;
                addUserCmd.Parameters.AddWithValue("@name", user.Name);
                addUserCmd.Parameters.AddWithValue("@email", user.Email);
                addUserCmd.Parameters.AddWithValue("@password", user.Password);
                addUserCmd.ExecuteNonQuery();
                return Ok("Add User Procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
