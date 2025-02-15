namespace TaskTracker.Models
{
    public class ActivityData
    {
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public string ActivityTitle { get; set; }
        public string Description { get; set; }
        public decimal Hours { get; set; }
    }
}
