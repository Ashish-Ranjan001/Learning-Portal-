using lmsBackend.Dtos.SmeDtos;

namespace lmsBackend.Repository.SmeRepo
{
    public interface ISme
    {
        Task<IEnumerable<SmeResponseDto>> GetSmesAsync();
        Task<SmeResponseDto?> GetSmeByIdAsync(string id);
        Task<SmeResponseDto?> CreateSmeAsync(CreateSmeDto createSmeDto);
        Task<SmeResponseDto> updateSme(string id);
        Task<List<SmeCourseDetailDto>> SmeAllCoures(string id);
    }
}
