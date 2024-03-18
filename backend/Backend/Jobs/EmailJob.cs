using Backend.Services;

namespace Backend.Jobs
{
    public class EmailJob
    {
        private readonly EmailService _emailService;

        public EmailJob(EmailService emailService)
        {
            _emailService = emailService;
        }

        public void SendEmail(string to, string subject, string body)
        {
            _emailService.SendEmail(to, subject, body);
        }
    }
}
