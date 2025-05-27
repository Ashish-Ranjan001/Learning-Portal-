using System.ComponentModel.DataAnnotations;

namespace lmsBackend.Dtos.CourseDtos
{
    public class ResponseCourseDtos
    {
        public string course_id { get; set; }
        public string course_name { get; set; } = string.Empty;
        public string imagepath { get; set; } = string.Empty;
        public bool status { get; set; } = true;
        public string description { get; set; } = string.Empty;
        public string quizpath { get; set; } = string.Empty;
        public string author { get; set; } = string.Empty;
        public string category_id { get; set; } = string.Empty;


    }
}

