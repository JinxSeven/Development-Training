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

        private void onTimerElapsed(object? sender, ElapsedEventArgs e)
        {
            EachSecond?.Invoke(this, EventArgs.Empty);
        }

        public void Start() { timer.Start(); }

        public void Stop() { timer.Stop(); }
    }
}
