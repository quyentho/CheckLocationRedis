using CheckLocations.Models;
using StackExchange.Redis;

namespace CheckLocations.Data;
public class RedisLocationRepository : ILocationRepository
{
    private readonly IDatabase _redisDatabase;

    public RedisLocationRepository(IConnectionMultiplexer redis)
    {
        _redisDatabase = redis.GetDatabase();
    }

    public async Task<List<Location>?> GetLocationsByCity(string city)
    {
        if (await _redisDatabase.KeyExistsAsync(city))
        {
            var areas = await _redisDatabase.SetMembersAsync(city);
            return areas.Select(area => new Location(city, area)).ToList();
        }

        return null;
    }

    public async Task SetLocationAsync(string city, string area)
    {
        await _redisDatabase.SetAddAsync(city, area);
    }
}