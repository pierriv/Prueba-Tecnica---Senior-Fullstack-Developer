using System.Net.Mail;
using System.Net;

namespace Backend.Services
{
    public class EmailService
    {
        public void SendEmail(string to, string subject, string body)
        {
            var fromAddress = new MailAddress("pier.rivera9@gmail.com", "Jeanpier Rivera");
            var toAddress = new MailAddress(to);
            const string fromPassword = "zcmq kpka tvwm fbpv";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };

            var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            };

            try
            {
                smtp.Send(message);
                Console.WriteLine("Correo electrónico enviado con éxito.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al enviar el correo electrónico: " + ex.Message);
            }
        }
    }
}
