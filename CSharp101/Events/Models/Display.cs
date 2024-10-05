using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Models
{
    internal class Display
    {
        public void Subscribe(Clock clock)
        {
            // Subscribe to the SecondElapsed event of the Clock
            clock.EachSecond += OnSecondElapsed;
        }

        // This method is called every time the Clock event is raised
        private void OnSecondElapsed(object? sender, EventArgs e)
        {
            // Display the current time
            Console.WriteLine($"Current Time: {DateTime.Now:hh:mm:ss tt}");
        }
    }
}
