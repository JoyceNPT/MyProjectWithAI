using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalFinance.Core.Entities;
using PersonalFinance.Core.Interfaces;
using PersonalFinance.Infrastructure.Data;

namespace PersonalFinance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvestmentsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IReturnCalculator _calculator;

    public InvestmentsController(AppDbContext context, IReturnCalculator calculator)
    {
        _context = context;
        _calculator = calculator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var investments = await _context.Investments.ToListAsync();
        return Ok(investments);
    }

    [HttpGet("{type}/risk")]
    public async Task<IActionResult> GetRiskData(InvestmentType type)
    {
        var investment = await _context.Investments.FirstOrDefaultAsync(i => i.Type == type);
        if (investment == null) return NotFound();

        return Ok(new 
        { 
            investment.Name, 
            investment.RiskLevel, 
            investment.Volatility, 
            Description = investment.Description,
            BaseReturn = investment.BaseReturnRate
        });
    }

    [HttpPost("calculate")]
    public IActionResult Calculate([FromBody] CalculationRequest request)
    {
        var result = _calculator.CalculateWithVolatility(
            request.InitialInvestment, 
            request.MonthlyContribution, 
            request.Years, 
            request.ReturnRate, 
            request.Volatility
        );

        return Ok(result);
    }
}

public class CalculationRequest
{
    public decimal InitialInvestment { get; set; }
    public decimal MonthlyContribution { get; set; }
    public int Years { get; set; }
    public decimal ReturnRate { get; set; }
    public double Volatility { get; set; }
}
