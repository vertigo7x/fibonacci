using Fibonacci.Application.Services;
using Fibonacci.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Application.Queries
{
    public class SearchFibonacciIndex
    {

        private readonly IFibonacciService _service;

        public SearchFibonacciIndex(IFibonacciService fibonacciService)
        {
            _service = fibonacciService;
        }

        public async Task<FibonacciNumberDto> Handle(int index)
        {
            var fibonacciNumberSearchResult = await _service.Search(new FibonacciNumberDto(index));
            if (fibonacciNumberSearchResult.Number != 0)
            {
                fibonacciNumberSearchResult.Status = "200";
                fibonacciNumberSearchResult.Message = "Fibonacci nth number already calculated";
                return fibonacciNumberSearchResult;
            }
            else
            {
                fibonacciNumberSearchResult.Message = $"Fibonacci {fibonacciNumberSearchResult.SequenceIndex} number not calculated previously";
                fibonacciNumberSearchResult.Status = "404";
                return fibonacciNumberSearchResult;
            }
        }
    }
}
