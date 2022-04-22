using Fibonacci.Domain.Dtos;
using Fibonacci.Domain.Models;

namespace Fibonacci.Infrastructure.Repositories
{
    public interface IFibonacciNumberRepository
    {
        public Task<List<FibonacciNumberDto>> GetAll();
        public Task<FibonacciNumberDto> Create(FibonacciNumberModel fibonacciNumber);
        public Task<FibonacciNumberDto> Search(FibonacciNumberDto fibonacciNumber);
        public Task<FibonacciNumberDto> GetMaxIndex();
    }
}