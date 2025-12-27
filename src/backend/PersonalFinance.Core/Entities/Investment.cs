using System.ComponentModel.DataAnnotations;

namespace PersonalFinance.Core.Entities;

public enum InvestmentType
{
    Savings,
    Bonds,
    IndexFund,
    Crypto
}

public class Investment
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public InvestmentType Type { get; set; }

    /// <summary>
    /// Base return rate (annual percentage).
    /// </summary>
    public decimal BaseReturnRate { get; set; }

    /// <summary>
    /// Risk level (1-10, where 10 is highest risk).
    /// </summary>
    public int RiskLevel { get; set; }

    /// <summary>
    /// Volatility factor (0.0 to 1.0) used for simulation variance.
    /// </summary>
    public double Volatility { get; set; }

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
