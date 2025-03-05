using Microsoft.AspNetCore.Mvc;
using TaskTracker.Models;
using TaskTracker.Repo;

namespace TaskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : Controller
    {
        private readonly ClientRepo _clientRepo;

        public ClientController(ClientRepo clientRepo)
        {
            _clientRepo = clientRepo;
        }

        [HttpGet]
        [Route("GetAllClientNames")]
        public async Task<IActionResult> GetAllClientNames()
        {
            try
            {
                var clientList = await _clientRepo.GetAllClientNames();
                return Ok(clientList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetProjectsByClientId")]
        public async Task<IActionResult> GetProjectsByClientId(Guid clientId)
        {
            try
            {
                var projectList = await _clientRepo.GetProjectsByClientId(clientId);
                return Ok(projectList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> GetAllClients()
        {
            try
            {
                var clients = await _clientRepo.GetAllClients();
                return Ok(clients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
