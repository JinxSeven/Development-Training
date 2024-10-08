using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
namespace ECommerceApp.Models
{
    internal class Cart
    {
        public List<Product>? ProdsInCart
        {
            get;
            set;
        }
        public Cart()
        {
            ProdsInCart = new List<Product>();
        }
        public bool AddItemToCart(Product prod)
        {
            Console.WriteLine($"Stock on product Id {prod.Id} - {prod.Quants} nos");
            Console.Write($"Quantity to add: ");
            string userInputStr = Console.ReadLine()!;
            uint quant;
            try
            {
                quant = uint.Parse(userInputStr);
                if (quant > prod.Quants)
                {
                    Console.WriteLine("/nQuantity exceeds stock!");
                    return false;
                }
            }
            catch (FormatException)
            {
                Console.WriteLine("Quantity input type invalid!");
                return false;
            }
            prod.Quants -= (int)(quant);
            int? indx = null;
            if (ProdsInCart?.Count > 0)
            {
                indx = ProdsInCart.FindIndex(prd => prd.Id == prod.Id);
            }
            if (indx != null && indx < 0)
            {
                ProdsInCart![indx.Value].Quants += (int)(quant);
                return true;
            }
            Product addedProd = new Product(prod.Id, prod.Name, prod.Price, prod.Quants);
            addedProd.Quants = (int)(quant);
            ProdsInCart!.Add(addedProd);
            return true;
        }
        public bool RemoveCartItem(Product prod)
        {
            int? indx = null;
            if (ProdsInCart!.Count != 0)
            {
                indx = ProdsInCart!.FindIndex(prd => prd.Id == prod.Id);
            }
            else
            {
                Console.Write($"{Environment.NewLine}");
                Console.WriteLine("No product in cart to delete!");
                return false;
            }
            if (indx < 0)
            {
                Console.Write($"{Environment.NewLine}");
                Console.WriteLine("No such product in cart!");
                return false;
            }
            Console.WriteLine($"Cart quantity on product Id {prod.Id} - {ProdsInCart[indx.Value].Quants} nos");
            Console.Write($"Quantity to remove: ");
            string userInputStr = Console.ReadLine()!;
            uint quant;
            try
            {
                quant = uint.Parse(userInputStr);
                if (quant > (ProdsInCart[indx.Value].Quants))
                {
                    Console.Write($"{Environment.NewLine}");
                    Console.WriteLine("Quantity exceeds quantity!");
                    return false;
                }
            }
            catch (FormatException)
            {
                Console.Write($"{Environment.NewLine}");
                Console.WriteLine("Quantity input type invalid!");
                return false;
            }
            ProdsInCart[indx.Value].Quants -= (int)(quant);
            prod.Quants += (int)(quant);
            if (ProdsInCart[indx.Value].Quants == 0)
            {
                ProdsInCart.RemoveAt(indx.Value);
            }
            return true;
        }
        public void ViewCartItems()
        {
            if (ProdsInCart!.Count != 0)
            {
                Console.WriteLine($"Items in Cart:");
                ProdsInCart!.ForEach(prod =>
                {
                    Console.WriteLine($"Product Id: {prod.Id}");
                    Console.WriteLine($"Product Name: {prod.Name}");
                    Console.WriteLine($"Product Price: {prod.Price}rs");
                    Console.WriteLine($"Product Quantity: {prod.Quants}{Environment.NewLine}");
                });
            }
            else
            {
                Console.WriteLine($"Cart is empty!{Environment.NewLine}");
            }
        }
        public decimal CalculateCartTotal()
        {
            decimal total = 0;
            if (ProdsInCart!.Count > 0)
            {
                ProdsInCart.ForEach(prod =>
                {
                    int quantity = prod.Quants;
                    decimal price = prod.Price;
                    total += quantity * price;
                });
            }
            return total;
        }
    }
}