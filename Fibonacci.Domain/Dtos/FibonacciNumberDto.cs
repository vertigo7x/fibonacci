using Fibonacci.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Domain.Dtos
{
    public class FibonacciNumberDto
    {
        /// <summary>
        /// Index in the Fibonacci sequence to calculate
        /// </summary>

        private const string STATUS_CALCULATED = "Calculated";
        public long SequenceIndex { get; set; }
        public long Number { get; set; }
        public DateTime RequestDate { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        public FibonacciNumberDto() {}
        public FibonacciNumberDto(long sequenceIndex, long number)
        {
            SequenceIndex = sequenceIndex >= 1 ? sequenceIndex : throw new ArgumentException("The sequence index must be bigger than ZERO");
            Number = number;
        }

        public FibonacciNumberDto(long sequenceIndex)
        {
            SequenceIndex = sequenceIndex >= 1 ? sequenceIndex : throw new ArgumentException("The sequence index must be bigger than ZERO");
            Status = STATUS_CALCULATED;
        }

        public FibonacciNumberDto(FibonacciNumberModel fibonacciNumber)
        {
            SequenceIndex = fibonacciNumber.SequenceIndex;
            Number = fibonacciNumber.Number;
            RequestDate = fibonacciNumber.RequestDate;
            Status = STATUS_CALCULATED;
        }
    }
}
