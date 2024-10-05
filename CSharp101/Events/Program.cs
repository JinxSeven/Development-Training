// See https://aka.ms/new-console-template for more information
namespace Events.Models
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Create Clock and Display instances
            Clock clock = new Clock();
            Display display = new Display();

            // Subscribe the Display to the Clock's event
            display.Subscribe(clock);

            // Start the clock
            clock.Start();

            // Keep the program running to allow the event to keep triggering
            Console.WriteLine("Press enter to exit!");
            Console.ReadLine();

            // Stop the clock when Enter is pressed
            clock.Stop();
        }
    }
}
