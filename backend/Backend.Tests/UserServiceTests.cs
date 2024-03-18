using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace Backend.Tests
{
    public class UserServiceTests
    {
        [Fact]
        public async Task PasswordSignInAsync_InvalidCredentials_ReturnsFalse()
        {
            var userManagerMock = new Mock<UserManager<ApplicationUser>>(Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);
            userManagerMock.Setup(u => u.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                           .ReturnsAsync(IdentityResult.Success);

            var signInManagerMock = new Mock<SignInManager<ApplicationUser>>(userManagerMock.Object, Mock.Of<IHttpContextAccessor>(), Mock.Of<IUserClaimsPrincipalFactory<ApplicationUser>>(), null, null, null, null);
            signInManagerMock.Setup(s => s.SignInAsync(It.IsAny<ApplicationUser>(), false, null))
                             .Returns(Task.CompletedTask);

            var userService = new UserService(userManagerMock.Object, signInManagerMock.Object);


            var email = "pier.riv9@gmail.com";
            var password = "stringPabcd1_";
            var rememberMe = false;
            var signInResult = SignInResult.Failed;

            signInManagerMock.Setup(m => m.PasswordSignInAsync(email, password, rememberMe, false))
                             .ReturnsAsync(signInResult);

            var success = await userService.PasswordSignInAsync(email, password, rememberMe);

            Assert.False(success);
        }
        
        
        [Fact]
        public async Task PasswordSignInAsync_ValidCredentials_ReturnsTrue()
        {
            var userManagerMock = new Mock<UserManager<ApplicationUser>>(Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);
            userManagerMock.Setup(u => u.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                           .ReturnsAsync(IdentityResult.Success);

            var signInManagerMock = new Mock<SignInManager<ApplicationUser>>(userManagerMock.Object, Mock.Of<IHttpContextAccessor>(), Mock.Of<IUserClaimsPrincipalFactory<ApplicationUser>>(), null, null, null, null);
            signInManagerMock.Setup(s => s.SignInAsync(It.IsAny<ApplicationUser>(), false, null))
                             .Returns(Task.CompletedTask);

            var userService = new UserService(userManagerMock.Object, signInManagerMock.Object);

            var email = "pier.rivera9@gmail.com";
            var password = "stringPabcd1_";
            var rememberMe = false;
            var signInResult = SignInResult.Success;

            signInManagerMock.Setup(m => m.PasswordSignInAsync(email, password, rememberMe, false))
                             .ReturnsAsync(signInResult);

            var success = await userService.PasswordSignInAsync(email, password, rememberMe);

            Assert.True(success);
        }

        [Fact]
        public async Task RegisterUserAsync_SuccessfulRegistration_ReturnsSuccessResult()
        {
            var userManagerMock = new Mock<UserManager<ApplicationUser>>(Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);
            userManagerMock.Setup(u => u.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                           .ReturnsAsync(IdentityResult.Success);

            var signInManagerMock = new Mock<SignInManager<ApplicationUser>>(userManagerMock.Object, Mock.Of<IHttpContextAccessor>(), Mock.Of<IUserClaimsPrincipalFactory<ApplicationUser>>(), null, null, null, null);
            signInManagerMock.Setup(s => s.SignInAsync(It.IsAny<ApplicationUser>(), false, null))
                             .Returns(Task.CompletedTask);

            var userService = new UserService(userManagerMock.Object, signInManagerMock.Object);

            var result = await userService.RegisterUserAsync("pier.rivera9@gmail.com", "stringPabcd1_");

            Assert.True(result.Succeeded);
        }


    }
}
