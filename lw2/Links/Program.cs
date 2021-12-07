using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;

namespace Links
{
    class Program
    {
        static Dictionary<string, HttpStatusCode> links = new Dictionary<string, HttpStatusCode>();

        static void Main()
        {
            string StartUrl = "http://www.DeadLinkCity.com";
            string protocol = "http://";
            string domen = "www.deadlinkcity.com";

            CheckLink(StartUrl, domen, protocol);
            Output();
            Console.WriteLine("Check success");
        }

        static void Output()
        {
            string brokenLinksFile = "C:/Users/sad_a/Desktop/Study/Testing/lw2/Links/broken-links.txt";
            string nobrokenLinksFile = "C:/Users/sad_a/Desktop/Study/Testing/lw2/Links/no-broken-links.txt";
            if (!File.Exists(brokenLinksFile))
            {
                Console.WriteLine("Broken Links File not found!");
                return;
            }
            if (!File.Exists(nobrokenLinksFile))
            {
                Console.WriteLine("No broken Links File not found!");
                return;
            }

            using StreamWriter broken = new StreamWriter(brokenLinksFile, false, System.Text.Encoding.Default);
            using StreamWriter noBroken = new StreamWriter(nobrokenLinksFile, false, System.Text.Encoding.Default);

            int brokenLinksCount = 0;
            int noBrokenLinksCount = 0;
            foreach (KeyValuePair<string, HttpStatusCode> link in links)
            {
                if ((int)link.Value >= 200 && (int)link.Value < 400)
                {
                    noBroken.WriteLine(link.Key + " - " + (int)link.Value);
                    noBrokenLinksCount++;
                }
                else
                {
                    broken.WriteLine(link.Key + " - " + (int)link.Value);
                    brokenLinksCount++;
                }
            }
            string date = DateTime.Today.ToString("d");

            broken.WriteLine("Number of broken links: " + brokenLinksCount);
            broken.WriteLine(date);

            noBroken.WriteLine("Number of no broken links: " + noBrokenLinksCount);
            noBroken.WriteLine(date);
        }

        static void CheckLink(string url, string domen, string protocol)
        {
            Answer answer;
            try
            {
                Console.WriteLine("Check: " + url);
                answer = MakeRequest(url);
            }
            catch (Exception e)
            {
                links.Add(url, HttpStatusCode.GatewayTimeout);
                return;
            }
            links.Add(answer.link, answer.status);
            List<string> newLinks = HtmlAgilityPack(answer.html);

            for (int i = 0; i < newLinks.Count; i++)
            {
                try
                {
                    string link = protocol + domen + newLinks[i];
                    Uri uri = new Uri(link);
                    if (uri.Host == domen)
                    {
                        CheckLink(link, domen, protocol);
                    }
                }
                catch (Exception)
                {
                }
            }
        }

        static Answer MakeRequest(string url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream stream = response.GetResponseStream();
                StreamReader sr = new StreamReader(stream);

                string html = sr.ReadToEnd();
                HttpStatusCode status = response.StatusCode;
                response.Close();

                return new Answer(html, url, status);
            }
            catch (WebException e)
            {
                return new Answer("", url, ((HttpWebResponse)e.Response).StatusCode);
            }
        }

        static List<string> HtmlAgilityPack(string html)
        {
            HtmlDocument htmlSnippet = new HtmlDocument();
            htmlSnippet.LoadHtml(html);

            List<string> Links = new List<string>();
            string[] attributes = { "href", "icon", "manifest", "poster", "src", "cite", "action" };
            foreach (HtmlAttribute att in htmlSnippet.DocumentNode.GetAttributes(attributes))
            {
                Links.Add(att.Value);
            }

            return Links;
        }
        public struct Answer
        {
            public Answer(string html, string link, HttpStatusCode status)
            {
                this.html = html;
                this.link = link;
                this.status = status;
            }

            public string html;
            public string link;
            public HttpStatusCode status;
        }
    }
}
