namespace TaskTracker.Models
{
    public class ActivityData
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public string ActivityTitle { get; set; }
        public string Description { get; set; }
        public decimal Hours { get; set; }
    }
}
