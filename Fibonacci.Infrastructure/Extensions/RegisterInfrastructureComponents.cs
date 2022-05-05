using Fibonacci.Infrastructure.DataAccess;
using Fibonacci.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Infrastructure.Extensions
{
    public static class RegisterInfrastructureComponents
    {
        public static void AddInfrastructureComponents(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IFibonacciNumberRepository, FibonacciNumberRepository>();
            services.AddDbContextPool<FibonacciContext>(options =>
            {
                var serverVersion = new MySqlServerVersion(new Version(5, 7, 37));
                options.UseMySql(configuration.GetConnectionString("mysql"),
                               serverVersion,
                               mysqlOptions =>
                               {

                                   mysqlOptions.EnableRetryOnFailure(1, TimeSpan.FromSeconds(5), null);
                               });
            });
        }
    }
}
