using AutoMapper;
using Google.Protobuf.WellKnownTypes;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.TaDtos;
using lmsBackend.Models;
using lmsBackend.Repository.UserRepo;
using Microsoft.EntityFrameworkCore;

namespace lmsBackend.Repository.TaRepo
{
    public class TaService : ITa
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public TaService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TaResponseDtos>> GetTaAsync()
        {
            var tas = await _context.Tas.Include(t => t.Admin).ToListAsync();
            return _mapper.Map<IEnumerable<TaResponseDtos>>(tas);
        }

        public async Task<TaResponseDtos?> GetTaByIdAsync(string id)
        {
            var ta = await _context.Tas.Include(t => t.Admin).FirstOrDefaultAsync(t => t.TaId == id);
            return ta == null ? null : _mapper.Map<TaResponseDtos>(ta);
        }

        public async Task<TaResponseDtos?> CreateTaAsync(CreateTaDtos createTaDto)
        {
            var admin = await _context.Admins.Include(a => a.User).FirstOrDefaultAsync(a => a.User.Email == createTaDto.Email && a.User.Phone == createTaDto.Phone);
            if (admin == null) return null;

            var ta = _mapper.Map<Ta>(createTaDto);
            ta.AdminId = admin.AdminId;
            ta.Password = "evs@123";
             string timestamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
            string name = createTaDto.Name.Split(' ')[0].ToUpper();
            string randomString = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();
            ta.TaId = $"TA-{name}-{timestamp}-{randomString}";
            _context.Tas.Add(ta);
            admin.TaId = ta.TaId;
            _context.Entry(admin).State = EntityState.Modified;

            admin.User.RoleId = 4;
            _context.Entry(admin.User).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            ta = await _context.Tas.Include(t => t.Admin).FirstOrDefaultAsync(t => t.TaId == ta.TaId);
            return ta == null ? null : _mapper.Map<TaResponseDtos>(ta);
        }
    }
}