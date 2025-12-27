using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalFinance.Core.Entities;

namespace PersonalFinance.Infrastructure.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Investment> Investments { get; set; }
    public DbSet<UserPreference> UserPreferences { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);

        builder.Entity<Investment>().HasData(
            new Investment
            {
                Id = 1,
                Name = "High Yield Savings",
                Type = InvestmentType.Savings,
                BaseReturnRate = 4.5m,
                RiskLevel = 1,
                Volatility = 0.05,
                Description = "Safe and steady returns."
            },
            new Investment
            {
                Id = 2,
                Name = "Government Bonds",
                Type = InvestmentType.Bonds,
                BaseReturnRate = 5.2m,
                RiskLevel = 3,
                Volatility = 0.15,
                Description = "Low risk government backed securities."
            },
            new Investment
            {
                Id = 3,
                Name = "S&P 500 Index Fund",
                Type = InvestmentType.IndexFund,
                BaseReturnRate = 10.0m,
                RiskLevel = 6,
                Volatility = 0.40,
                Description = "Market average returns with moderate volatility."
            },
            new Investment
            {
                Id = 4,
                Name = "Bitcoin",
                Type = InvestmentType.Crypto,
                BaseReturnRate = 45.0m,
                RiskLevel = 10,
                Volatility = 0.95,
                Description = "High risk, high potential reward cryptocurrency."
            }
        );
    }
}
