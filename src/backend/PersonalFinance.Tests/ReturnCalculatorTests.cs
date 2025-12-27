using PersonalFinance.Core.Services;
using Xunit;

namespace PersonalFinance.Tests;

public class ReturnCalculatorTests
{
    [Fact]
    public void Calculate_ZeroReturn_ReturnsPrincipalPlusContributions()
    {
        // Arrange
        var calculator = new ReturnCalculator();
        decimal initial = 1000m;
        decimal monthly = 100m;
        int years = 1;
        decimal rate = 0m;

        // Act
        var result = calculator.Calculate(initial, monthly, years, rate);

        // Assert
        // Total invested: 1000 + (100 * 12) = 2200
        decimal expected = 2200m;
        Assert.Equal(expected, result.FinalValue);
        Assert.Equal(expected, result.TotalContributed);
        Assert.Equal(0m, result.TotalInterest);
    }

    [Fact]
    public void Calculate_WithInterest_ReturnsGrowth()
    {
        // Arrange
        var calculator = new ReturnCalculator();
        decimal initial = 1000m;
        decimal monthly = 100m;
        int years = 1;
        decimal rate = 12m; // 1% per month for simplicity

        // Act
        var result = calculator.Calculate(initial, monthly, years, rate);

        // Assert
        // Month 1: (1000 * 1.01) + 100 = 1010 + 100 = 1110
        // ... calculation is complex, but result.FinalValue should be > 2200
        Assert.True(result.FinalValue > 2200m);
        Assert.True(result.TotalInterest > 0m);
        Assert.Equal(years + 1, result.YearlyData.Count); // Year 0 + Year 1
    }

    [Fact]
    public void CalculateWithVolatility_ReturnsResult()
    {
        // Arrange
        var calculator = new ReturnCalculator();
        
        // Act
        var result = calculator.CalculateWithVolatility(1000, 100, 10, 5, 0.1);

        // Assert
        Assert.NotNull(result);
        Assert.True(result.FinalValue > 0);
    }
}
