namespace Fibonacci.Domain.Models
{
    public class FibonacciNumberModel
    {
        public long Id { get; set; }
        /// <summary>
        /// Index in the Fibonacci sequence to calculate
        /// </summary>
        public long SequenceIndex { get; set; }
        /// <summary>
        /// Result of the calculation
        /// </summary>
        public long Number { get; set; }
        public DateTime RequestDate { get; set; }
        public DateTime CreationDate { get; set; }

        FibonacciNumberModel() { }
        public FibonacciNumberModel(long sequenceIndex,long number)
        {
            Number = number;
            SequenceIndex = sequenceIndex >= 1 ? sequenceIndex : throw new ArgumentException("The sequence index must be bigger than ZERO");
        }
        public FibonacciNumberModel(long sequenceIndex, long number, DateTime requestDate)
        {
            Number = number;
            SequenceIndex = sequenceIndex >= 1 ? sequenceIndex : throw new ArgumentException("The sequence index must be bigger than ZERO");
            RequestDate = requestDate;
        }
    }
}