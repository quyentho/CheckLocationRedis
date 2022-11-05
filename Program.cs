using System.ComponentModel.DataAnnotations;
using CheckLocations.Data;
using CheckLocations.Models;
using CheckLocations.Services;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<IConnectionMultiplexer>(opt =>
    ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("RedisConnection"))
);
builder.Services.AddScoped<ICsvServices, CsvServices>();
builder.Services.AddScoped<ILocationRepository, RedisLocationRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapGet("/api", () => "Hello World");
app.MapPost("/api/upload", async (HttpRequest request,
                            IConfiguration configuration,
                            ICsvServices csvServices,
                            ILocationRepository repository) =>
{
    var csvFile = request.Form.Files[0];
    if (csvFile is null)
    {
        return Results.BadRequest("File is required");
    }

    string fileName = Path.GetFileName(csvFile.FileName);
    if (Path.GetExtension(fileName).ToLowerInvariant() != ".csv")
    {
        return Results.BadRequest("Invalid file type");
    }

    if (csvFile.Length > configuration.GetValue<long>("FileSizeLimit"))
    {
        return Results.BadRequest("Exceeds size limit");
    }

    List<Location> locations = csvServices.ReadLocationsFromFile(csvFile);
    List<Task> setLocationTasks = new List<Task>();
    foreach (var location in locations)
    {
        setLocationTasks.Add(repository.SetLocationAsync(location.City, location.Area));
    }

    await Task.WhenAll(setLocationTasks);

    return Results.Ok();
})
.Accepts<IFormFile>("multipart/form-data")
.Produces(200);

app.MapFallbackToFile("index.html"); ;

app.Run();

