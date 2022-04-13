using Fibonacci.Application.Commands;
using Fibonacci.Application.Queries;
using Fibonacci.Application.Services;
using Fibonacci.Domain.Dtos;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Fibonacci.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FibonacciController : ControllerBase
    {

        private readonly IFibonacciService _service;

        public FibonacciController(IFibonacciService service)
        {
            _service = service;
        }

        // GET: api/<FibonacciController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FibonacciNumberDto>>> GetAll()
        {
            var query = new ReadFibonacciNumbers(_service);
            var fibonacciNumbersList = await query.Handle();
            return Ok(fibonacciNumbersList);
        }

        // GET api/<FibonacciController>/5
        [HttpGet("{index}")]
        public async Task<ActionResult<FibonacciNumberDto>> Find(int index)
        {
            var query = new SearchFibonacciIndex(_service);
            var fibonacciNumberSearchResult = await query.Handle(index);
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
            var command = new CreateFibonacciNumber(_service);
            var fibonacciDtoResult = await command.HandleCreateFibonacciNumber(fibonacciNumberDto);
            if (fibonacciDtoResult.Status != "200")
            {
                return BadRequest(fibonacciDtoResult);
            }
            return Ok(fibonacciDtoResult);
        }
    }
}
