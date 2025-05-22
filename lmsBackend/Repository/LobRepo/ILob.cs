using lmsBackend.Dtos.LobDtos;

namespace lmsBackend.Repository.LobRepo
{
    public interface ILob
    {
        Task<IEnumerable<LobResponseDto>> GetLobsAsync();
        Task<LobResponseDto?> GetLobByIdAsync(string id);
        Task<LobResponseDto?> CreateLobAsync(CreateLobDto createLobDto);
        Task<LobResponseDto?> UpdateLobAsync(string id, LobResponseDto createLobDto);
    }
}
