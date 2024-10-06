using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LINQ_1.Models
{
    internal class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }

        public Product(int id, string name, string categ, decimal price)
        {
            Id = id;
            Name = name;
            Category = categ;
            Price = price;
        }
    }
}
