using lmsBackend.Dtos.ModuleDtos;
using lmsBackend.Models;

namespace lmsBackend.Repository.ModuleRepo
{
    public interface IModule
    {
        Task<IEnumerable<ResponseModuleDtos>> GetAllAsync();
        Task<ResponseModuleDtos?> GetByIdAsync(string id);
        Task AddAsync(CreateModuleDtos moduleDto);
        Task UpdateAsync(string id, CreateModuleDtos moduleDto);

    }
}
