using AutoMapper;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.LobDtos;
using lmsBackend.Models;
using lmsBackend.Repository.LobRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;

namespace lmsBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class lobsController : ControllerBase
    {
        private readonly ILob _lobService;

        public lobsController(ILob lobService)
        {
            _lobService = lobService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LobResponseDto>>> GetLobs()
        {
            var lobs = await _lobService.GetLobsAsync();
            return Ok(
                new
                {
                    data = lobs,
                    msg = "all Lobs data send as response"
                });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LobResponseDto>> GetLob(string id)
        {
            var lob = await _lobService.GetLobByIdAsync(id);
            if (lob == null) return NotFound(new
            {
                msg = "Lob not found",

            });
            return Ok(new
            {
                data = lob,
                msg = "Lob by id data send as response"
            });
        }

        [HttpPost]
        public async Task<ActionResult<LobResponseDto>> CreateLob([FromBody] CreateLobDto createLobDto)
        {
            var lob = await _lobService.CreateLobAsync(createLobDto);
            return Ok(new
            {
                data = lob,
                msg="LOb is created sucessfully"
            });

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLob(string id, [FromBody] LobResponseDto updateLobDto)
        {
            var updatedLob = await _lobService.UpdateLobAsync(id, updateLobDto);
            if (updatedLob == null) return NotFound(new
            {
                msg = "Lob not found",
            });
            return Ok(new
            {
                data = updatedLob,
                msg = "Lob is updated sucessfully"
            });
        }


    }

}
