// See https://aka.ms/new-console-template for more information
namespace LINQ_1.Models
{
    public class Program
    {
        List<Product> products = new List<Product>
        {
            new Product(101, "Charger", "accessories", 39.99m),
            new Product(102, "Headset", "audio", 69.99m),
            new Product(103, "Screen Protector", "accessories", 19.99m),
            new Product(103, "BT Speaker", "audio", 199.99m),
            new Product(104, "Power Bank", "accessories", 29.99m),
            new Product(105, "Wireless Mouse", "input devices", 24.99m),
            new Product(106, "Noise Cancelling Headphones", "audio", 199.99m),
            new Product(107, "Phone Case", "accessories", 19.99m),
            new Product(108, "External Hard Drive", "storage", 79.99m),
            new Product(109, "Gaming Keyboard", "input devices", 129.99m),
            new Product(110, "Portable SSD", "storage", 149.99m),
            new Product(111, "Bluetooth Earbuds", "audio", 99.99m),
            new Product(112, "Travel Adapter", "accessories", 14.99m),
            new Product(113, "Smartwatch", "wearables", 299.99m)
        };
    }
}
