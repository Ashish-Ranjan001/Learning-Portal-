using AutoMapper;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.LobDtos;
using lmsBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace lmsBackend.Repository.LobRepo
{
    public class LobService:ILob
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public LobService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<LobResponseDto>> GetLobsAsync()
        {
            var lobs = await _context.Lobs.ToListAsync();
            return _mapper.Map<IEnumerable<LobResponseDto>>(lobs);
        }

        public async Task<LobResponseDto?> GetLobByIdAsync(string id)
        {
            var lob = await _context.Lobs.FindAsync(id);
            return lob == null ? null : _mapper.Map<LobResponseDto>(lob);
        }

        public async Task<LobResponseDto?> CreateLobAsync(CreateLobDto createLobDto)
        {
            var lob = _mapper.Map<Lob>(createLobDto);
            string timestamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
            string randomString = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();
            string name = createLobDto.LobName.Split('_')[0].ToUpper();
            lob.LobId = $"LOB-{name}-{timestamp}-{randomString}";

            _context.Lobs.Add(lob);
            await _context.SaveChangesAsync();
            return _mapper.Map<LobResponseDto>(lob);
        }

       
        public async Task<LobResponseDto?> UpdateLobAsync(string id, LobResponseDto updateLobDto)
        {
            var existingLob = await _context.Lobs.FindAsync(id);
            if (existingLob == null)
            {
                throw new InvalidOperationException($"LOB with ID {id} not found.");
            }

            // Update properties
            existingLob.LobName = updateLobDto.LobName ?? existingLob.LobName;
            existingLob.LobDescription = updateLobDto.LobDescription ?? existingLob.LobDescription;
            existingLob.Status = updateLobDto.Status;

            await _context.SaveChangesAsync(); // Save changes

            return _mapper.Map<LobResponseDto>(existingLob);
        }
    }
}
