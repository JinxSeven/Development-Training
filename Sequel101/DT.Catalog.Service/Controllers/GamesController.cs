using DT.Catalog.Service.Entities;
using DT.Catalog.Service.Repos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DT.Catalog.Service.Controllers
{
    [ApiController]
    [Route("games")]
    public class GamesController : Controller
    {
        private readonly GamesRepo _gamesRepo;

        public GamesController(GamesRepo gamesRepo)
        {
            _gamesRepo = gamesRepo;
        }

        [HttpGet]
        public IActionResult GetGames()
        {
            try
            {
                List<Game> games = _gamesRepo.GetGames();
                return Ok(games);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request.{ex}");
            }
        }
    }
}
