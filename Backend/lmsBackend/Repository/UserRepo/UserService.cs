using AutoMapper;
using Google.Protobuf.WellKnownTypes;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.User;
using lmsBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace lmsBackend.Repository.UserRepo
{
    public class UserService : IUser
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<UserResponseDto>> GetUsersAsync()
        {
            var users = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.Lob)
                .ToListAsync();

            return _mapper.Map<List<UserResponseDto>>(users);
        }

        public async Task<UserResponseDto?> GetUserByIdAsync(string id)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.Lob)
                .FirstOrDefaultAsync(u => u.Id == id);

            return user == null ? null : _mapper.Map<UserResponseDto>(user);
        }

        public async Task<UserResponseDto?> CreateUserAsync(CreateUserDto createUserDto)
        {
            var lob = await _context.Lobs.FindAsync(createUserDto.LobId);
            if (lob == null) return null;

            var user = _mapper.Map<User>(createUserDto);
            user.LobId = createUserDto.LobId;
            string timestamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
            string randomString = Guid.NewGuid().ToString().Substring(0,6).ToUpper();
            string name = createUserDto.Name.Split('_')[0].ToUpper();
            user.Id = $"USER-{name}-{timestamp}-{randomString}";
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            user = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.Lob)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            return user == null ? null : _mapper.Map<UserResponseDto>(user);
        }

        public async Task<UserResponseDto?> UpdateUserAsync(string id, CreateUserDto updateUserDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;
            _mapper.Map(updateUserDto, user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            user = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.Lob)
                .FirstOrDefaultAsync(u => u.Id == user.Id);
            return  _mapper.Map<UserResponseDto>(user);
        }
    }
}
