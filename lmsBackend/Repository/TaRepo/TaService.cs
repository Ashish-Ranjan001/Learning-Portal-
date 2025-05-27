using AutoMapper;
using Google.Protobuf.WellKnownTypes;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.SmeDtos;
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

        //public async Task<TaResponseDtos?> CreateTaAsync(CreateTaDtos createTaDto)
        //{
        //    var admin = await _context.Admins.Include(a => a.User).FirstOrDefaultAsync(a => a.User.Email == createTaDto.Email && a.User.Phone == createTaDto.Phone);
        //    if (admin == null) return null;

        //    var ta = _mapper.Map<Ta>(createTaDto);
        //    ta.AdminId = admin.AdminId;
        //    ta.Password = "evs@123";
        //    _context.Tas.Add(ta);

        //    string taIdValue = $"TA{DateTime.Now.ToString("yyyyMMddHHmmss")}";
        //    admin.TaId = taIdValue;
        //    _context.Entry(admin).State = EntityState.Modified;

        //    admin.User.RoleId = 4;
        //    _context.Entry(admin.User).State = EntityState.Modified;

        //    await _context.SaveChangesAsync();

        //    ta = await _context.Tas.Include(t => t.Admin).FirstOrDefaultAsync(t => t.TaId == ta.TaId);
        //    return ta == null ? null : _mapper.Map<TaResponseDtos>(ta);
        //}

        public async Task<TaResponseDtos?> CreateTaAsync(CreateTaDtos createTaDto)
        {
            // Find admin by email and phone
            var admin = await _context.Admins
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.User.Email == createTaDto.Email && a.User.Phone == createTaDto.Phone);

            if (admin == null) return null;

            // Check if this admin is currently an SME and remove SME record
            var existingSme = await _context.Smes.FirstOrDefaultAsync(s => s.AdminId == admin.AdminId);
            if (existingSme != null)
            {
                // Check if SME has courses assigned
                var smeHasCourses = await _context.Courses.AnyAsync(c => c.sme_id == existingSme.SmeId);
                if (smeHasCourses)
                {
                    // Option 1: Prevent conversion if SME has courses
                    //throw new InvalidOperationException("Cannot convert SME to TA: SME has assigned courses. Please reassign courses first.");

                    // Option 2: Set courses' sme_id to null (if you made it nullable as discussed earlier)
                    var smeCourses = await _context.Courses.Where(c => c.sme_id == existingSme.SmeId).ToListAsync();
                    foreach (var course in smeCourses)
                    {
                        course.sme_id = null;
                    }
                    _context.Courses.UpdateRange(smeCourses);
                }

                // Remove SME record
                _context.Smes.Remove(existingSme);

                // Clear SME ID from Admin
                admin.SmeId = string.Empty;
            }

            // Check if TA already exists for this admin
            var existingTa = await _context.Tas.FirstOrDefaultAsync(t => t.AdminId == admin.AdminId);
            if (existingTa != null)
            {
                throw new InvalidOperationException("TA already exists for this admin.");
            }

            // Create new TA
            var ta = _mapper.Map<Ta>(createTaDto);
            string timestamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
            string randomString = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();
            string name = createTaDto.Name.Split('_')[0].ToUpper();
            ta.TaId = $"TA-{name}-{timestamp}-{randomString}";
            ta.AdminId = admin.AdminId;

            ta.Password = "evs@123";
            
            _context.Tas.Add(ta);

            admin.TaId = ta.TaId;
            _context.Entry(admin).State = EntityState.Modified;

            // Update User role to TA (4)
            admin.User.RoleId = 4;
            _context.Entry(admin.User).State = EntityState.Modified;

            // Save all changes
            await _context.SaveChangesAsync();

            // Reload TA with Admin data for response
            ta = await _context.Tas
                .Include(t => t.Admin)
                    .ThenInclude(a => a.User)
                .FirstOrDefaultAsync(t => t.TaId == ta.TaId);

            return ta == null ? null : _mapper.Map<TaResponseDtos>(ta);
        }

    }
}