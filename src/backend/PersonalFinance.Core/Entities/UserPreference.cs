using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalFinance.Core.Entities;

public class UserPreference
{
    public int Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    [ForeignKey("UserId")]
    public ApplicationUser User { get; set; } = null!;

    public int DefaultTimeHorizonYears { get; set; } = 10;
    
    public int RiskTolerance { get; set; } = 5; // 1-10

    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}
