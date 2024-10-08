using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Reflections.Models
{
    internal class ObjSerializer
    {
        public static void Serialize(object obj)
        {
            Type type = obj.GetType();
            PropertyInfo[] properties = type.GetProperties();
            MethodInfo[] methods = type.GetMethods();

            Console.WriteLine($"{type.Name}");

            Console.WriteLine("Properties:");
            foreach (PropertyInfo property in properties)
            {
                Console.Write($"{property.Name}: ");
                Console.WriteLine(property.GetValue(obj));
            }
            Console.WriteLine();

            /*foreach (MethodInfo method in methods)
            {
                Console.Write($"{method.Name}: ReturnType: ");
                Console.WriteLine(method.ReturnType);
            }*/
        }
    }
}
