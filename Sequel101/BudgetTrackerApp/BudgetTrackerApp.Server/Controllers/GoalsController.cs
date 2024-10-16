using BudgetTrackerApp.Server.Data;
using BudgetTrackerApp.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace BudgetTrackerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;
        public GoalsController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [HttpGet]
        public IActionResult GetUserGoals(int user_id)
        {
            try
            {
                SqlConnection con = _dataAccess.Conn();
                con.Open();

                SqlCommand getUserGoalsCmd = new SqlCommand("SELECT * FROM dbo.fnGetUserGoals(@user_id);", con);
                getUserGoalsCmd.Parameters.AddWithValue("@user_id", user_id);
                SqlDataReader reader = getUserGoalsCmd.ExecuteReader();

                var userGoals = new List<object>();
                while (reader.Read())
                {
                    userGoals.Add(new
                    {
                        UserId = reader["UserId"],
                        Name = reader["Name"],
                        Target = reader["Target"],
                        Amount = reader["Amount"],
                        Id = reader["Id"]
                    });
                }
                reader.Close();
                con.Close();

                var result = new { userGoals = userGoals };

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
        [Route("AddGoal")]
        public IActionResult AddUserGoal([FromBody] Models.Goal goal)
        {
            try
            {
                SqlConnection con = _dataAccess.Conn();
                con.Open();
                SqlCommand addUserGoalCmd = new SqlCommand("addGoalProcedure", con);
                addUserGoalCmd.CommandType = System.Data.CommandType.StoredProcedure;
                addUserGoalCmd.Parameters.AddWithValue("@user_id", goal.UserId);
                addUserGoalCmd.Parameters.AddWithValue("@name", goal.Name);
                addUserGoalCmd.Parameters.AddWithValue("@target", goal.Target);
                addUserGoalCmd.Parameters.AddWithValue("@amount", goal.Amount);
                addUserGoalCmd.ExecuteNonQuery();
                return Ok("Add Goal Procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("ContributeGoal")]
        public IActionResult AddGoalContribution(int goal_id, int contribution)
        {
            try
            {
                SqlConnection con = _dataAccess.Conn();
                con.Open();
                SqlCommand addGoalAmountCmd = new SqlCommand("addGoalContributionProcedure", con);
                addGoalAmountCmd.CommandType = System.Data.CommandType.StoredProcedure;
                addGoalAmountCmd.Parameters.AddWithValue("@goal_id", goal_id);
                addGoalAmountCmd.Parameters.AddWithValue("@amount_to_add", contribution);
                addGoalAmountCmd.ExecuteNonQuery();
                return Ok("Add Goal Contribution Procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteGoal")]
        public IActionResult DeleteGoal(int goal_id)
        {
            try
            {
                SqlConnection con = _dataAccess.Conn();
                con.Open();
                SqlCommand addGoalAmountCmd = new SqlCommand("deleteGoalProcedure", con);
                addGoalAmountCmd.CommandType = System.Data.CommandType.StoredProcedure;
                addGoalAmountCmd.Parameters.AddWithValue("@goal_id", goal_id);
                addGoalAmountCmd.ExecuteNonQuery();
                return Ok("Delete Goal Procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
