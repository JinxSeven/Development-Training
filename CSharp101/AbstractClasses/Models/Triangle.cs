using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractClasses.Models
{
    internal class Triangle : Shape
    {
        private readonly double side1;
        private readonly double side2;
        private readonly double side3;
        private readonly double baseLen;
        private readonly double height;

        public Triangle(double side1, double side2, double side3, double baseLen, double height)
        {
            this.side1 = side1;
            this.side2 = side2;
            this.side3 = side3;
            this.baseLen = baseLen;
            this.height = height;
        }

        public override double GetArea() { return (baseLen * height) / 2; }
        public override double GetPerimeter() { return side1 + side2 + side3; }
    }
}
