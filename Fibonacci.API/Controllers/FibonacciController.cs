using Fibonacci.Application.Commands;
using Fibonacci.Application.Queries;
using Fibonacci.Domain.Dtos;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Fibonacci.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FibonacciController : ControllerBase
    {

        private readonly CreateFibonacciNumber _createFibonacciNumber;
        private readonly ReadFibonacciNumbers _readFibonacciNumbers;
        private readonly SearchFibonacciIndex _searchFibonacciIndex;

        public FibonacciController(CreateFibonacciNumber createFibonacciNumber, ReadFibonacciNumbers readFibonacciNumbers, SearchFibonacciIndex searchFibonacciIndex)
        {
            _createFibonacciNumber = createFibonacciNumber;
            _readFibonacciNumbers = readFibonacciNumbers;
            _searchFibonacciIndex = searchFibonacciIndex;
        }

        // GET: api/<FibonacciController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FibonacciNumberDto>>> GetAll()
        {
            var fibonacciNumbersList = await _readFibonacciNumbers.Handle();
            return Ok(fibonacciNumbersList);
        }

        // GET api/<FibonacciController>/5
        [HttpGet("{index}")]
        public async Task<ActionResult<FibonacciNumberDto>> Find(int index)
        {
            var fibonacciNumberSearchResult = await _searchFibonacciIndex.Handle(index);
            if (fibonacciNumberSearchResult.Status != "200")
            {
                return NotFound(fibonacciNumberSearchResult);
            }
            return Ok(fibonacciNumberSearchResult);
        }

        // POST api/<FibonacciController>
        [HttpPost]
        public async Task<ActionResult<FibonacciNumberDto>> Create([FromBody] FibonacciNumberDto fibonacciNumberDto)
        {

            var fibonacciDtoResult = await _createFibonacciNumber.HandleCreateFibonacciNumber(fibonacciNumberDto);
            if (fibonacciDtoResult.Status != "200")
            {
                return BadRequest(fibonacciDtoResult);
            }
            return Ok(fibonacciDtoResult);
        }
    }
}
