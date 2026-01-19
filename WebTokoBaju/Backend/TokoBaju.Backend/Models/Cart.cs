using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TokoBaju.Backend.Models
{
    public class Cart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? UserId { get; set; } // Nullable for guest carts if we decide to store them

        public List<CartItem> Items { get; set; } = new List<CartItem>();

        public decimal TotalPrice => Items.Sum(i => i.Price * i.Quantity);
    }

    public class CartItem
    {
        public string ProductId { get; set; } = null!;
        public string ProductName { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? ImageUrl { get; set; }
        public string? Size { get; set; }
    }
}
