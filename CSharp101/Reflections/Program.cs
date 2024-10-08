using Reflections.Models;

namespace Reflections
{
    internal class Program
    {
        static void Main(string[] args)
        {
            One one = new One { Length = 10, Width = 20 };
            Two two = new Two { Make = "Benz", Model = "2007" };

            ObjSerializer.Serialize(one);
        }
    }
}
