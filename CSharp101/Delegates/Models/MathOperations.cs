using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates.Models
{
    internal class MathOperations
    {
        public delegate int MathOperation(int input1, int input2);

        public static int Add(int input1, int input2)
        {
            return input1 + input2;
        }

        public static int Subtract(int input1, int input2)
        {
            return input1 - input2;
        }

        public static int Multiply(int input1, int input2)
        {
            return input1 * input2;
        }

        public static int Modulo(int input1, int input2)
        {
            if (input2 == 0)
            {
                throw new DivideByZeroException("Denominator can't be zero!");
            }
            return input1 % input2;
        }

    }
}
