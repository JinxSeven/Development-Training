namespace TaskTracker.Models
{
    public class ActivityData
    {
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public required string ActivityTitle { get; set; }
        public required string Description { get; set; }
        public decimal Hours { get; set; }
    }
}
