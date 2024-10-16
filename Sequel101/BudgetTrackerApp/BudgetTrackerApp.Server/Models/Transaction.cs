namespace BudgetTrackerApp.Server.Models
{
    public class Transaction
    {
        public int UserId { get; set; }
        public required string Type { get; set; }
        public int Amount { get; set; }
        public required string Category { get; set; }
    }
}
