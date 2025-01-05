using DT.Catalog.Service.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace DT.Catalog.Service.Repos
{
    public class GamesRepo
    {
        private readonly IDataAccess _dataAccess;

        public GamesRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public List<Game> GetGames()
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand getGamesCmd = new SqlCommand("SELECT * FROM Games", connection);
                var reader = getGamesCmd.ExecuteReader();

                var games = new List<Game>();
                while (reader.Read())
                {
                    Game game = new Game
                    {
                        GameId = (Guid)reader["GameId"],
                        GameName = (string)reader["GameName"],
                        GameCategory = (string)reader["GameCategory"],
                        GameDescription = (string)reader["GameDescription"],
                        GamePrice = (decimal)reader["GamePrice"],
                        GameCreatedDate = (DateTimeOffset)reader["GameCreatedDate"]
                    };
                    games.Add(game);
                }
                reader.Close();
                connection.Close();

                return games;
            }
        } 
    }
}
