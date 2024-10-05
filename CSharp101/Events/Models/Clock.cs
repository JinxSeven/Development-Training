using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Timers;

namespace Events.Models
{
    internal class Clock
    {
        private System.Timers.Timer timer;
        public event EventHandler? EachSecond;

        public Clock() 
        {
            timer = new System.Timers.Timer(1000);
            timer.Elapsed += onTimerElapsed;
        }

        // This method is called every time the timer elapses
        private void onTimerElapsed(object? sender, ElapsedEventArgs e)
        {
            // Raise the event to notify subscribers
            EachSecond?.Invoke(this, EventArgs.Empty);
        }

        public void Start() { timer.Start(); }

        public void Stop() { timer.Stop(); }
    }
}
