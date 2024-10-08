using LINQ_1.Models;
using System.Text.RegularExpressions;

namespace LINQ_2.Models
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Product> products = new List<Product>
            {
                new Product(101, "C Cable", "connectivity", 39.99m),
                new Product(102, "Headset Wired", "audio", 69.99m),
                new Product(103, "Screen Protector", "accessories", 19.99m),
                new Product(104, "Power Bank", "accessories", 29.99m),
                new Product(105, "Wireless Mouse", "input devices", 24.99m),
                new Product(106, "Noise Cancelling Headphones", "audio", 199.99m),
                new Product(107, "Phone Case", "accessories", 19.99m),
                new Product(108, "External Hard Drive", "storage", 79.99m),
                new Product(109, "BT Keyboard", "input devices", 129.99m),
                new Product(110, "Portable SSD", "storage", 149.99m),
                new Product(111, "Bluetooth Earbuds", "audio", 99.99m),
                new Product(112, "Travel Adapter", "accessories", 14.99m),
                new Product(113, "Smartwatch", "wearables", 299.99m),
                new Product(114, "BT Speaker", "audio", 199.99m),
                new Product(115, "Wireless Charging Pad", "accessories", 49.99m),
                new Product(116, "High-Speed HDMI Cable", "connectivity", 9.99m),
                new Product(117, "Noise-Cancelling Earbuds", "audio", 129.99m),
                new Product(118, "Portable Power Bank", "storage", 399.99m),
                new Product(119, "Smart TV", "entertainment", 799.99m),
                new Product(120, "Virtual Reality Headset", "entertainment", 499.99m),
                new Product(121, "Waterproof Bluetooth Speaker", "audio", 149.99m),
                new Product(122, "Smart Home Security Camera", "security", 199.99m),
                new Product(123, "Gaming Controller", "gaming", 59.99m),
                new Product(124, "External Graphics Card", "peripheral", 999.99m),
                new Product(125, "Augmented Reality Glasses", "wearables", 699.99m),
                new Product(126, "High-Definition Projector", "entertainment", 899.99m),
                new Product(127, "Wireless Router", "connectivity", 129.99m),
                new Product(128, "Smartwatch Fitness Tracker", "wearables", 249.99m),
                new Product(129, "Professional Webcam", "accessories", 199.99m),
                new Product(130, "Gaming Chair", "gaming", 399.99m)
            };

            products.ForEach(prod =>
            {
                Console.Write($"{prod.Id} - ");
                Console.Write($"{prod.Name} - ");
                Console.Write($"{prod.Category} - ");
                Console.WriteLine($"{prod.Price}");
            });

            Dictionary<string, int> categoriesWithCount = 
                products.GroupBy(prod => prod.Category)
                .Select(grp => new {category = grp.Key, count = grp.Count()})
                .ToDictionary(dict => dict.category, dict => dict.count);

            Dictionary<string, int> categoriesWithDescendingCount =
                categoriesWithCount.OrderByDescending(dict => dict.Value)
                .ToDictionary();

            Console.WriteLine("\nCategories:");
            foreach (var category in categoriesWithDescendingCount)
            {
                Console.WriteLine($"{category.Key} - {category.Value}");
            }

            Console.Write("\nType in category to filter: ");
            string filter = Console.ReadLine()!;
            Console.WriteLine();

            List<Product> filtered = products.Where(prod => prod.Category == filter).ToList();

            filtered.ForEach(prod =>
            {
                Console.Write($"{prod.Id} - ");
                Console.Write($"{prod.Name} - ");
                Console.Write($"{prod.Category} - ");
                Console.WriteLine($"{prod.Price}");
            });

            Console.WriteLine("\nChoose an option to sort-by: ");
            Console.WriteLine("1) Price Low-High");
            Console.WriteLine("2) Price High-Low");
            Console.Write("option: ");

            string sortBy = Console.ReadLine()!;
            int sortOption = int.Parse(sortBy);

            switch (sortOption)
            {
                case 1:
                    List<Product> loToHi = filtered.OrderBy(prod => prod.Price).ToList();
                    Console.WriteLine();
                    loToHi.ForEach(prod =>
                     {
                         Console.Write($"{prod.Id} - ");
                         Console.Write($"{prod.Name} - ");
                         Console.Write($"{prod.Category} - ");
                         Console.WriteLine($"{prod.Price}");
                     });
                    break;
                case 2:
                    List<Product> hiToLow = filtered.OrderByDescending(prod => prod.Price).ToList();
                    Console.WriteLine();
                    hiToLow.ForEach(prod =>
                    {
                        Console.Write($"{prod.Id} - ");
                        Console.Write($"{prod.Name} - ");
                        Console.Write($"{prod.Category} - ");
                        Console.WriteLine($"{prod.Price}");
                    });
                    break;
                default:
                    Console.WriteLine("Selection invalid!");
                    break;
            }
            
        }
    }
}
