using System;
using System.Diagnostics;
using System.IO;

namespace Tests
{
    class Program
    {
        static void Main(string[] args)
        {
            string programFile = "c:/Users/sad_a/Desktop/Study/Testing/lw1/Triangle/bin/Debug/netcoreapp3.1/Triangle.exe";
            if (!File.Exists(programFile))
            {
                Console.WriteLine("Triangle program not found!");
                return;
            }

            string testsFile = "c:/Users/sad_a/Desktop/Study/Testing/lw1/Tests/tests.txt";
            if (!File.Exists(testsFile))
            {
                Console.WriteLine("Tests not found!");
                return;
            }
           
            string[] tests = File.ReadAllLines(testsFile);
            string outputFile = "c:/Users/sad_a/Desktop/Study/Testing/lw1/Tests/TestOutput.txt";

            using (StreamWriter output = new StreamWriter(outputFile, false, System.Text.Encoding.Default))
            {
                for (int i = 0; i < tests.Length; i++)
                {
                    string[] t = tests[i].Split('=');
                    string triangleArgs = t[0];
                    string testResult = t[1];

                    string result = Test(programFile, triangleArgs);
                    string test = result == testResult ? "success" : "error";
                    output.WriteLine(i + 1 + " " + test);
                    Console.WriteLine(i + 1 + " " + test + " = " + result + " " + testResult);
                }
            }
            Console.WriteLine("Проверка " + tests.Length + " тестов закончена!");
        }

        static string Test(string program, string args)
        {
            using Process process = new Process();
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.FileName = program;
            process.StartInfo.Arguments = args;
            process.StartInfo.CreateNoWindow = true;
            process.Start();

            string output = process.StandardOutput.ReadToEnd();
            return output;
        }
    }
}
