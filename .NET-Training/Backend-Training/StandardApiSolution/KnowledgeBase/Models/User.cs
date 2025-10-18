using System.ComponentModel.DataAnnotations;

namespace KnowledgeBaseService.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public bool IsAdmin { get; set; }
    }
}
