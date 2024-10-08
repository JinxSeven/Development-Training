using Newtonsoft.Json;
using WeatherForecastApp.Models;

namespace Asyncronous
{
    internal class Program
    {
        const string apiKey = "e124fb640b814c031daa1aabde059d48";

        static async Task Main(string[] args)
        {
            Console.WriteLine("Weather monitor application:!");
            Console.Write("No of cities to search: ");
            string input = Console.ReadLine()!;
            uint noOfCities = 0;

            try
            {
                noOfCities = uint.Parse(input);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return;
            }

            List<string> cityNames = new List<string>();

            for (int x = 0; x < noOfCities; x++)
            {
                Console.Write($"City {x + 1} name: ");
                input = Console.ReadLine()!;
                cityNames.Add(input);
            }

            await GetWeatherAsync(cityNames);
        }

        public static async Task GetWeatherAsync(List<string> cityNames)
        {
            var httpClient = new HttpClient();

            foreach (var city in cityNames)
            {
                var apiUrl = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric";

                try
                {
                    var response = await httpClient.GetAsync(apiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonRes = await response.Content.ReadAsStringAsync();
                        var weatherData = JsonConvert.DeserializeObject<ApiRes>(jsonRes);

                        Console.WriteLine($"\nCity: {city}:");
                        Console.WriteLine($"Temperature: {weatherData!.Main!.Temp}°C");
                        Console.WriteLine($"Weather: {weatherData!.Weather![0].Description}");
                        Console.WriteLine($"Humidity: {weatherData.Main!.Humidity}%");
                    }
                    else
                    {
                        Console.WriteLine($"\n{city} is not a real city!");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"{ex.Message}");
                }
            }
        }
    }
}
