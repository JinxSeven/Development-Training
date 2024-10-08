using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.Models
{
    internal class Application
    {
        private readonly ILogger loggerInjection;

        public Application(ILogger loggerInjection)
        {
            this.loggerInjection = loggerInjection;
        }

        public void Run()
        {
            loggerInjection.LogInfo("this info is provided from application class");
            loggerInjection.LogWarning("this warning is provided from application class");
            loggerInjection.LogError("this error is provided from application class");
        }
    }
}
