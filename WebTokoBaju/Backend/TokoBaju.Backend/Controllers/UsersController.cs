using Microsoft.AspNetCore.Mvc;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Services;

namespace TokoBaju.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        public async Task<List<User>> Get() =>
            await _usersService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, User updatedUser)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            updatedUser.Id = user.Id;
            // Prevent changing email/role if not intended, but for MVP we assume client sends correct data
            // In a real app, restrict what can be updated here
            if (string.IsNullOrEmpty(updatedUser.Password))
            {
                 updatedUser.Password = user.Password; // Keep old password if not provided
            }

            await _usersService.UpdateAsync(id, updatedUser);

            await _usersService.UpdateAsync(id, updatedUser);

            return NoContent();
        }

        [HttpPost("{id}/wallet/topup")]
        public async Task<IActionResult> TopUpWallet(string id, [FromBody] decimal amount)
        {
            var user = await _usersService.GetAsync(id);
            if (user is null) return NotFound();
            
            user.WalletBalance += amount;
            await _usersService.UpdateAsync(id, user); // Make sure your UsersService.UpdateAsync handles the replacing correctly
            
            return Ok(new { Balance = user.WalletBalance });
        }
    }
}
