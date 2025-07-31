using lmsBackend.Dtos.CourseDtos;
using lmsBackend.Models;

namespace lmsBackend.Repository.CourseRepo
{
    public interface ICourse
    {
        Task<IEnumerable<ResponseCourseDtos>> GetAllAsync();
        Task<ResponseCourseDtos?> GetByIdAsync(string id);
        Task<ResponseCourseDtos> AddAsync(CreateCourseDto courseDto);
        Task UpdateAsync(CreateCourseDto courseDto, string id);
    }
}
