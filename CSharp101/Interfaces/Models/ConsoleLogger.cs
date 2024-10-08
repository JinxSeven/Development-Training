using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.Models
{
    internal class ConsoleLogger : ILogger
    {
        public void LogInfo(string info)
        {
            Console.WriteLine($"ConsoleLogger: {info}");
        }
        public void LogWarning(string warning)
        {
            Console.WriteLine($"ConsoleLogger: {warning}");
        }
        public void LogError(string error)
        {
            Console.WriteLine($"ConsoleLogger: {error}");
        }
    }
}
