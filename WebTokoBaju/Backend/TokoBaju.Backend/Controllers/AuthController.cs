using Microsoft.AspNetCore.Mvc;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Services;

namespace TokoBaju.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UsersService _usersService;
        private readonly ActivityLogService _logService;

        public AuthController(UsersService usersService, ActivityLogService logService)
        {
            _usersService = usersService;
            _logService = logService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var existingUser = await _usersService.GetByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Email already registered" });
            }

            var newUser = new User
            {
                Email = registerDto.Email,
                FullName = registerDto.FullName,
                Password = registerDto.Password, // Note: In production, hash this!
                Role = "Customer"
            };

            await _usersService.CreateAsync(newUser);

             // Log Activity (Since we don't have ID back from InsertOne easily in this simple setup without fetching back, we might skip ID or fetch it. 
             // Ideally UsersService returns the created object. For now we log without ID or fetch it.)
             var createdUser = await _usersService.GetByEmailAsync(registerDto.Email);
             if (createdUser != null)
             {
                await _logService.LogAsync(
                    createdUser.Id ?? "Unknown", 
                    createdUser.FullName ?? "Unknown", 
                    createdUser.Role ?? "Customer", 
                    "Register", 
                    "New user registered"
                );
             }

            return Ok(new { message = "Registration successful" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _usersService.GetByEmailAsync(loginDto.Email);
            
            if (user == null || user.Password != loginDto.Password) // Note: In production, verify hash!
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // Return basic user info (In real app, return JWT)
            // Return basic user info (In real app, return JWT)
            // Log Activity
            await _logService.LogAsync(
                user.Id ?? "Unknown", 
                user.FullName ?? "Unknown", 
                user.Role ?? "Customer", 
                "Login", 
                "User logged in successfully"
            );

            return Ok(new 
            { 
                id = user.Id,
                email = user.Email,
                fullName = user.FullName,
                role = user.Role,
                token = "dummy-jwt-token-" + Guid.NewGuid() // Simulated token
            });
        }

        [HttpPost("seed-admin")]
        public async Task<IActionResult> SeedAdmin()
        {
            var adminEmail = "admin@tokobaju.com";
            var existingAdmin = await _usersService.GetByEmailAsync(adminEmail);
            if (existingAdmin != null)
            {
                return BadRequest("Admin already exists");
            }

            var adminUser = new User
            {
                Email = adminEmail,
                FullName = "Administrator",
                Password = "admin123", // In production, hash this!
                Role = "Admin"
            };

            await _usersService.CreateAsync(adminUser);
            return Ok(new { message = "Admin user created. Email: admin@tokobaju.com, Password: admin123" });
        }
    }
}
