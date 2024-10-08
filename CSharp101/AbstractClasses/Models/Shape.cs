using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractClasses.Models
{
    internal abstract class Shape
    {
        public readonly double pi = 3.14159;

        public abstract double GetArea();
        public abstract double GetPerimeter();
    }
}
