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
            clock.EachSecond += OnSecondElapsed;
        }

        private void OnSecondElapsed(object? sender, EventArgs e)
        {
            Console.WriteLine($"Current Time: {DateTime.Now:hh:mm:ss tt}");
        }
    }
}
