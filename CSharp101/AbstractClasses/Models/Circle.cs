using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractClasses.Models
{
    internal class Circle : Shape
    {
        private readonly double radius;

        public Circle(double radius) { this.radius = radius; }
        public override double GetArea() { return pi * radius; }
        public override double GetPerimeter() { return 2 * pi * radius; }
    }
}
