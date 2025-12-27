using PersonalFinance.Core.Entities;

namespace PersonalFinance.Core.Interfaces;

public record ProjectionPoint(int Year, decimal TotalValue, decimal TotalContributed, decimal TotalInterest);

public record ProjectionResult(
    decimal FinalValue, 
    decimal TotalContributed, 
    decimal TotalInterest, 
    List<ProjectionPoint> YearlyData
);

public interface IReturnCalculator
{
    ProjectionResult Calculate(decimal initialInvestment, decimal monthlyContribution, int years, decimal annualReturnRate);
    ProjectionResult CalculateWithVolatility(decimal initialInvestment, decimal monthlyContribution, int years, decimal annualReturnRate, double volatility);
}
