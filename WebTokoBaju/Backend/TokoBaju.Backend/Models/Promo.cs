using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TokoBaju.Backend.Models
{
    public class Promo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Code")]
        public string Code { get; set; } = null!; // Unique promo code (e.g., "NEWYEAR2025")

        [BsonElement("Name")]
        public string Name { get; set; } = null!; // Display name

        [BsonElement("Description")]
        public string? Description { get; set; }

        [BsonElement("DiscountType")]
        public string DiscountType { get; set; } = "Percentage"; // "Percentage" or "Fixed"

        [BsonElement("DiscountValue")]
        public decimal DiscountValue { get; set; } // e.g., 20 for 20% or 50000 for Rp50.000

        [BsonElement("MinPurchase")]
        public decimal MinPurchase { get; set; } = 0; // Minimum order value required

        [BsonElement("MaxDiscount")]
        public decimal? MaxDiscount { get; set; } // Max discount amount (for percentage type)

        [BsonElement("StartDate")]
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        [BsonElement("EndDate")]
        public DateTime EndDate { get; set; }

        [BsonElement("UsageLimit")]
        public int? UsageLimit { get; set; } // Max number of times promo can be used (null = unlimited)

        [BsonElement("UsedCount")]
        public int UsedCount { get; set; } = 0;

        [BsonElement("IsActive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("CreatedAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
