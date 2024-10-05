using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Generics.Models
{
    internal class StackGenerix<T>
    {
        private List<T> stackList;

        public StackGenerix()
        {
            stackList = new List<T>();
        }

        public void Push(T value)
        {
            stackList.Add(value);
        }

        public T Pop()
        {
            if (stackList.Count == 0)
            {
                throw new InvalidOperationException("Stack is empty!");
            }

            T output = stackList[^1];
            stackList.RemoveAt(stackList.Count - 1);
            return output;
        }

        public T Peek()
        {
            if (stackList.Count == 0)
            {
                throw new InvalidOperationException("Stack is empty!");
            }

            return stackList[^1];
        }

        public int Size
        {
            get { return stackList.Count; }
        }

        public void ShowStack()
        {
            if (stackList.Count == 0)
            {
                throw new InvalidOperationException("Stack is empty!");
            }

            for (int i = (stackList.Count - 1); i >= 0; i--)
            {
                Console.WriteLine(stackList[i]);
            }
        }
    }
}
