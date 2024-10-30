using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTracker.Data;
using TaskTracker.Models;

namespace TaskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TasksRepo _taskRepo;
        public TaskController(TasksRepo taskRepo)
        {
            _taskRepo = taskRepo;
        }

        [HttpPost]
        [Route("Post")]
        public IActionResult AddNewTask(TaskData taskData)
        {
            try
            {
                int addedId = _taskRepo.AddNewTask(taskData);
                return Ok(addedId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("Get")]
        public IActionResult GetTasks(int user_id)
        {
            try
            { 
                var responce = _taskRepo.GetTasks(user_id);
                return Ok(responce);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("Edit")]
        public IActionResult EditTask(TaskData taskData)
        {
            try
            {
                _taskRepo.EditTask(taskData); return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult DeleteTask(int taskId)
        {
            try
            {
                _taskRepo.DeleteTask(taskId); return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
