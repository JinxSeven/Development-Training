namespace BudgetTrackerApp.Server.Models
{
    public class Goal
    {
        public int UserId { get; set; }
        public required string Name { get; set; }
        public int Target { get; set; }
        public int Amount { get; set; }
    }
}
