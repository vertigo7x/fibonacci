using Fibonacci.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.Infrastructure.DataAccess
{
    public class FibonacciContext : DbContext
    {
        public DbSet<FibonacciNumberModel> FibonacciNumbers { get; set; }
        public FibonacciContext(DbContextOptions<FibonacciContext> options): base(options)
        { 
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var serverVersion = new MySqlServerVersion(new Version(5, 7, 37));
            if (!options.IsConfigured)
            {
                options.UseMySql("server=localhost;database=app_db;user id=root;password=password-1;port=6033;",
                    serverVersion,
                    mysqlOptions =>
                {
                   
                        mysqlOptions.EnableRetryOnFailure(1, TimeSpan.FromSeconds(5), null);
                });
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FibonacciNumberModel>().ToTable("FibonacciNumbers");
        }
    }
}
