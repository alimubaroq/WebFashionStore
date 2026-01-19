using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TokoBaju.Backend.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? UserId { get; set; } // Nullable for guest checkout

        public List<CartItem> Items { get; set; } = new List<CartItem>();

        public decimal TotalAmount { get; set; }

        public string Status { get; set; } = "Pending"; // Pending, Paid, Shipped, Completed, Cancelled

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Simplified shipping info
        public string CustomerName { get; set; } = null!;
        public string ShippingAddress { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        public string? PromoCode { get; set; }
        public decimal DiscountAmount { get; set; }
    }
}
