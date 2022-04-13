using Fibonacci.Domain.Dtos;
using Fibonacci.Domain.Models;

namespace Fibonacci.Application.Services
{
    public interface IFibonacciService
    {
        public Task<List<FibonacciNumberDto>> GetAll();
        public Task<FibonacciNumberDto> Create(FibonacciNumberModel fibonacciNumber);
        public Task<FibonacciNumberDto> Search(FibonacciNumberDto fibonacciNumber);
    }
}