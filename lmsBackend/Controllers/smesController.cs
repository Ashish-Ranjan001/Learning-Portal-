using lmsBackend.Dtos.SmeDtos;
using lmsBackend.Repository.SmeRepo;
using Microsoft.AspNetCore.Mvc;

namespace lmsBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class smesController : ControllerBase
    {
        private readonly ISme _smeService;

        public smesController(ISme smeService)
        {
            _smeService = smeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SmeResponseDto>>> GetSmes()
        {
            var smes = await _smeService.GetSmesAsync();
            return Ok(new
            {
                data = smes,
                msg = "All Sme data send successfully"
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SmeResponseDto>> GetSme(string id)
        {
            var sme = await _smeService.GetSmeByIdAsync(id);
            if (sme == null) return NotFound();
            return Ok(new
            {
                data = sme,
                msg = "Sme data send successfully"
            });
        }

        [HttpPost]
        public async Task<ActionResult<SmeResponseDto>> CreateSme(CreateSmeDto createSmeDto)
        {
            var sme = await _smeService.CreateSmeAsync(createSmeDto);
            if (sme == null) return BadRequest("Invalid Admin ID.");
            return Ok(new
            {
                data = sme,
                msg = "Sme created successfully"
            });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSme(string id,[FromBody] UpdateSmeStatusRequest request)
        {
            var sme = await _smeService.UpdateSmeAsync(id, request);
            if (sme == null) return NotFound();
            return Ok(new
            {
                data = sme,
                msg = "Sme updated successfully"
            });
        }

        [HttpGet("{id}/allcourses")]
        public async Task<IActionResult> GetAllCoursesBySmeId(string id)
        {
           var smeCourses = await _smeService.SmeAllCoures(id);
            if (smeCourses == null) return NotFound(new
            {
                msg = "No courses found for this SME"
            });
            return Ok(new
            {
                data = smeCourses,
                msg = "Sme courses data send successfully"
            });
        }

    }

}
