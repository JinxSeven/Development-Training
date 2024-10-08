// See https://aka.ms/new-console-template for more information
using ECommerceApp.Models;
public class Program
{
    public static void Main(string[] args)
    {
        List<Product> listOfProducts = new List<Product>
        {
            new Product(101, "Laptop", 999.99m, 5),
            new Product(102, "Smartphone", 499.99m, 10),
            new Product(103, "Console", 299.99m, 7),
            new Product(104, "Smartwatch", 199.99m, 15),
            new Product(105, "Headphones", 89.99m, 20)
        };

        Cart cart = new Cart();

        Console.WriteLine("Hello Human, Pick an option listed below:");

        int userSelection = -1;
        string userInputStr;
        int prodId;

        while (userSelection != 6)
        {
            do
            {
                Console.WriteLine("1) Display all products on sale");
                Console.WriteLine("2) Add product to cart");
                Console.WriteLine("3) Remove product from cart");
                Console.WriteLine("4) View all items in cart");
                Console.WriteLine("5) Get cart total");
                Console.WriteLine($"6) Exit{Environment.NewLine}");
                Console.Write("Choose your option: ");
                userInputStr = Console.ReadLine()!;
                try
                {
                    userSelection = int.Parse(userInputStr);
                }
                catch (FormatException)
                {
                    Console.Write($"{Environment.NewLine}");
                    Console.WriteLine($"Option input type invalid!{Environment.NewLine}");
                    userSelection = -1;
                }
                if (userSelection == 0 || userSelection > 6)
                {
                    Console.Write($"{Environment.NewLine}");
                    Console.WriteLine($"Input must be within range!{Environment.NewLine}");
                    userSelection = -1;
                }
            }
            while (userSelection < 0);
            switch (userSelection)
            {
                case 1:
                    Console.Write($"{Environment.NewLine}");
                    Console.WriteLine($"Products on sale:");
                    listOfProducts.ForEach(prod =>
                    {
                        prod.GetProductDetails();
                    });
                    break;
                case 2:
                    Console.Write($"{Environment.NewLine}");
                    Console.Write("Id of the product: ");
                    userInputStr = Console.ReadLine()!;
                    try
                    {
                        prodId = int.Parse(userInputStr);
                    }
                    catch (FormatException)
                    {
                        Console.Write($"{Environment.NewLine}");
                        Console.WriteLine($"Product Id input type invalid!" + $"{Environment.NewLine}");
                        break;
                    }
                    int? indx = listOfProducts.FindIndex(prod => prod.Id == prodId);
                    if (indx < 0)
                    {
                        Console.Write($"{Environment.NewLine}");
                        Console.WriteLine($"Product Id {prodId} doesn't exist!" + $"{Environment.NewLine}");
                        break;
                    }
                    if (cart.AddItemToCart(listOfProducts[indx.Value]))
                    {
                        Console.Write($"{Environment.NewLine}");
                        Console.WriteLine("Cart updated successfully!");
                    }
                    Console.Write($"{Environment.NewLine}");
                    break;
                case 3:
                    Console.Write($"{Environment.NewLine}");
                    Console.Write("Enter product Id to remove: ");
                    userInputStr = Console.ReadLine()!;
                    try
                    {
                        prodId = int.Parse(userInputStr);
                    }
                    catch (FormatException)
                    {
                        Console.Write($"{Environment.NewLine}");
                        Console.WriteLine($"Product Id input type invalid!" + $"{Environment.NewLine}");
                        break;
                    }
                    indx = listOfProducts.FindIndex(prod => prod.Id == prodId);
                    if (!indx.HasValue)
                    {
                        Console.Write($"{Environment.NewLine}");
                        Console.WriteLine($"Product Id {prodId} doesn't exist!" + $"{Environment.NewLine}");
                        break;
                    }
                    if (cart.RemoveCartItem(listOfProducts[indx.Value]))
                    {
                        Console.Write($"{Environment.NewLine}");
                        Console.WriteLine("Cart updated successfully!");
                    }
                    Console.Write($"{Environment.NewLine}");
                    break;
                case 4:
                    Console.Write($"{Environment.NewLine}");
                    cart.ViewCartItems();
                    break;
                case 5:
                    Console.Write($"{Environment.NewLine}");
                    Console.WriteLine($"Your cart total is: {cart.CalculateCartTotal()}rs" + $"{Environment.NewLine}");
                    break;
                case 6:
                    break;
                default:
                    Console.WriteLine("Option not added yet!");
                    break;
            }
        }
    }
}