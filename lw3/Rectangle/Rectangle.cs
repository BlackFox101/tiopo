using System;
using System.Drawing;

namespace RectangleLib
{
    public class Rectangle
    {
        public Rectangle(Point topLeft, double width, double height)
        {
            this.m_topLeft = topLeft;
            if (width <= 0 || height <= 0)
            {
                throw new ArgumentException("Invalid argument!");
            }
            this.m_width = width;
            this.m_height = height;
        }

        private Point m_topLeft;
        private double m_width;
        private double m_height;

        public void SetTopLeftPoint(Point topLeft)
        {
            this.m_topLeft = topLeft;
        }
        public void SetWidth(double width)
        {
            if (width <= 0)
            {
                throw new ArgumentException("Invalid argument");
            }
            this.m_width = width;
        }
        public void SetHeight(double height)
        {
            if (height <= 0)
            {
                throw new ArgumentException("Invalid argument");
            }
            this.m_height = height;
        }

        public Point GetTopLeftPoint()
        {
            return m_topLeft;
        }
        public double GetWidth()
        {
            return m_width;
        }
        public double GetHeight()
        {
            return m_height;
        }
        public double GetArea()
        {
            return m_width * m_height;
        }
        public double GetPerimeter()
        {
            return (m_width + m_height) * 2;
        }
    }
}
