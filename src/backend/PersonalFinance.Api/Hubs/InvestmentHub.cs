using Microsoft.AspNetCore.SignalR;
using PersonalFinance.Core.Interfaces;

namespace PersonalFinance.Api.Hubs;

public class InvestmentHub : Hub
{
    private readonly IReturnCalculator _calculator;

    public InvestmentHub(IReturnCalculator calculator)
    {
        _calculator = calculator;
    }

    public async Task CalculateAndBroadcast(string userConnectionId, decimal principal, decimal monthly, int years, decimal rate)
    {
        // This method can be called by client to request a calculation and get a pushed result back.
        // Although typically the REST API might handle the calculation and then push.
        // For "real-time updates via SignalR", we can interpret this as:
        // 1. Client creates a "session" or channel.
        // 2. Client sends slider updates -> Hub -> Broadcasts new calculation back.
        // This is faster than REST for frequent slider moves.

        var result = _calculator.Calculate(principal, monthly, years, rate);
        await Clients.Caller.SendAsync("ReceiveProjection", result);
    }
}
