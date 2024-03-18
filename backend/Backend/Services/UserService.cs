﻿using Backend.Jobs;
using Backend.Models;
using Hangfire;
using System;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{    
    public class UserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> RegisterUserAsync(string email, string password)
        {
            var user = new ApplicationUser { UserName = email, Email = email };
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                var emailService = new EmailService();
                var emailJob = new EmailJob(emailService);
                BackgroundJob.Enqueue(() => emailJob.SendEmail("pier.rivera9@gmail.com", "Registro exitoso", "Registro del usuario en el app"));
            }
            return result;
        }

        public async Task<bool> PasswordSignInAsync(string email, string password, bool rememberMe)
        {
            var result = await _signInManager.PasswordSignInAsync(email, password, rememberMe, lockoutOnFailure: false);
            return result.Succeeded;
        }

    }

}