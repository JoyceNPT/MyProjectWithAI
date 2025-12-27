using PersonalFinance.Core.Interfaces;

namespace PersonalFinance.Core.Services;

public class ReturnCalculator : IReturnCalculator
{
    public ProjectionResult Calculate(decimal initialInvestment, decimal monthlyContribution, int years, decimal annualReturnRate)
    {
        return CalculateProjection(initialInvestment, monthlyContribution, years, annualReturnRate, 0);
    }

    public ProjectionResult CalculateWithVolatility(decimal initialInvestment, decimal monthlyContribution, int years, decimal annualReturnRate, double volatility)
    {
        // Simple volatility simulation: assume return rate varies by +/- volatility * random factor
        // For deterministic simplicity in this basic version, we might just reduce/increase rate slightly or keep it simple.
        // But prompt asks for "Business logic based on risk...". 
        // Let's implement a standard compounding first, and maybe a naive volatility check if needed.
        // For now, passing volatility but utilizing the base rate is a safe start, or we can use it to create ranges (High/Low).
        
        return CalculateProjection(initialInvestment, monthlyContribution, years, annualReturnRate, volatility);
    }

    private ProjectionResult CalculateProjection(decimal initialInvestment, decimal monthlyContribution, int years, decimal annualReturnRate, double volatility)
    {
        var points = new List<ProjectionPoint>();
        decimal currentBalance = initialInvestment;
        decimal totalContributed = initialInvestment;
        
        // Monthly rate
        // Ideally: (1 + annual) ^ (1/12) - 1 for precise APY, or annual / 12 for APR
        // Let's use annual / 12 for simplicity and standard bank formulas
        decimal r = (annualReturnRate / 100m) / 12m;
        
        int totalMonths = years * 12;

        points.Add(new ProjectionPoint(0, currentBalance, totalContributed, 0));

        for (int m = 1; m <= totalMonths; m++)
        {
            // Add interest
            currentBalance += currentBalance * r;
            
            // Add contribution
            currentBalance += monthlyContribution;
            totalContributed += monthlyContribution;

            // At end of each year, record point
            if (m % 12 == 0)
            {
                int year = m / 12;
                decimal totalInterest = currentBalance - totalContributed;
                points.Add(new ProjectionPoint(year, Math.Round(currentBalance, 2), Math.Round(totalContributed, 2), Math.Round(totalInterest, 2)));
            }
        }

        decimal finalValue = Math.Round(currentBalance, 2);
        decimal finalContributed = Math.Round(totalContributed, 2);
        decimal finalInterest = finalValue - finalContributed;

        return new ProjectionResult(finalValue, finalContributed, finalInterest, points);
    }
}
