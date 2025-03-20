using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTracker.Models;
using TaskTracker.Repo;

namespace TaskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplianceController : ControllerBase
    {
        private readonly ComplianceRepo _complianceRepo;

        public ComplianceController(ComplianceRepo complianceRepo)
        {
            _complianceRepo = complianceRepo;
        }

        [HttpPost("AddNewCompliance")]
        public async Task<IActionResult> AddNewComplianceAsync([FromBody] Compliance compliance)
        {
            try
            {
                await _complianceRepo.AddNewComplianceAsync(compliance);
                return Ok(new { message = "Compliance added successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error adding compliance", error = ex.Message });
            }
        }

        [HttpPost("AssignCompliance")]
        public async Task<IActionResult> AssignCompliance(Guid userId, Guid compId) 
        {
            int rowsAffected = await _complianceRepo.AssignCompliance(userId, compId);
            if (rowsAffected > 0)
            {
                return Ok(new { Message = "Compliance assigned successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to assign compliance." });
            }
        }

        [HttpGet("GetComplianceDetails")]
        public async Task<IActionResult> GetComplianceDetails()
        {
            try
            {
                var response = await _complianceRepo.GetComplianceDetails();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error getting compliance", error = ex.Message });
            }
        }
    }
}
