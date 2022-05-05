using Fibonacci.Application.Commands;
using Fibonacci.Application.Queries;
using Fibonacci.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Application.Extensions
{
    public static class RegisterApplicationComponents
    {
        /// <summary>
        /// Register instances of all application layer components
        /// Include commands, queries and services
        /// </summary>
        /// <param name="services"></param>
        public static void AddApplicationComponents(this IServiceCollection services)
        {
            // Register services
            services.AddScoped<IFibonacciService, FibonacciService>();
            // Register commands
            services.AddScoped<CreateFibonacciNumber>();
            // Register queries
            services.AddScoped<ReadFibonacciNumbers>();
            services.AddScoped<SearchFibonacciIndex>();
        }
    }
}
