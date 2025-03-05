using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaskTracker.Models
{
    public class Client
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ClientId { get; set; }

        [Required]
        [MaxLength(100)]
        public string ClientName { get; set; }

        [MaxLength(255)]
        public string ContactEmail { get; set; }

        [MaxLength(15)]
        public string ContactPhone { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
