using System;
using System.Net.Mail;

namespace Notificaciones
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }

        public static void SendMail()
        {
            try
            {
                Console.WriteLine("Metodo llamado ");
                MailMessage mail = new MailMessage();
                SmtpClient smtServer = new SmtpClient("smtp.gmail.com");

                mail.From
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
