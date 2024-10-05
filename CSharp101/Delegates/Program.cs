// See https://aka.ms/new-console-template for more information
using System.Security.Cryptography.X509Certificates;

namespace Delegates.Models;
public class Program
{
    internal static int Math(MathOperations.MathOperation operation, int num1, int num2)
    {
        return operation(num1, num2);
    }
    public static void Main(string[] args)
    {
        string input;
        int num1 = -1, num2 = -1;
        try
        {
            Console.Write("Input1: ");
            input = Console.ReadLine()!;
            num1 = int.Parse(input);

            Console.Write("Input2: ");
            input = Console.ReadLine()!;
            num2 = int.Parse(input);
        }
        catch (FormatException)
        {
            Console.WriteLine("\nEnter a valid number!");
        }

        MathOperations.MathOperation operation = MathOperations.Add;
        Console.WriteLine($"\nAdd two numbers: {Math(operation, num1, num2)} \n");

        operation = MathOperations.Subtract;
        Console.WriteLine($"Subtract two numbers: {Math(operation, num1, num2)} \n");
        
        operation = MathOperations.Multiply;
        Console.WriteLine($"Multiply two numbers: {Math(operation, num1, num2)} \n");

        operation = MathOperations.Modulo;
        try
        {
            Console.WriteLine($"Modulo two numbers: {Math(operation, num1, num2)} \n");
        } 
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"{ex.Message}");
        }
    }
}
