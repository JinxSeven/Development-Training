using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using TaskTracker.Data;

namespace TaskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UsersRepo _userRepo;
        public UserController(UsersRepo userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        [Route("Login")]
        public IActionResult GetLoggedUser(string username, string password)
        {
            try
            {
                var loggedUser = _userRepo.GetLoggerUser(username, password);
                return Ok(loggedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AddNewUser(Models.UserData userData)
        {
            try
            {
                _userRepo.AddNewUser(userData);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(int user_id)
        {
            try
            {
                _userRepo.DeleteUser(user_id); return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
