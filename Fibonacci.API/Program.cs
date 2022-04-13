using Fibonacci.Application.Services;
using Fibonacci.Infrastructure.DataAccess;
using Fibonacci.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContextPool<FibonacciContext>(options =>
{
    var serverVersion = new MySqlServerVersion(new Version(5, 7, 37));
    options.UseMySql(builder.Configuration.GetConnectionString("mysql"),
                   serverVersion,
                   mysqlOptions =>
                   {

                       mysqlOptions.EnableRetryOnFailure(1, TimeSpan.FromSeconds(5), null);
                   });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Repository & Service registration
builder.Services.AddScoped<IFibonacciNumberRepository, FibonacciNumberRepository>();
builder.Services.AddScoped<IFibonacciService, FibonacciService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthorization();

app.MapControllers();

app.Run();
