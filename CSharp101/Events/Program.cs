// See https://aka.ms/new-console-template for more information
namespace Events.Models
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Clock clock = new Clock();
            Display display = new Display();

            display.Subscribe(clock);

            clock.Start();

            Console.WriteLine("Enter to exit!");
            Console.ReadLine();

            clock.Stop();
        }
    }
}
