using System.ComponentModel.DataAnnotations;

namespace lmsBackend.Dtos.AdminDtos
{
    public class CreateAdminDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be exactly 10 digits.")]
        public long Phone { get; set; }
    }
}
