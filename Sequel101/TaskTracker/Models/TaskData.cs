namespace TaskTracker.Models
{
    public class TaskData
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string ClientName { get; set; }
        public string ProjectName { get; set; }
        public string TaskTitle { get; set; }
        public decimal Hours { get; set; }
        public DateTime DateTime { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedBy { get; set; }
        public string TaskState { get; set; }
        public string Priority { get; set; }
        public string Description { get; set; }
    }
}
