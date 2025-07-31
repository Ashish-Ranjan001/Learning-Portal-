using AutoMapper;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.AdminDtos;
using lmsBackend.Models;
using lmsBackend.Repository.AdminRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace lmsBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class adminsController : ControllerBase
    {
        private readonly IAdmin _adminService;

        public adminsController(IAdmin adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public async Task<ActionResult<List<AdminResponseDto>>> GetAdmins()
        {
            var admins = await _adminService.GetAdminsAsync();
            return Ok(new
            {
                data = admins,
                msg = "All Admins  data send as response"
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminResponseDto>> GetAdmin(string id)
        {
            var admin = await _adminService.GetAdminByIdAsync(id);
            if (admin == null) return NotFound();
            return Ok(new
            {
                data = admin,
                msg = "Admin by id data send as response"
            } );
        }

        [HttpPost]
        public async Task<ActionResult<AdminResponseDto>> CreateAdmin(CreateAdminDto createAdminDto)
        {
            var admin = await _adminService.CreateAdminAsync(createAdminDto);
            if (admin == null) return BadRequest(new
            {
                msg = "Invalid User ID or User is already an admin."
            });
            return Ok(
                new
                {
                    data = admin,
                    msg = "Admin is created successfully"
                });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> statusChange(string id)
        {
            var admin = await _adminService.statusChange(id);
            if (admin == null) return NotFound(new
            {
                msg = "Admin not found"
            });
            return Ok(new
            {
                data = admin,
                msg = "Admin status change successfully"
            });
        }
    }
}
