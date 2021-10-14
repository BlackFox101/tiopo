using System;

namespace Triangle
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length != 3)
            {
                Console.Write("Неизвестная ошибка!");
                return;
            }

            try
            {
                Triangle triangle = GetTriangle(args);
                Console.Write(GetTriangleType(triangle.a, triangle.b, triangle.c));
            }
            catch (Exception)
            {
                Console.Write("Неизвестная ошибка!");
            }
        }

        static string GetTriangleType(double a, double b, double c)
        {
            bool triangleExistence = a + b > c && a + c > b && b + c > a;
            if (!triangleExistence)
            {
                return "Не треугольник";
            }

            if (a == b && a == c)
            {
                return "Равносторонний";
            }

            if (a == b || a == c || b == c)
            {
                return "Равнобедренный";
            }

            return "Обычный";
        }

        static Triangle GetTriangle(string[] args)
        {
            double a = Convert.ToDouble(args[0]);
            double b = Convert.ToDouble(args[1]);
            double c = Convert.ToDouble(args[2]);

            return new Triangle(a, b, c);
        }
        public struct Triangle
        {
            public Triangle(double a, double b, double c)
            {
                this.a = a;
                this.b = b;
                this.c = c;
            }

            public double a;
            public double b;
            public double c;
        }
    }
}
