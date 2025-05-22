using AutoMapper;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.SmeDtos;
using lmsBackend.Models;
using lmsBackend.Repository.SmeRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            return Ok(smes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SmeResponseDto>> GetSme(string id)
        {
            var sme = await _smeService.GetSmeByIdAsync(id);
            if (sme == null) return NotFound();
            return Ok(sme);
        }

        [HttpPost]
        public async Task<ActionResult<SmeResponseDto>> CreateSme(CreateSmeDto createSmeDto)
        {
            var sme = await _smeService.CreateSmeAsync(createSmeDto);
            if (sme == null) return BadRequest("Invalid Admin ID.");
            return CreatedAtAction(nameof(GetSme), new { id = sme.SmeId }, sme);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSme(string id)
        {
            var sme = await _smeService.updateSme(id);
            if (sme == null) return NotFound();
            return Ok(sme);
        }

        [HttpGet("{id}/allcourses")]
        public async Task<IActionResult> GetAllCoursesBySmeId(string id)
        {
            try
            {
                var data = await _smeService.GetSmeByIdAsync(id);
                return Ok(new
                {
                    msg = "All courses by sme id",
                    data = data
                });

            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                   msg= ex.Message
                });

            }
            

        }
    }

}
