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

        [HttpPost]
        public ActionResult PostGame([FromBody] PostGame game)
        {
            try
            {
                Object? res = _gamesRepo.PostGame(game);
                if (res == null && res == DBNull.Value)
                {
                    return BadRequest("Something went wrong!");
                }

                Guid id = Guid.Parse(res!.ToString()!);
                Console.WriteLine(id.GetType() + $": {id}");
                return Ok($"Game inserted with Id: {id}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request. {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetGamesById(Guid id)
        {
            try
            {
                var res = _gamesRepo.GetGameById(id);
                if (res == null)
                {
                    return NotFound("Unable to find the game your requesting!");
                }
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request. {ex.Message}");
            }
        }

        [HttpGet]
        public IActionResult GetGames()
        {
            try
            {
                List<Game> games = _gamesRepo.GetGames();
                if (games.Count == 0)
                {
                    return NotFound("No games were found!");
                }
                return Ok(games);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request. {ex.Message}");
            }
        }
    }
}
