using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reflections.Models
{
    internal class One
    {
        public required int Length { get; set; }
        public required int Width { get; set; }

        public void CalculateArea() { }
    }

    internal class Two
    {
        public required string Make { get; set; }
        public required string Model { get; set; }
        
        public void CalculateArea() { }
    }
}
