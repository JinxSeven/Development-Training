// See https://aka.ms/new-console-template for more information
public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Zero handled division:");
        Console.Write("Enter numerator: ");
        string input = Console.ReadLine()!;
        int numerator = 0, denominator = 0;

        try
        {
            numerator = int.Parse(input);
        } 
        catch (FormatException)
        {
            Console.WriteLine("Input type invalid!");
        }

        Console.Write("Enter denominator: ");
        input = Console.ReadLine()!;

        try
        {
            denominator = int.Parse(input);
        }
        catch (FormatException)
        {
            Console.WriteLine("Input type invalid!");
        }

        try
        {
            int answer = Division(numerator, denominator);
            Console.WriteLine($"Answer is: {answer}");
        }
        catch (DivideByZeroException e)
        {
            Console.WriteLine($"Denominator can't be zero!: {Environment.NewLine}{e}");
        }

        static int Division(int numerator, int denominator) => numerator / denominator;
    }
}