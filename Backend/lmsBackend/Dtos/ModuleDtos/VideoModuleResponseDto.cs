namespace lmsBackend.Dtos.ModuleDtos
{
    public class VideoModuleResponseDto
    {
        public string module_id { get; set; } = string.Empty;
        public string course_id { get; set; } = string.Empty;
        public string modulename { get; set; } = string.Empty;
        public int duration { get; set; }
        public string videopath { get; set; } = string.Empty;
    }
}
