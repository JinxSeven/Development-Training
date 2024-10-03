// See https://aka.ms/new-console-template for more information
using System.Diagnostics;

int userOption = -1;
int userInput1 = -1;
int userInput2 = -1;

Console.WriteLine("Simple Console Calculator");
Console.WriteLine("1) Addition artithmetic");
Console.WriteLine("2) Subtraction artithmetic");
Console.WriteLine("3) Multiplication artithmetic");
Console.WriteLine("4) Division artithmetic");
Console.WriteLine($"5) Modulo artithmetic{Environment.NewLine}");

while (true)
{
    Console.Write("Enter a valid selection: ");
    string userOptionStr = Console.ReadLine();
    try
    {
        userOption = int.Parse(userOptionStr);
        if (userOption < 1 || userOption > 5)
        {
            Console.WriteLine("Number must be within range!");
        }
        else break;
    }
    catch (FormatException)
    { 
        Console.WriteLine("Enter +ve numbers only!");
    }
}

while (true)
{
    Console.Write("Enter the 1st number: ");
    string userInput1Str = Console.ReadLine();
    try
    {
        userInput1 = int.Parse(userInput1Str);
        break;
    }
    catch (FormatException)
    {
        Console.WriteLine("Enter numbers only!");
    }
}

while (true)
{
    Console.Write("Enter the 2nd number: ");
    string userInput2Str = Console.ReadLine();
    try
    {
        userInput2 = int.Parse(userInput2Str);
        break;
    }
    catch (FormatException)
    {
        Console.WriteLine("Enter numbers only!");
    }
}

double result;

switch (userOption)
{
    case 1:
        result = Addition(userInput1, userInput2);
        Console.WriteLine($"Output: {result}");
        break;
    case 2:
        result = Subtraction(userInput1, userInput2);
        Console.WriteLine($"Output: {result}");
        break;
    case 3:
        result = Multiplication(userInput1, userInput2);
        Console.WriteLine($"Output: {result}");
        break;
    case 4:
        if (userInput2 == 0)
        {
            Console.WriteLine("Can't divide by zero!");
        }
        else
        {
            result = Division(userInput1, userInput2);
            Console.WriteLine($"Output: {result}");
        }
        break;
    case 5:
        result = Modulo(userInput1, userInput2);
        Console.WriteLine($"Output: {result}");
        break;
}

int Addition(int a, int b) => a + b;
int Subtraction(int a, int b) => a - b;
int Multiplication(int a, int b) => a * b;
double Division(int a, int b) => (double)a / b;
int Modulo(int a, int b) => a % b;