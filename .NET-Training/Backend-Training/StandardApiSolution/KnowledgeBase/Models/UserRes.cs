namespace KnowledgeBaseService.Models
{
    public class UserRes
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
    }
}
