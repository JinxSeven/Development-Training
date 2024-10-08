using Interfaces.Models;

namespace Interfaces
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ILogger logger = new FileLogger();
            Application app = new Application(logger);
            app.Run();
        }
    }
}
