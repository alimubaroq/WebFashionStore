using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TokoBaju.Backend.Models
{
    public class ActivityLog
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("UserId")]
        public string? UserId { get; set; }

        public string? UserName { get; set; }
        
        public string? Role { get; set; }

        public string Action { get; set; } = null!; // e.g., "Login", "Create Order"

        public string? Details { get; set; } // e.g., "Order #123 created"

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
