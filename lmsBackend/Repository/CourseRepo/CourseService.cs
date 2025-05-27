using AutoMapper;
using lmsBackend.DataAccessLayer;
using lmsBackend.Dtos.CourseDtos;
using lmsBackend.Models;
using lmsBackend.Repository.AdminRepo;
using lmsBackend.Repository.UserRepo;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;

namespace lmsBackend.Repository.CourseRepo
{
    public class CourseService : ICourse
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CourseService(AppDbContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<ResponseCourseDtos>> GetAllAsync()
        {
            var courses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Modules)
                .ToListAsync();

            return _mapper.Map<IEnumerable<ResponseCourseDtos>>(courses);
        }

        public async Task<ResponseCourseDtos?> GetByIdAsync(string id)
        {
            var course = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Modules)
                .FirstOrDefaultAsync(c => c.course_id == id);

            return _mapper.Map<ResponseCourseDtos>(course);
        }

        public async Task<ResponseCourseDtos> AddAsync(CreateCourseDto courseDto)
        {
            var course = new Courses
            {
                course_name = courseDto.course_name,
                description = courseDto.description,
                sme_id = courseDto.sme_id,
                lob_id = courseDto.lob_id,
                category_id = courseDto.category_id,
                author = courseDto.author,
                isquiz = courseDto.quizPath != null ? 1 : 0
                
            };
            string timestamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
            string name = courseDto.course_name.Split(' ')[0].ToUpper();
            string randomString = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();
            course.course_id = $"COURSE-{name}-{timestamp}-{randomString}";

            // ✅ Handle Image Upload
            if (courseDto.imagepath != null)
            {
                course.imagepath = SaveFile(courseDto.imagepath, "uploadImages");
            }

            // ✅ Handle Quiz Upload
            if (courseDto.quizPath != null)
            {
                course.quizpath = SaveFile(courseDto.quizPath, "uploadQuiz");
            }
            
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return _mapper.Map<ResponseCourseDtos>(course);
        }

        //public async Task UpdateAsync(CreateCourseDto courseDto, string id)
        //{
        //    var existingCourse = await _context.Courses.FindAsync(id);
        //    if (existingCourse == null) return;

        //    // ✅ Update Image Upload
        //    if (courseDto.imagepath != null)
        //    {
        //        existingCourse.imagepath = SaveFile(courseDto.imagepath, "uploadImages");
        //    }

        //    // ✅ Update Quiz Upload
        //    if (courseDto.quizPath != null)
        //    {
        //        existingCourse.quizpath = SaveFile(courseDto.quizPath, "uploadQuiz");
        //    }

        //    _mapper.Map(courseDto, existingCourse);
        //    _context.Courses.Update(existingCourse);
        //    await _context.SaveChangesAsync();
        //}


        public async Task UpdateAsync(CreateCourseDto courseDto, string id)
        {
            var existingCourse = await _context.Courses.FindAsync(id);
            if (existingCourse == null) return;

            // ✅ Update basic properties manually (avoid AutoMapper for the entire object)
            existingCourse.course_name = courseDto.course_name;
            existingCourse.description = courseDto.description;
            existingCourse.sme_id = courseDto.sme_id;
            existingCourse.lob_id = courseDto.lob_id;
            existingCourse.category_id = courseDto.category_id;
            existingCourse.author = courseDto.author;
            existingCourse.status = courseDto.status;

            // ✅ Update Image Upload (only if new file is provided)
            if (courseDto.imagepath != null)
            {
                // Delete old image file if it exists
                if (!string.IsNullOrEmpty(existingCourse.imagepath))
                {
                    DeleteFile(existingCourse.imagepath);
                }
                existingCourse.imagepath = SaveFile(courseDto.imagepath, "uploadImages");
            }

            // ✅ Update Quiz Upload (only if new file is provided)
            if (courseDto.quizPath != null)
            {
                // Delete old quiz file if it exists
                if (!string.IsNullOrEmpty(existingCourse.quizpath))
                {
                    DeleteFile(existingCourse.quizpath);
                }
                existingCourse.quizpath = SaveFile(courseDto.quizPath, "uploadQuiz");
                existingCourse.isquiz = 1;
            }
            else if (courseDto.quizPath == null && string.IsNullOrEmpty(existingCourse.quizpath))
            {
                existingCourse.isquiz = 0;
            }

            // ✅ Don't use AutoMapper here - we've manually updated all properties
            _context.Courses.Update(existingCourse);
            await _context.SaveChangesAsync();
        }



        // 🔹 **Reusable File Saving Method**
        private string SaveFile(IFormFile file, string folderName)
        {
            if (file == null) return string.Empty;

            string uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, folderName);

            // Ensure the folder exists
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return $"/{folderName}/{fileName}"; // Relative path
        }

        private void DeleteFile(string relativePath)
        {
            if (string.IsNullOrEmpty(relativePath)) return;

            try
            {
                // Convert relative path to absolute path
                string fullPath = Path.Combine(_webHostEnvironment.WebRootPath, relativePath.TrimStart('/'));

                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                }
            }
            catch (Exception ex)
            {
                // Log the exception (you might want to use a proper logging framework)
                Console.WriteLine($"Error deleting file: {ex.Message}");
            }
        }
    }
}