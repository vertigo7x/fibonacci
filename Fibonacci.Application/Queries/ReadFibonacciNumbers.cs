using Fibonacci.Application.Services;
using Fibonacci.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Application.Queries
{
    public class ReadFibonacciNumbers
    {

        public readonly IFibonacciService _service;

        public ReadFibonacciNumbers(IFibonacciService fibonacciService)
        {
            _service = fibonacciService;
        }

        public async Task<List<FibonacciNumberDto>> Handle() 
        {
            return await _service.GetAll();
        }
    }
}
