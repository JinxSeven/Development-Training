using System.ComponentModel.DataAnnotations;

namespace TaskTracker.Models
{
    public class UserData
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
