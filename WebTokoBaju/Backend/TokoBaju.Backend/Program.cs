using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TokoBaju.Backend.Settings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configure MongoDB
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDBSettings"));

builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDBSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

// Register Application Services
builder.Services.AddSingleton<TokoBaju.Backend.Services.ProductsService>();
builder.Services.AddSingleton<TokoBaju.Backend.Services.OrdersService>();
builder.Services.AddSingleton<TokoBaju.Backend.Services.UsersService>();
builder.Services.AddSingleton<TokoBaju.Backend.Services.ActivityLogService>();
builder.Services.AddSingleton<TokoBaju.Backend.Services.CategoriesService>();
builder.Services.AddSingleton<TokoBaju.Backend.Services.PromosService>();

// Register Controllers
builder.Services.AddControllers();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:5173", "http://localhost:5174") // Vite ports
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
