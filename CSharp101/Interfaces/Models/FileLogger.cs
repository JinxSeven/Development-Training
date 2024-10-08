using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Interfaces.Models
{
    internal class FileLogger : ILogger
    {
        private readonly string path = "C:\\Users\\samuel.koilraj\\OneDrive - ClaySys Technologies\\Documents\\ClaySys\\CSharp101\\Interfaces\\log.txt";

        public void LogInfo(string info)
        {
            WriteFile(info);
        }
        public void LogWarning(string warning)
        {
            WriteFile(warning);

        }
        public void LogError(string error)
        {
            WriteFile(error);
        }
        private void WriteFile(string message)
        {
            using StreamWriter writer = new(path, true);
            writer.WriteLine(message);
        }
    }
}
