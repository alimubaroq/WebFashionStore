using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TokoBaju.Backend.Models;
using TokoBaju.Backend.Settings;

namespace TokoBaju.Backend.Services
{
    public class ActivityLogService
    {
        private readonly IMongoCollection<ActivityLog> _logsCollection;

        public ActivityLogService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            var mongoClient = new MongoClient(
                mongoDBSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                mongoDBSettings.Value.DatabaseName);

            _logsCollection = mongoDatabase.GetCollection<ActivityLog>("ActivityLogs");
        }

        public async Task LogAsync(string userId, string userName, string role, string action, string details)
        {
            var log = new ActivityLog
            {
                UserId = userId,
                UserName = userName,
                Role = role,
                Action = action,
                Details = details,
                Timestamp = DateTime.UtcNow
            };
            await _logsCollection.InsertOneAsync(log);
        }

        public async Task<List<ActivityLog>> GetAllAsync() =>
            await _logsCollection.Find(_ => true).SortByDescending(x => x.Timestamp).ToListAsync();

        public async Task<List<ActivityLog>> GetByUserAsync(string userId) =>
            await _logsCollection.Find(x => x.UserId == userId).SortByDescending(x => x.Timestamp).ToListAsync();
    }
}
