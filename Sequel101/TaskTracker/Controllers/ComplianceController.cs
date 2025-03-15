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
                //return Ok(new { message = "Compliance added successfully!" });
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error adding compliance", error = ex.Message });
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
