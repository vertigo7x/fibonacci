using Fibonacci.Domain.Dtos;
using Fibonacci.Domain.Models;
using Fibonacci.Infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Infrastructure.Repositories
{
    public  class FibonacciNumberRepository : IFibonacciNumberRepository
    {

        private readonly FibonacciContext _context;

        public FibonacciNumberRepository(FibonacciContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Return all calculated numbers
        /// </summary>
        /// <returns></returns>
        public async Task<List<FibonacciNumberDto>> GetAll()
        {
            var fibonacciNumbers = await _context.FibonacciNumbers.OrderBy(x => x.SequenceIndex).ToListAsync();
            var fibonacciNumberDtos = new List<FibonacciNumberDto>();
            fibonacciNumbers.ForEach(x => fibonacciNumberDtos.Add(new FibonacciNumberDto(x)));
            return fibonacciNumberDtos;
        }

        /// <summary>
        /// Save in DB a newly calculated Fibonacci number
        /// </summary>
        /// <param name="fibonacciNumber"></param>
        /// <returns></returns>
        public async Task<FibonacciNumberDto> Create(FibonacciNumberModel fibonacciNumber)
        {
            try
            {
                await _context.FibonacciNumbers.AddAsync(fibonacciNumber);
                await _context.SaveChangesAsync();
                return new FibonacciNumberDto(fibonacciNumber);
            } catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Search if a given index number was previously requested
        /// </summary>
        /// <param name="fibonacciNumber"></param>
        /// <returns></returns>
        public async Task<FibonacciNumberDto> Search(FibonacciNumberDto fibonacciNumber)
        {
            var fibonacciNumberExist = await _context.FibonacciNumbers.Where(x => x.SequenceIndex == fibonacciNumber.SequenceIndex).FirstOrDefaultAsync();
            return fibonacciNumberExist != null? new FibonacciNumberDto(fibonacciNumberExist): fibonacciNumber;
        }
    }
}
