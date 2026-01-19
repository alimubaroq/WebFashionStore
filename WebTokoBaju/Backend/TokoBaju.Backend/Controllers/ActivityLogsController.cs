using Microsoft.AspNetCore.Mvc;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Services;

namespace TokoBaju.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityLogsController : ControllerBase
    {
        private readonly ActivityLogService _logService;

        public ActivityLogsController(ActivityLogService logService)
        {
            _logService = logService;
        }

        [HttpGet]
        public async Task<List<ActivityLog>> GetAll() =>
            await _logService.GetAllAsync();

        [HttpGet("user/{userId}")]
        public async Task<List<ActivityLog>> GetByUser(string userId) =>
            await _logService.GetByUserAsync(userId);
    }
}
