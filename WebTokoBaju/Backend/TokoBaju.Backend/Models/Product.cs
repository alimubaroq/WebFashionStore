using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TokoBaju.Backend.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; } = null!;

        public decimal Price { get; set; }

        public string Category { get; set; } = null!;

        public string? Description { get; set; }

        [BsonElement("ImageUrl")]
        public string? ImageUrl { get; set; }
        
        [BsonElement("Stock")]
        public int Stock { get; set; }

        public List<string> Sizes { get; set; } = new List<string>(); // S, M, L, XL
    }
}
