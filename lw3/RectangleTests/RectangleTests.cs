using Microsoft.VisualStudio.TestTools.UnitTesting;
using RectangleLib;
using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;

namespace RectangleLib.Tests
{
    [TestClass()]
    public class RectangleTests
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentException), "Invalid argument!")]
        public void CreateInvalidRectangle_width10_Exception()
        {
            Rectangle r = new Rectangle(new Point(0, 0), 0, 10);
        }
        [TestMethod]
        [ExpectedException(typeof(ArgumentException), "Invalid argument!")]
        public void CreateInvalidRectangle_height10_Exception()
        {
            Rectangle r = new Rectangle(new Point(0, 0), 10, 0);
        }
        [TestMethod]
        [ExpectedException(typeof(ArgumentException), "Invalid argument!")]
        public void CreateInvalidRectangle_height0_width0_Exception()
        {
            Rectangle r = new Rectangle(new Point(0, 0), 0, 0);
        }

        [TestMethod]
        public void CreateValidRectangle_height10_width10_NotException()
        {
            Rectangle r = new Rectangle(new Point(0, 0), 10, 10);
        }
        [TestMethod]
        public void CreateValidRectangle_doulbe_args_NotException()
        {
            Rectangle r = new Rectangle(new Point(0, 0), 10.05, 10.1);
        }

        [TestMethod]
        public void SetTopLeftPoint_NotException()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetTopLeftPoint(new Point(10, 15));
        }

        [TestMethod]
        public void SetWidth_valid_NotException()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetWidth(15);
        }
        [TestMethod]
        public void SetWidth_valid_doubleArg_NotException()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetWidth(10.1);
        }
        [TestMethod]
        [ExpectedException(typeof(ArgumentException), "Invalid argument!")]
        public void SetWidth_invalid_0_Exception()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetWidth(0);
        }
        [TestMethod]
        [ExpectedException(typeof(ArgumentException), "Invalid argument!")]
        public void SetWidth_invalid_less0_Exception()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetWidth(-10);
        }

        [TestMethod]
        public void SetHeight_valid_NotException()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetHeight(15);
        }
        [TestMethod]
        public void SetHeight_valid_doubleArg_NotException()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetHeight(10.1);
        }
        [TestMethod]
        [ExpectedException(typeof(ArgumentException), "Invalid argument!")]
        public void SetHeight_invalid_0_Exception()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetHeight(0);
        }
        [TestMethod]
        [ExpectedException(typeof(ArgumentException), "Invalid argument!")]
        public void SetHeight_invalid_less0_Exception()
        {
            Rectangle rectangle = new Rectangle(new Point(0, 0), 10, 10);
            rectangle.SetHeight(-10);
        }

        [TestMethod]
        public void GetTopLeftPoint()
        {
            Point topLeft = new Point(0, 0);
            Rectangle rectangle = new Rectangle(topLeft, 10, 10);
            Point point = rectangle.GetTopLeftPoint();

            Assert.AreEqual(point, topLeft);
        }
        [TestMethod]
        public void GetWidth()
        {
            double width = 10;
            Rectangle r = new Rectangle(new Point(0, 0), width, 10);

            Assert.AreEqual(r.GetWidth(), width);
        }
        [TestMethod]
        public void GetHeight()
        {
            double height = 10;
            Rectangle r = new Rectangle(new Point(0, 0), 10, height);

            Assert.AreEqual(r.GetHeight(), height);
        }

        [TestMethod]
        public void GetArea()
        {
            double height = 10;
            double width = 15;
            Rectangle r = new Rectangle(new Point(0, 0), width, height);

            Assert.AreEqual(r.GetArea(), height * width);
        }

        [TestMethod]
        public void GetPerimeter()
        {
            double height = 10;
            double width = 15;
            Rectangle r = new Rectangle(new Point(0, 0), width, height);

            Assert.AreEqual(r.GetPerimeter(), (height + width) * 2);
        }
    }
}