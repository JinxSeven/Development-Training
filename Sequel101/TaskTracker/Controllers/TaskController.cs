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


        [HttpGet]
        [Route("GetTasks")]
        public async Task<IActionResult> GetTasks(Guid userId)
        {
            try
            { 
                var responce = await _taskRepo.GetTasks(userId);
                return Ok(responce);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddNewTask")]
        public async Task<IActionResult> AddNewTask(TaskData taskData)
        {
            try
            {
                Guid addedId = await _taskRepo.AddNewTask(taskData);
                return Ok(addedId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch]
        [Route("UpdateTaskState")]
        public IActionResult UpdateTaskState(Guid taskId, string taskState) {
            try 
            {
                _taskRepo.UpdateTaskState(taskId, taskState);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // [HttpPut]
        // [Route("Edit")]
        // public IActionResult EditTask(TaskData taskData)
        // {
        //     try
        //     {
        //         _taskRepo.EditTask(taskData); return Ok();
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(ex.Message);
        //     }
        // }

        // [HttpDelete]
        // [Route("Delete")]
        // public IActionResult DeleteTask(int taskId)
        // {
        //     try
        //     {
        //         _taskRepo.DeleteTask(taskId); return Ok();
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(ex.Message);
        //     }
        // }
    }
}
