using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;
using AppWithScheduler.Code;
using Microsoft.Extensions.Caching.Memory;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.IO;
using System.Text;
using DalWeCalendar;
using FluentScheduler;

namespace BusinessWeCalendar
{
    public class Notificaciones : Registry
    {
        private readonly IDalUsers _dalUsers;
        public Notificaciones()
        {
            Action someMethod = new Action(() =>
            {
                var apiKey = "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";
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress("javier.fuentes78@gmail.com", "javier Fuentes"),
                    Subject = "Prueba numero 1",
                    PlainTextContent = "Hola mundo se esta enviando desde la api sin yo tocar nada de nada"
                };
                msg.AddTo(new EmailAddress("javierfuentesbarragan@gmail.com", "Javier Fuentes"));
                client.SendEmailAsync(msg);
            });
            this.Schedule(someMethod).ToRunNow();
        }
    }
    
}