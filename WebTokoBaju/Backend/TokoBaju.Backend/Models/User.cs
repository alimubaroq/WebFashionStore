using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TokoBaju.Backend.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; } = null!;

        [BsonElement("Password")] // In real app, store hash!
        public string Password { get; set; } = null!;

        public string FullName { get; set; } = null!;

        public string Role { get; set; } = "Customer"; // Admin or Customer

        public List<UserAddress> Addresses { get; set; } = new();

        public decimal WalletBalance { get; set; } = 0;
    }

    public class UserAddress
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Label { get; set; } = "Home";
        public string RecipientName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Province { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
        public bool IsDefault { get; set; } = false;
    }
}
