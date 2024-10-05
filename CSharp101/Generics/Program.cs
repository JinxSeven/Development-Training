// See https://aka.ms/new-console-template for more information
namespace Generics.Models;
public class Program
{
    public static void Main(string[] args)
    {
        StackGenerix<int> intStack = new StackGenerix<int>();
        StackGenerix<string> strStack = new StackGenerix<string>();

        intStack.Push(01);
        intStack.Push(10);
        intStack.Push(24);

        Console.WriteLine("Stack after pushing '01' '10' & '24'");
        intStack.ShowStack();

        Console.WriteLine("Integer Stack - Pop: " + intStack.Pop());
        Console.WriteLine("Integer Stack - Peek: " + intStack.Peek());

        Console.WriteLine("Stack after popping '24'");
        intStack.ShowStack();

        Console.Write($"{Environment.NewLine}");

        strStack.Push("Lets");
        strStack.Push("Go!");

        Console.WriteLine("Stack after pushing 'Lets' & 'Go!'");
        strStack.ShowStack();

        Console.WriteLine("String Stack - Pop: " + strStack.Pop());
        Console.WriteLine("String Stack - Peek: " + strStack.Peek());

        Console.WriteLine("Stack after popping 'Go!'");
        strStack.ShowStack();
    }
}
