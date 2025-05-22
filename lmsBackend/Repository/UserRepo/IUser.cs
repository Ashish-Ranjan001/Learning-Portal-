using lmsBackend.Dtos.User;

namespace lmsBackend.Repository.UserRepo
{
    public interface IUser
    {
        Task<List<UserResponseDto>> GetUsersAsync();
        Task<UserResponseDto?> GetUserByIdAsync(string id);
        Task<UserResponseDto?> CreateUserAsync(CreateUserDto createUserDto);
    }
}
