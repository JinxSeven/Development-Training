// See https://aka.ms/new-console-template for more information
Random rand = new Random();
int guessTheNumber = rand.Next(1, 100);
int userGuess = -1;

while (userGuess != guessTheNumber)
{
    Console.Write("Guess a number between 1 - 100: ");
    string userInput = Console.ReadLine();

    try
    {
        userGuess = int.Parse(userInput);
        if (userGuess < guessTheNumber) Console.WriteLine("Too Low, Guess again!");
        else if (userGuess > guessTheNumber) Console.WriteLine("Too High, Guess again!");
    }
    catch (FormatException) 
    {
        Console.WriteLine("Invalid input type, Try again!");
    }
}

Console.WriteLine($"You guessed it right! - {userGuess}");
