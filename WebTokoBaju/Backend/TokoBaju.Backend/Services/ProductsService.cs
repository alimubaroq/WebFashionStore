using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Settings;

namespace TokoBaju.Backend.Services
{
    public class ProductsService
    {
        private readonly IMongoCollection<Product> _productsCollection;

        public ProductsService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            var mongoClient = new MongoClient(
                mongoDBSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                mongoDBSettings.Value.DatabaseName);

            _productsCollection = mongoDatabase.GetCollection<Product>("Products");
        }

        public async Task<List<Product>> GetAsync() =>
            await _productsCollection.Find(_ => true).ToListAsync();

        public async Task<Product?> GetAsync(string id) =>
            await _productsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Product newProduct) =>
            await _productsCollection.InsertOneAsync(newProduct);

        public async Task UpdateAsync(string id, Product updatedProduct) =>
            await _productsCollection.ReplaceOneAsync(x => x.Id == id, updatedProduct);

        public async Task RemoveAsync(string id) =>
            await _productsCollection.DeleteOneAsync(x => x.Id == id);
            
        public async Task SeedDataAsync()
        {
            var count = await _productsCollection.CountDocumentsAsync(_ => true);
            if (count == 0)
            {
                var seedProducts = new List<Product>
                {
                    new Product 
                    { 
                        Name = "Kaos Polos Hitam Premium", 
                        Price = 75000, 
                        Category = "Pria", 
                        Description = "Kaos katun combed 30s kualitas tinggi, adem dan nyaman dipakai.", 
                        Sizes = new List<string> { "S", "M", "L", "XL" },
                        ImageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    },
                    new Product 
                    { 
                        Name = "Kemeja Flannel Merah", 
                        Price = 150000, 
                        Category = "Pria", 
                        Description = "Kemeja flannel motif kotak-kotak merah, cocok untuk gaya kasual.", 
                        Sizes = new List<string> { "M", "L", "XL" },
                        ImageUrl = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    },
                    new Product 
                    { 
                        Name = "Dress Floral Musim Panas", 
                        Price = 200000, 
                        Category = "Wanita", 
                        Description = "Dress cantik dengan motif bunga, bahan ringan dan flowy.", 
                        Sizes = new List<string> { "S", "M", "L" },
                        ImageUrl = "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    },
                     new Product 
                    { 
                        Name = "Jaket Denim Vintage", 
                        Price = 350000, 
                        Category = "Wanita", 
                        Description = "Jaket denim gaya vintage, timeless fashion item.", 
                        Sizes = new List<string> { "M", "L" },
                        ImageUrl = "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    },
                     new Product 
                    { 
                        Name = "Kaos Anak Dinosaurus", 
                        Price = 50000, 
                        Category = "Anak-anak", 
                        Description = "Kaos anak dengan sablon dinosaurus lucu.", 
                        Sizes = new List<string> { "S", "M", "L" },
                        ImageUrl = "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    }
                };
                await _productsCollection.InsertManyAsync(seedProducts);
            }
        }
    }
}
