using AutoMapper;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.User;
using lmsBackend.Models;
using lmsBackend.Repository.UserRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lmsBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class usersController : ControllerBase
    {
        private readonly IUser _userService;

        public usersController(IUser userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(new
            {
                data = users,
                msg = "all users data fetched successfully"
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(new
            {
                data = user,
                msg = "user data fetched by id success"
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDto createUserDto)
        {
            var user = await _userService.CreateUserAsync(createUserDto);
            if (user == null) return BadRequest(new { msg = "Invalid LOB ID." });
            return Ok(new
            {
                data = user,
                msg = "user created successfully"
            });

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, CreateUserDto updateUserDto)
        {
            var user = await _userService.UpdateUserAsync(id, updateUserDto);
            if (user == null) return NotFound(new
            {
                msg= "user not found"
            });
            return Ok(new
            {
                data = user,
                msg = "user updated successfully"
            });
        }
    }
}
