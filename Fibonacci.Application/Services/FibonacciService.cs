using Fibonacci.Domain.Dtos;
using Fibonacci.Domain.Models;
using Fibonacci.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Application.Services
{
    public class FibonacciService : IFibonacciService
    {
        private readonly IFibonacciNumberRepository _repository;

        public FibonacciService(IFibonacciNumberRepository fibonacciNumberRepository)
        {
            _repository = fibonacciNumberRepository;
        }
        public async Task<List<FibonacciNumberDto>> GetAll()
        {
            return await _repository.GetAll();
        }
        public async Task<FibonacciNumberDto> Create(FibonacciNumberModel fibonacciNumber)
        {
            var fibonacciModel = await _repository.Create(fibonacciNumber);
            return new FibonacciNumberDto(fibonacciModel.SequenceIndex, fibonacciModel.Number);
        }
        public Task<FibonacciNumberDto> Search(FibonacciNumberDto fibonacciNumber)
        {
            return _repository.Search(fibonacciNumber);
        }
    }
}
