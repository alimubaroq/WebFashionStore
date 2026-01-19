using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Settings;

namespace TokoBaju.Backend.Services
{
    public class OrdersService
    {
        private readonly IMongoCollection<Order> _ordersCollection;

        public OrdersService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            var mongoClient = new MongoClient(
                mongoDBSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                mongoDBSettings.Value.DatabaseName);

            _ordersCollection = mongoDatabase.GetCollection<Order>("Orders");
        }

        public async Task<List<Order>> GetAsync() =>
            await _ordersCollection.Find(_ => true).ToListAsync();

        public async Task<Order?> GetAsync(string id) =>
            await _ordersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<List<Order>> GetByUserIdAsync(string userId) =>
            await _ordersCollection.Find(x => x.UserId == userId).ToListAsync();

        public async Task CreateAsync(Order newOrder)
        {
            newOrder.CreatedAt = DateTime.UtcNow;
            newOrder.Status = "Pending";
            await _ordersCollection.InsertOneAsync(newOrder);
        }

        public async Task UpdateStatusAsync(string id, string status)
        {
             var update = Builders<Order>.Update.Set(o => o.Status, status);
             await _ordersCollection.UpdateOneAsync(o => o.Id == id, update);
        }
        public async Task<SalesStatsDto> GetSalesStatsAsync()
        {
            // Fetch all orders - in a real app, filtering by date would be better
            var orders = await _ordersCollection.Find(_ => true).ToListAsync();

            // Filter out cancelled orders if necessary, for now assume all valid
            // In reality check o.Status != "Cancelled"
            var validOrders = orders.Where(o => o.Status != "Cancelled").ToList();

            var totalRevenue = validOrders.Sum(o => o.TotalAmount);
            var totalOrders = validOrders.Count;
            var avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
            
            // Calculate new customers (mock or logic: count unique UserIds)
            var newCustomers = validOrders.Select(o => o.UserId).Distinct().Count(); 

            // Calculate Top Products
            var allItems = validOrders.SelectMany(o => o.Items);
            var topProducts = allItems
                .GroupBy(i => i.ProductName)
                .Select(g => new TopProductDto
                {
                    Name = g.Key,
                    Sales = g.Sum(i => i.Quantity),
                    Revenue = g.Sum(i => i.Quantity * i.Price)
                })
                .OrderByDescending(x => x.Revenue)
                .Take(5)
                .ToList();

            return new SalesStatsDto
            {
                TotalRevenue = totalRevenue,
                TotalOrders = totalOrders,
                NewCustomers = newCustomers,
                AverageOrderValue = avgOrderValue,
                TopProducts = topProducts
            };
        }
    }
}
