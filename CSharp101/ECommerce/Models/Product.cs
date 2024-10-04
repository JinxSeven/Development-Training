using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ECommerceApp.Models
{
    internal class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quants { get; set; }

        public Product(int prodId, string prodName, decimal prodPrice, int prodQuants)
        {
            Id = prodId;
            Name = prodName;
            Price = prodPrice;
            Quants = prodQuants;
        }

        public void GetProductDetails()
        {
            Console.WriteLine($"Product Id: {Id}");
            Console.WriteLine($"Product Name: {Name}");
            Console.WriteLine($"Product Price: {Price}rs");
            Console.WriteLine($"Product Stock: {Quants}{Environment.NewLine}");
        }
    }
}
