namespace TaskTracker.Models
{
    public class TaskData
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ClientName { get; set; }
        public string ProjectName { get; set; }
        public string TaskTitle { get; set; }
        public decimal Hours { get; set; }
        public string DateTime { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedBy { get; set; }
        public string supportType { get; set; }
        public string Priority { get; set; }
        public string Description { get; set; }
    }
}
