using AbstractClasses.Models;

namespace AbstractClasses
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Shape> shapes = new List<Shape>()
            {
                new Circle(7.25),
                new Triangle(8, 8, 6, 5, 7),
                new Rectangle(15, 10)
            };

            shapes.ForEach(shape =>
            {
                if (shape is Circle circle)
                {
                    //Console.WriteLine();
                    Console.WriteLine($"Area of circle: {shape.GetArea():F2}");
                    Console.WriteLine($"Perimeter of circle: {shape.GetPerimeter():F2}");
                }
                else if (shape is Triangle triangle)
                {
                    Console.WriteLine();
                    Console.WriteLine($"Area of triangle: {shape.GetArea():F2}");
                    Console.WriteLine($"Perimeter of triangle: {shape.GetPerimeter():F2}");
                }
                else
                {
                    Console.WriteLine();
                    Console.WriteLine($"Area of rectangle: {shape.GetArea():F2}");
                    Console.WriteLine($"Perimeter of rectangle: {shape.GetPerimeter():F2}");
                }
            });
        }
    }
}
