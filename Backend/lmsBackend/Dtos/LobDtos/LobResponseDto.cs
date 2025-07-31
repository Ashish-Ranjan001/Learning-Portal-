namespace lmsBackend.Dtos.LobDtos
{
    public class LobResponseDto
    {
        public string LobId { get; set; } = string.Empty;
        public string LobName { get; set; } = string.Empty;
        public string LobDescription { get; set; } = string.Empty;
        public bool Status { get; set; }
    }
}
