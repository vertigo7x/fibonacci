using Fibonacci.Application.Services;
using Fibonacci.Domain.Dtos;
using Fibonacci.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Application.Commands
{
    public  class CreateFibonacciNumber
    {
        private readonly IFibonacciService _service;

        public CreateFibonacciNumber(IFibonacciService fibonacciService)
        {
            _service = fibonacciService;
        }

        public async Task<FibonacciNumberDto> HandleCreateFibonacciNumber(FibonacciNumberDto fibonacciDto)
        {
            // Check if already Exist
            var fibonacciNumberSearchResult = await _service.Search(fibonacciDto);

            if (fibonacciNumberSearchResult.Number == 0)
            {
                var maxIndex = await _service.GetMaxIndex();
                var fibonacciNumber = CalculateFibonacciNumberBySequenceIndex(fibonacciDto.SequenceIndex, maxIndex.Number);
                var fibonacciDtoResult =  await _service.Create(new FibonacciNumberModel(fibonacciDto.SequenceIndex, fibonacciNumber));
                fibonacciDtoResult.Status = "200";
                fibonacciDtoResult.Message = "Fibonacci nth number calculated";
                return fibonacciDtoResult;
            } else
            {
                fibonacciNumberSearchResult.Message = "Fibonacci nth number already calculated";
                fibonacciNumberSearchResult.Status = "409";
                return fibonacciNumberSearchResult;
            }
            
        }

        private long CalculateFibonacciNumberBySequenceIndex(long index, long startIndex)
        {
            if ((index == 0) || (index == 1))
            {
                return index;
            }
            else
            {
                if (index <= startIndex)
                {
                    index = startIndex;
                }
                return (CalculateFibonacciNumberBySequenceIndex(index - 1, startIndex) + CalculateFibonacciNumberBySequenceIndex(index - 2, startIndex));
            }
        }
    }
}
