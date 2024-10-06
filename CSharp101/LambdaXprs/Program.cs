// See https://aka.ms/new-console-template for more information
public class Program
{
    public static void Main(string[] args)
    {
        Func<int, bool> isEven = number => number % 2 == 0;
        List<int> ints =
        [
            20, 65, 14, 22, 17, 83, 59, 77
        ];

        var evens = ints.Where(isEven);

        foreach (int num in evens)
        {
            Console.WriteLine($"{num} is an even number");
        }
    }
}
