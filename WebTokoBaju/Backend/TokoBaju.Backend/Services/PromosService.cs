using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Settings;

namespace TokoBaju.Backend.Services
{
    public class PromosService
    {
        private readonly IMongoCollection<Promo> _promosCollection;

        public PromosService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _promosCollection = mongoDatabase.GetCollection<Promo>("Promos");
        }

        public async Task<List<Promo>> GetAsync() =>
            await _promosCollection.Find(_ => true).ToListAsync();

        public async Task<Promo?> GetAsync(string id) =>
            await _promosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Promo?> GetByCodeAsync(string code) =>
            await _promosCollection.Find(x => x.Code == code).FirstOrDefaultAsync();

        public async Task CreateAsync(Promo newPromo) =>
            await _promosCollection.InsertOneAsync(newPromo);

        public async Task UpdateAsync(string id, Promo updatedPromo) =>
            await _promosCollection.ReplaceOneAsync(x => x.Id == id, updatedPromo);

        public async Task RemoveAsync(string id) =>
            await _promosCollection.DeleteOneAsync(x => x.Id == id);

        public async Task IncrementUsageAsync(string id)
        {
            var update = Builders<Promo>.Update.Inc(x => x.UsedCount, 1);
            await _promosCollection.UpdateOneAsync(x => x.Id == id, update);
        }

        public bool IsPromoValid(Promo promo, decimal orderTotal)
        {
            var now = DateTime.UtcNow;

            // Check if promo is active
            if (!promo.IsActive) return false;

            // Check date range
            if (now < promo.StartDate || now > promo.EndDate) return false;

            // Check usage limit
            if (promo.UsageLimit.HasValue && promo.UsedCount >= promo.UsageLimit.Value) return false;

            // Check minimum purchase
            if (orderTotal < promo.MinPurchase) return false;

            return true;
        }

        public decimal CalculateDiscount(Promo promo, decimal orderTotal)
        {
            if (promo.DiscountType == "Percentage")
            {
                var discount = orderTotal * (promo.DiscountValue / 100);
                if (promo.MaxDiscount.HasValue && discount > promo.MaxDiscount.Value)
                {
                    return promo.MaxDiscount.Value;
                }
                return discount;
            }
            else // Fixed
            {
                return Math.Min(promo.DiscountValue, orderTotal);
            }
        }
    }
}
