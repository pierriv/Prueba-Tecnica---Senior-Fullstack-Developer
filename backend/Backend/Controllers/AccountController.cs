using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly UserService _userService;

        public AccountController(IHubContext<NotificationHub> hubContext, UserService userService)
        {
            _hubContext = hubContext;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.RegisterUserAsyncAndEnvioEmail(model.Email, model.Password);
                if (result.Succeeded)
                {                   
                    await _hubContext.Clients.All.SendAsync("ReceiveNotification", $"Nuevo usuario registrado: {model.Email}");
                    return Ok(new { message = "Usuario registrado satisfactoriamente." });
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.PasswordSignInAsync(model.Email, model.Password, model.RememberMe);
                if (result)
                {
                    return Ok(new { message = "Inicio de sesión satisfactorio." });
                }
                ModelState.AddModelError(string.Empty, "Invalido inicio de sesión.");
            }
            return BadRequest(ModelState);
        }

    }
}
