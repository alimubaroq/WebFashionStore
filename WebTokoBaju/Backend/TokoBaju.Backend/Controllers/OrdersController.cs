using Microsoft.AspNetCore.Mvc;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Services;

namespace TokoBaju.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrdersService _ordersService;

        public OrdersController(OrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        [HttpGet]
        public async Task<List<Order>> Get() =>
            await _ordersService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Order>> Get(string id)
        {
            var order = await _ordersService.GetAsync(id);

            if (order is null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpGet("user/{userId}")]
        public async Task<List<Order>> GetByUserId(string userId) =>
            await _ordersService.GetByUserIdAsync(userId);

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(string id, [FromBody] string status)
        {
            var order = await _ordersService.GetAsync(id);
            if (order is null) return NotFound();

            await _ordersService.UpdateStatusAsync(id, status);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Order newOrder)
        {
            // Basic validation
            if (newOrder.Items == null || newOrder.Items.Count == 0)
            {
                return BadRequest("Order items cannot be empty.");
            }

            // Trust frontend total for now as it includes tax/shipping/discounts
            // In production, this should be fully recalculated server-side with all factors
            // newOrder.TotalAmount = newOrder.Items.Sum(i => i.Price * i.Quantity);

            await _ordersService.CreateAsync(newOrder);

            return CreatedAtAction(nameof(Get), new { id = newOrder.Id }, newOrder);
        }
        [HttpGet("stats")]
        public async Task<ActionResult<SalesStatsDto>> GetStats()
        {
            var stats = await _ordersService.GetSalesStatsAsync();
            return Ok(stats);
        }
    }
}
