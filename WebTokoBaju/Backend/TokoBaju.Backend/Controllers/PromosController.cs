using Microsoft.AspNetCore.Mvc;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Services;

namespace TokoBaju.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromosController : ControllerBase
    {
        private readonly PromosService _promosService;

        public PromosController(PromosService promosService)
        {
            _promosService = promosService;
        }

        [HttpGet]
        public async Task<List<Promo>> Get() =>
            await _promosService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Promo>> Get(string id)
        {
            var promo = await _promosService.GetAsync(id);
            if (promo is null) return NotFound();
            return promo;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Promo newPromo)
        {
            // Check if code already exists
            var existing = await _promosService.GetByCodeAsync(newPromo.Code);
            if (existing != null)
            {
                return BadRequest(new { message = "Kode promo sudah digunakan" });
            }

            await _promosService.CreateAsync(newPromo);
            return CreatedAtAction(nameof(Get), new { id = newPromo.Id }, newPromo);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Promo updatedPromo)
        {
            var promo = await _promosService.GetAsync(id);
            if (promo is null) return NotFound();

            updatedPromo.Id = promo.Id;
            await _promosService.UpdateAsync(id, updatedPromo);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var promo = await _promosService.GetAsync(id);
            if (promo is null) return NotFound();

            await _promosService.RemoveAsync(id);
            return NoContent();
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidatePromo([FromBody] ValidatePromoRequest request)
        {
            var promo = await _promosService.GetByCodeAsync(request.Code);
            
            if (promo == null)
            {
                return NotFound(new { message = "Kode promo tidak ditemukan" });
            }

            if (!_promosService.IsPromoValid(promo, request.OrderTotal))
            {
                return BadRequest(new { message = "Promo tidak valid atau sudah expired" });
            }

            var discount = _promosService.CalculateDiscount(promo, request.OrderTotal);

            return Ok(new
            {
                promoId = promo.Id,
                code = promo.Code,
                name = promo.Name,
                discount = discount,
                finalTotal = request.OrderTotal - discount
            });
        }
    }

    public class ValidatePromoRequest
    {
        public string Code { get; set; } = null!;
        public decimal OrderTotal { get; set; }
    }
}
